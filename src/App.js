import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/home/HomePage.jsx";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage.tsx";
import AdminLayout from "./pages/Admin/AdminLayout.tsx";
import Admin from "./pages/Admin/screens/Admin.tsx";
import Comments from "./pages/Admin/screens/comments/Comments.tsx";
import NewPost from "./pages/Admin/screens/posts/NewPost.tsx";
import ManagePosts from "./pages/Admin/screens/posts/ManagePosts.tsx";
import EditPost from "./pages/Admin/screens/posts/EditPost.tsx";
import Categories from "./pages/Admin/screens/categories/Categories.tsx";
import EditCategories from "./pages/Admin/screens/categories/EditCategories";
import Users from "./pages/Admin/screens/users/Users";

function App() {
  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="categories/manage" element={<Categories />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route
              path="categories/manage/edit/:slug"
              element={<EditCategories />}
          />
          <Route path="users/manage" element={<Users />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
