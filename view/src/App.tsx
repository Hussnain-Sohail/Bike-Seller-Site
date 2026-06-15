import MainPage from "./MainPage";
import Aboutus from "./Aboutus";
import Signup from "./Signup";
import Login from "./Login";
import UploadBike from "./UploadBike";
import Protect from "./Protect";
import { Routes, Route } from 'react-router';
import UserMenuePage from "./UserMenuPage";
import SearchBike from "./SearchBike";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/uploadbike" element={<Protect><UploadBike /></Protect>} />
      <Route path="/user/menu" element={<Protect><UserMenuePage /></Protect>} />
      <Route path="/user/searchbike" element={<SearchBike />} />
    </Routes>
  );
}

export default App
