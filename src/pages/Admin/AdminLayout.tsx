import React from "react";
import Header from "./components/header/Header.tsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminLayout;
