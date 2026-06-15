import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Link } from 'react-router-dom'

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
    const [data, setData] = useState('');
    const [bikes, setBikes] = useState<bikeData[]>([]);

    const getBikeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBikeName(event.target.value);
    }

    const Submit = async (event: any) => {
        event.preventDefault();
        try {
            const request = await fetch('http://localhost:3500/user/searchbike', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    bikeName,
                })
            });
            const response = await request.json();
            setBikes(response.bikes);
            setData('Request successfull');
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
            <input type='text' required placeholder='enter bike name eg Yamaha R1' onChange={getBikeName} /><br />
            {data && <p>{data}</p>}
            <div>
                {bikes.length > 0 && bikes.map((bike, index) => (
                    <Link to={`/bike/details/${bike._id}`}>
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