import { Link } from "react-router-dom";
import './css/MainPage.css';
function MainPage() {
    return (
        <div>
            <h1>Welcome to Bikes</h1>
            <div id="container-main-page">
                <div id="inner">
                    <Link to='/user/signup'>
                        <button className="button">Create My Account</button>
                    </Link><br />
                    <Link to='/user/login'>
                        <button className="button">Login to My Account</button>
                    </Link><br />
                    <Link to='/aboutus'>
                        <button className="button">Learn more about us</button>
                    </Link><br />
                    <Link to='/user/uploadbike'>
                        <button className="button">Upload Bike</button>
                    </Link><br />
                </div>
            </div>
        </div>
    );
};

export default MainPage;