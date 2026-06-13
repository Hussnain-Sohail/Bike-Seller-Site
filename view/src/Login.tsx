import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import './css/Login.css';
/*display: flex;
    justify-content: center;
    align-items: center; */
function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    const context = useContext(AuthProvider);
    if (!context) {
        setData('Could not proceed something went wrong');
        return;
    }
    const getUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };
    const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const Submit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const request = await fetch('http://localhost:3500/user/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    userName, password
                })
            });
            const response = await request.json();
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('Could not Log In');
        }
    };
    return (
        <div id="container-login">
            <form onSubmit={Submit}>
                <label className="label-login">Enter Username</label><br />
                <input className="input-login" type="text" required onChange={getUserName} /><br />
                <label className="label-login">Enter Password</label><br />
                <input className="input-login" type="password" required onChange={getPassword} /><br />
                <button id="button">Submit request</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}

export default Login;