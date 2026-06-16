import { Link } from 'react-router-dom';
import './css/UserMenuPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

function UserMenuePage() {

    return (
        <div id='container'>
            <h1 id='user-menu-header'>User MENU</h1>

            <div id='user-menu-parent'>
                < div id='user-menu'>
                    <Link to='/user/uploadbike'>
                        <button className='button'>Upload Bike</button><br />
                    </Link>
                    <Link to='/user/see/uploadedbikes'>
                        <button className='button'>See Uploaded Bike</button>
                    </Link>
                    <Link to='/user/remove/bike'>
                        <button className='button'>Remove Bike</button>
                    </Link>
                </div>
            </div>
            <footer id='footer-fonts'>
                <Link to='/user/searchbike'>
                    <p>Search</p>
                    <FontAwesomeIcon icon={faSearch} /><br />
                </Link>

                <Link to='/user/settings'>
                    <p>Settings</p>
                    <FontAwesomeIcon icon={faGear} /><br />
                </Link>

                <Link to='/user/account'>
                    <p>Account</p>
                    <FontAwesomeIcon icon={faUser} /><br />
                </Link>
            </footer>
        </div>
    );
}
export default UserMenuePage;