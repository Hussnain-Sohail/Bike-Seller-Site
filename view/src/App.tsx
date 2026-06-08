import MainPage from "./MainPage";
import Aboutus from "./Aboutus";
import Signup from "./Signup"
import Login from "./Login"
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/login" element={<Login />} />
    </Routes>
  )
}
export default App
