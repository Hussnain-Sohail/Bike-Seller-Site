import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
function Signup() {
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState(18);
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [data, setData] = useState('');
    const context = useContext(AuthProvider);
    if (!context) {
        setData('Could not continue something went wrong');
        return;
    }
    const { setAccessToken } = context;

    const getInfo = (setValue: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => (
            setValue(event.target.value)
        )
    };
    const getIntegerInfo = (setValue: React.Dispatch<React.SetStateAction<number>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => (
            setValue(Number(event.target.value))
        )
    };

    const submitRequest = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const request = await fetch('http://localhost:5173/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    userName, age, password, address, contactNumber
                }),
            });
            const response = await request.json();
            setData(response.message);
            setAccessToken(response.AccessToken);
        }
        catch (error) {
            console.error(error);
            setData('Could not create Account');
        }
    }
    return (
        <div>
            <form onSubmit={submitRequest}>
                <label>Enter Username</label><br />
                <input type="text" required onChange={getInfo(setUserName)} /><br />
                <label>Enter Age</label><br />
                <input type="number" required onChange={getIntegerInfo(setAge)} /><br />
                <label>Enter Password</label><br />
                <input type="password" required onChange={getInfo(setPassword)} /><br />
                <label>Enter Address</label><br />
                <input type="text" required onChange={getInfo(setAddress)} /><br />
                <label>Enter Contact Number</label><br />
                <input type="text" required onChange={getInfo(setContactNumber)} /><br />
                <button>Submit request</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}
export default Signup;