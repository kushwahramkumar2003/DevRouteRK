import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home/HomePage.jsx";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage.tsx";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
