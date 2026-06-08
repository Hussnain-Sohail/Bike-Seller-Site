import { Link } from "react-router-dom";
function MainPage() {
    return (
        <div>
            <h1>Welcome to Bikes</h1>
            <Link to='/user/signup'>
                <button>Create My Account</button>
            </Link><br />
            <Link to='/user/login'>
                <button>Login to My Account</button>
            </Link><br />
            <footer>
                <Link to='/aboutus'>
                    <button>Learn more about us</button>
                </Link><br />
            </footer>
        </div>
    );
};

export default MainPage;