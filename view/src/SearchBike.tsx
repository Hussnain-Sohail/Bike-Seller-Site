import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider } from './AccessTokenProvider';

type bikeData = {
    _id: string,
    companyName: string,
    bikeName: string,
    bikePrice: number,
    bikeModel: number,
    additioanlInformation: string,
    imagePublicId: string,
    imageURL: string,
    dateUploaded: string,
}
function SearchBike() {

    const [bikeName, setBikeName] = useState('');
    const [data, setData] = useState('checking');
    const [bikes, setBikes] = useState<bikeData[]>([]);

    const context = useContext(AuthProvider);

    const { accessToken } = context!;

    const getBikeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBikeName(event.target.value);
    }

    const Submit = async () => {
        try {
            const request = await fetch('http://localhost:3500/user/searchbike', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`,
                }, body: JSON.stringify({
                    bikeName,
                })
            });
            const response = await request.json();
            setBikes(response.bikes);
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('Could not get bikes!');
        }
    }

    return (
        <div>
            <FontAwesomeIcon icon={faSearch} />
            <button onClick={Submit}>Search</button>
            <input type='text' onChange={getBikeName} required /><br />
            {data && <p>{data}</p>}
            <div>
                {bikes && bikes.map((bike, index) => (
                    <Link to={`/user/bikedetails/${bike._id}`}>
                        <div className='bike-card' key={index}>
                            <img src={bike.imageURL} />
                            <p>Name {bike.companyName} {bike.bikeName}</p>
                            <p>Click to see more details</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default SearchBike