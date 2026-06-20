import { useState, useContext, useEffect } from "react";
import type { PropsWithChildren } from 'react';
import { AuthProvider } from "./AccessTokenProvider";

function Protect({ children }: PropsWithChildren) {

    const [data, setData] = useState('');
    const context = useContext(AuthProvider);

    const { accessToken, setAccessToken } = context!;

    const getNewAccessToken = async () => {
        try {
            console.log('protect ran');
            const request = await fetch('http://localhost:3500/user/newaccesstoken', {
                method: 'POST',
                credentials: 'include',
            });
            if (!request.ok) {
                console.log('reques was not ok');
                setData('Loading...... Please wait');
                return;
            }
            const response = await request.json();
            setAccessToken(response.AccessToken);
            console.log('protect ended');
        }
        catch (error) {
            console.error(error);
            setData('Loading...... Please wait');
        }
    }
    useEffect(() => {
        getNewAccessToken();
    }, []);

    return (accessToken === null || accessToken === '') ? <h1>{data}</h1> : children;
}
export default Protect;