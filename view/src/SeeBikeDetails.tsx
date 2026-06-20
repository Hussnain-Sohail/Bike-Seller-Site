import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthProvider } from "./AccessTokenProvider";

type bikeData = {
    companyName: string,
    bikeName: string,
    bikePrice: number,
    bikeModel: number,
    additioanlInformation: string,
    dateUploaded: string,
}
type userData = {
    Name: string,
    Address: string,
    contactNumber: string,
}
function BikeDetails() {
    const [user, setUser] = useState<userData | null>(null)
    const [bike, setBike] = useState<bikeData | null>(null);

    const { bikeId } = useParams();
    const [data, setData] = useState('');

    const context = useContext(AuthProvider);
    const { accessToken } = context!;

    const getDetails = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/bikedetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                }, body: JSON.stringify({
                    bikeId
                })
            });
            const response = await request.json();
            setData(response.message);
            setUser(response.user);
            setBike(response.bike);
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div>
            {data && <p>{data}</p>}
            <div>
                <h3>About Bike</h3>
                {bike && <div>
                    <p>Name: {bike.companyName} {bike.bikeName}</p>
                    <p>Price: {bike.bikePrice}</p>
                    <p>Model: {bike.bikeModel}</p>
                    {bike.additioanlInformation && <p>{bike.additioanlInformation}</p>}
                    <p>Uploaded on: {bike.dateUploaded}</p>
                </div>}
            </div>

            <div>
                <h3>About Uploader</h3>
                {user && <div>
                    <p>Name: {user.Name}</p>
                    <p>Address: {user.Address}</p>
                    <p>Contact Number: {user.contactNumber}</p>
                </div>}
            </div>
        </div>
    )
}

export default BikeDetails;