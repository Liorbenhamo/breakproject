import "./App.css";
import "../components/SideNavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import HomePage from "../pages/HomePage";
import MessegesPage from "../pages/MessegesPage";
import ProfilePage from "../pages/ProfilePage";
import UserDetails from "../pages/UserDetails";
import PostPage from "../pages/PostPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/connected" element={<SideNavBar />}>
          <Route index element={<HomePage />} />
          <Route path="messeges" element={<MessegesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="userdatails" element={<UserDetails />} />
          <Route path="post" element={<PostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
