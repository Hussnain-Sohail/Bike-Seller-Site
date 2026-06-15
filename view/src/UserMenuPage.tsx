import { Link } from 'react-router-dom';
import './css/UserMenuPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';

function UserMenuePage() {

    return (
        <div>
            <h1 id='user-menu-header'>User MENU</h1>

            <div id='parent-container'>
                <div id='font-container'>
                    <Link to='/user/searchike'>
                        <FontAwesomeIcon icon={faSearch} /><br />
                    </Link>
                    <Link to='/user/settings'>
                        <FontAwesomeIcon icon={faGear} /><br />
                    </Link>
                </div>

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
            </div>
        </div>
    );
}
export default UserMenuePage;