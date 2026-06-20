import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from './AccessTokenProvider';
function Setting() {
    const [data, setData] = useState('');
    const context = useContext(AuthProvider);

    const { accessToken, setAccessToken } = context!;
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/logout', {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${accessToken}`
                }
            });
            if (!request.ok) {
                setData('Could not Logout');
                return;
            }
            setAccessToken('');
            setTimeout(() => { navigate('/'); }, 2000)
        }
        catch (error) {
            console.error(error);
            setData('Could not Logout');
        }
    }
    return (
        <div>
            <Link to='/user/settings/changeusername'>
                <button className='button'>Change Username</button>
            </Link>
            <br />
            <button className='button' onClick={() => { Logout() }}>Logout</button>
            {data && <p>{data}</p>}
        </div>
    )
}

export default Setting;