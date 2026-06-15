import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
import './css/Login.css';
import { useNavigate } from "react-router-dom";
function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('checking data');
    const context = useContext(AuthProvider);
    const navigate = useNavigate();
    if (!context) {
        setData('Could not continue something went wrong');
        return;
    }
    const { setAccessToken } = context;

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
            setAccessToken(response.AccessToken);

            if (!request.ok)
                return;

            setTimeout(() => {
                navigate('/user/homepage')
            }, 3000);
        }
        catch (error) {
            console.error(error);
            setData('Could not Log In');
        }
    };
    return (
        <div>
            <h1 id="login-header">Signin In Welcome Back</h1>
            <div id="parent">
                <div id="container-login">
                    <form onSubmit={Submit}>
                        <label className="label">Enter Username</label><br />
                        <input className="input" type="text" required onChange={getUserName} /><br />
                        <label className="label">Enter Password</label><br />
                        <input className="input" type="password" required onChange={getPassword} /><br />
                        <button className="button" id="login-button">Submit request</button>
                    </form>
                </div>
            </div>
            {data && <p id="data">{data}</p>}
        </div>
    )
}

export default Login;