import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";
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
            const request = await fetch('http://localhost:5173/user/login', {
                method: 'POST',
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
        <div>
            <form onSubmit={Submit}>
                <label>Enter Username</label><br />
                <input type="text" required onChange={getUserName} /><br />
                <label>Enter Password</label><br />
                <input type="password" required onChange={getPassword} /><br />
                <button>Submit request</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}

export default Login;