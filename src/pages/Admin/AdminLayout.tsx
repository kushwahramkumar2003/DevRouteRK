import React, { ReactElement, useEffect } from "react";
import Header from "./components/header/Header.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserProfile } from "../../services/index/users.js";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AdminLayout = (): ReactElement<any, any> => {
  const navigate = useNavigate();

  const userState = useSelector((state): any => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: (): Promise<any> => {
      return getUserProfile({ token: userState.userInfo.token });
    },

    queryKey: ["profile"],
  });

  useEffect((): void => {
    if (profileData && !profileData?.admin) {
      navigate("/");
      toast.error("You are not authorized to access this page");
    }
    if (profileError) {
      navigate("/");
      toast.error(profileError.message);
    }
  }, [profileData, navigate, profileError]);

  if (profileIsLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h3 className="text-2xl text-slate-700">Loading.........</h3>
      </div>
    );

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header />
      <main className="bg-[#f9f9f9] flex-1 p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
