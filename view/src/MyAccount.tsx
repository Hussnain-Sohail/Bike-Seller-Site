import { useState, useContext, useEffect } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import { Link, useNavigate } from 'react-router-dom';

type accountData = {
    name: string,
    address: string,
    contactNumber: string,
    totalBikesUploaded: number,
}
function MyAccount() {
    const [account, setAccount] = useState<accountData | null>(null);
    const [data, setData] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);

    const context = useContext(AuthProvider);
    const { accessToken, setAccessToken } = context!;

    const navigate = useNavigate();

    const getAccountInfo = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/myaccount', {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${accessToken}`
                }
            });

            const response = await request.json();
            setData(response.message);
            setAccount(response.account);
        }
        catch (error) {
            console.error(error);
            setData('Could not get account information !');
        }
    }

    useEffect(() => {
        getAccountInfo();
    }, []);

    const deleteMyAccount = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/deleteaccount', {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${accessToken}`
                },
            });
            const response = await request.json();
            setData(response.message);
            setAccessToken('');

            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (error) {
            console.error(error);
            setData('Could not delete account');
        }
    }
    return (
        <div>
            <p>Name: {account?.name}</p>
            <p>Address: {account?.address}</p>
            <p>Contact Number: {account?.contactNumber}</p>
            <Link to='/user/see/uploadedbikes'>
                <p>Total bikes uploaded: {account?.totalBikesUploaded}</p>
            </Link>
            <button className="button" onClick={() => (setConfirmDelete(true))}>Delete Account</button><br />
            {confirmDelete && <p id="account-delete-warning">Deleting account is permanent and cannot be undone. All the data will be lost</p>}
            {confirmDelete && <button onClick={deleteMyAccount} className="button">Confirm Delete Account</button>}
            <br />
            <Link to='/user/updatetier'>
                <button className="button">Update Account</button>
            </Link>
            {data && <h1>{data}</h1>}
        </div>
    )
}

export default MyAccount