import { useState, useContext } from "react";
import { AuthProvider } from "./AccessTokenProvider";

function UploadBike() {
    const [comapnyName, setCompanyName] = useState('');
    const [bikeName, setBikeName] = useState('');
    const [bikePrice, setBikePrice] = useState(0);
    const [bikeModel, setBikeModel] = useState('');
    const [additioanlInformation, setAdditioanlInformation] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [data, setData] = useState('');

    const context = useContext(AuthProvider);
    const { accessToken } = context!;

    const getValue = (setValue: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => (
            setValue(event.target.value)
        );
    };

    const getIntegerValue = (setValue: React.Dispatch<React.SetStateAction<number>>) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => (
            setValue(Number(event.target.value))
        );
    };

    const getImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image: File = event.target.files![0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImageURL(fileReader.result as string);
        }
        fileReader.readAsDataURL(image);
    };

    const Submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const request = await fetch('http://localhost:3500/user/uploadbike', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`,
                }, body: JSON.stringify({
                    comapnyName,
                    bikeName,
                    bikePrice,
                    bikeModel,
                    additioanlInformation,
                    imageURL,
                })
            });
            const response = await request.json();
            setData(response.message);
        }
        catch (error) {
            console.error(error);
            setData('Could not upload bike');
        }
    }
    return (
        <div>
            <form onSubmit={Submit}>
                <label>Enter Comapny</label><br />
                <input type="text" onChange={getValue(setCompanyName)} required /><br />
                <label>Enter Bike Name</label><br />
                <input type="text" onChange={getValue(setBikeName)} required /><br />
                <label>Enter Price</label><br />
                <input type="number" onChange={getIntegerValue(setBikePrice)} required /><br />
                <label>Enter Model</label><br />
                <input type="text" onChange={getValue(setBikeModel)} required /><br />
                <label>Additioanal Information</label><br />
                <input type="comment" onChange={getValue(setAdditioanlInformation)} /><br />
                <label>Upload Bike Image</label><br />
                <input type="file" onChange={getImage} required /><br />
                <button>Upload Bike</button>
            </form>
            {data && <p>{data}</p>}
        </div>
    )
}
export default UploadBike;