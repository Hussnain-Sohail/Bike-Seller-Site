import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import './css/Signup.css';
import { useNavigate } from "react-router-dom";
function Signup() {
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState(18);
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate();
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
            const request = await fetch('http://localhost:3500/user/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    userName, age, password, address, contactNumber
                }),
            });
            const response = await request.json();
            setData(response.message);
            setAccessToken(response.AccessToken);

            if (!request.ok)
                return;

            setTimeout(() => {
                navigate('/user/homepage');
            }, 3000);

        }
        catch (error) {
            console.error(error);
            setData('Could not create Account');
        }
    }
    return (
        <div>
            <h1 id="signup-header">Welcome to Signing Up</h1>
            <div id="parent">
                <div id="signup-form-container">
                    <form onSubmit={submitRequest}>
                        <label className="label">Enter Username</label><br />
                        <input className="input" type="text" required onChange={getInfo(setUserName)} /><br />
                        <label className="label">Enter Age</label><br />
                        <input className="input" type="number" required onChange={getIntegerInfo(setAge)} /><br />
                        <label className="label">Enter Password</label><br />
                        <input className="input" type="password" required onChange={getInfo(setPassword)} /><br />
                        <label className="label">Enter Address</label><br />
                        <input className="input" type="text" required onChange={getInfo(setAddress)} /><br />
                        <label className="label">Enter Contact Number</label><br />
                        <input className="input" type="text" required onChange={getInfo(setContactNumber)} /><br />
                        <button className="button">Submit request</button>
                    </form>
                </div>
            </div>
            {data && <p id="data">{data}</p>}
        </div>
    )
}
export default Signup;