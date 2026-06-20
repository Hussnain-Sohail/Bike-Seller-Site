import MainPage from "./MainPage";
import Aboutus from "./Aboutus";
import Signup from "./Signup";
import Login from "./Login";
import UploadBike from "./UploadBike";
import Protect from "./Protect";
import { Routes, Route } from 'react-router';
import UserMenuePage from "./UserMenuPage";
import SearchBike from "./SearchBike";
import SeeUploadedBikes from "./SeeUploadedBikes";
import MyAccount from "./MyAccount";
import BikeDetails from "./SeeBikeDetails";
import Setting from "./Settings";
import ChangeUserName from "./ChangeUserName";
import UpdateAccountTier from "./UpdateAccountTier";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/aboutus" element={<Aboutus />} />

      <Route path="/user/menu" element={<Protect><UserMenuePage /></Protect>} />
      <Route path="/user/uploadbike" element={<Protect><UploadBike /></Protect>} />
      <Route path="/user/searchbike" element={<Protect><SearchBike /></Protect>} />
      <Route path="/user/see/uploadedbikes" element={<Protect><SeeUploadedBikes /></Protect>} />
      <Route path="user/myaccount" element={<Protect><MyAccount /></Protect>} />
      <Route path="/user/bikedetails/:bikeid" element={<Protect><BikeDetails /></Protect>} />
      <Route path="/user/settings" element={<Protect><Setting /></Protect>} />
      <Route path="/user/settings/changeusername" element={<Protect><ChangeUserName /></Protect>} />
      <Route path="/user/updatetier" element={<Protect><UpdateAccountTier /></Protect>} />
    </Routes>
  );
}

export default App
