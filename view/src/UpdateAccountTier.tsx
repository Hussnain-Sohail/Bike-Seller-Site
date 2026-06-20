import { useState, useContext, useEffect } from "react";
import { AuthProvider } from "./AccessTokenProvider";

function UpdateAccountTier() {
    const [data, setData] = useState('');
    const context = useContext(AuthProvider);

    const { accessToken } = context!;

    const getStripeURL = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/updatetier', {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${accessToken}`
                }
            });
            const response = await request.json();
            console.log(`stripe url ${response.stripeURL}`);
            window.location = response.stripeURL;
            setData('Re routing to Payments........')
        }
        catch (error) {
            console.error(error);
            setData('Something went wrong. Please try again later');
        }
    }

    useEffect(() => {
        getStripeURL();
    }, []);

    return (
        <div>
            {data && <h1>{data}</h1>}
        </div>
    )
}
export default UpdateAccountTier;