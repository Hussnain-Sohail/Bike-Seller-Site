import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './css/HomePage.css'

type bikeType = {
    companyName: string,
    bikeName: string,
    bikePrice: number,
    bikeModel: number,
    additioanlInformation: string,
    imagePublicId: string,
    imageURL: string,
    dateUploaded: string,
}
function HomePage() {
    const [bikeName, setBikeName] = useState('');
    const [bikes, setBikes] = useState<bikeType[]>([]);
    const [data, setData] = useState('');

    const getBikeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBikeName(event.target.value);
    }

    const getFeed = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/searchbike', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bikeName,
                })
            });
            const response = await request.json();
            setBikes(response.bikes);
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('Something went wrong. Please try reloading');
        }
    }
    useEffect(() => { getFeed(); }, []);

    const submit = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/searchbike', {
                method: 'POST',
            });
            const response = await request.json();
            setBikes(response.bikes);
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('Could not get bike');
        }
    }

    return (
        <div>
            <button onClick={submit}>Search</button>
            <input id='search-field' type='text' onChange={getBikeName} required placeholder='Enter bike eg Yamaha R1 etc' /><br />
            {data && <p>{data}</p>}
            <div id='/user/action'>
                <Link to='/user/uploadbike'>
                    <button className='button'>Upload Bike</button><br />
                </Link>
                <Link to='/user/see/uploadedbikes'>
                    <button className='button'>See Uploaded Bike</button>
                </Link>
            </div>

            <div>
                {bikes.length > 0 && bikes.map((bike, index) => (
                    <div key={index}>
                        <img src={bike.imageURL} alt='Pic of bike' />
                        <p>Name: {bike.companyName} {bike.bikeName}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
export default HomePage