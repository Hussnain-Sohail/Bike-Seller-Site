import { useState, useContext, useEffect } from "react";
import { AuthProvider } from "./AccessTokenProvider";

type bikeData = {
    companyName: string,
    bikeName: string,
    bikePrice: number,
    bikeModel: number,
    additioanlInformation: string,
    imagePublicId: string,
    imageURL: string,
    dateUploaded: string,
}
function SeeUploadedBikes() {
    const [bikes, setBikes] = useState<bikeData[]>([]);
    const [data, setData] = useState('checking');

    const context = useContext(AuthProvider);

    const { accessToken } = context!;

    const getUploadedBikes = async () => {
        try {
            console.log('function started');
            const request = await fetch('http://localhost:3500/user/see/uploadedbikes', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'authorization': `Bearer ${accessToken}`,
                }
            });
            const response = await request.json();
            setData(response.message);
            setBikes(response.bikes);
            console.log('function ended');
        }
        catch (error) {
            setData('Could not get bikes')
            console.error(error);
        }
    }

    useEffect(() => {
        getUploadedBikes();
    }, []);
    return (
        <div>
            {data && <h1>{data}</h1>}

            {bikes && bikes.map((bike, index) => (
                <div className="bike-card" key={index}>
                    <img src={bike.imageURL} />
                    <p>Name: {bike.companyName} {bike.bikeName}</p>
                    <p>Price: {bike.bikePrice}</p>
                    <p>Model: {bike.bikeModel}</p>
                    <p>Uploaded at: {bike.dateUploaded}</p>
                </div>
            ))}
        </div>
    )
}

export default SeeUploadedBikes;