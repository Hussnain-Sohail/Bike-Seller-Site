import { useState, useContext, type SetStateAction } from "react";
import { AuthProvider } from "./AccessTokenProvider";

function ChangeUserName() {
    const [oldUsername, setOldUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');

    const context = useContext(AuthProvider);
    const { accessToken } = context!;

    const setter = (setValue: React.Dispatch<SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
        }
    }

    const Submit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            console.log(oldUsername)
            console.log(newUsername)
            console.log(password)
            event.preventDefault();
            const request = await fetch('http://localhost:3500/user/changeusername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`,
                }, body: JSON.stringify({
                    oldUsername, newUsername, password
                }),
            });
            const response = await request.json();
            setData(response.message);
        } catch (error) {
            console.error(error);
            setData('Could not change Username')
        }
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <label>Enter Current Username</label><br />
                <input type="text" required onChange={setter(setOldUsername)} /><br />
                <label>Enter New Username</label><br />
                <input type="text" required onChange={setter(setNewUsername)} /><br />
                <label>Enter Pasword</label><br />
                <input type="password" required onChange={setter(setPassword)} /><br />
                <button>Submit</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}
export default ChangeUserName;