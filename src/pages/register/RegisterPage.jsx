import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers.js";

const RegisterPage = () => {
  const naviage = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success("Register successfully");
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      naviage("/");
    }
  }, [naviage, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data, error) => {
    const { name, email, password } = data;
    // console.log(data);
    mutate({ name, email, password });
  };
  return (
    <MainLayout>
      <section className="container px-5 py-10 mx-auto">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="mb-8 text-2xl font-bold text-center font-roboto text-Dark-hard">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter name"
                className={`placeholder:text-[#959ead] text-Dark-hard mt-3 rounded-lg px-5 py-5 font-semibold block outline-none border  ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            </div>
            {errors.name?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                  minLength: {
                    value: 1,
                    message: "Email length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter email"
                className={`placeholder:text-[#959ead] text-Dark-hard mt-3 rounded-lg px-5 py-5 font-semibold block outline-none border  ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            </div>
            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 character",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                placeholder="Enter password"
                className={`placeholder:text-[#959ead] text-Dark-hard mt-3 rounded-lg px-5 py-5 font-semibold block outline-none border  ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            </div>
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
            <div className="flex flex-col w-full mb-6">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
                })}
                placeholder="Enter confirm password"
                className={`placeholder:text-[#959ead] text-Dark-hard mt-3 rounded-lg px-5 py-5 font-semibold block outline-none border  ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
            </div>
            {errors.confirmPassword?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full py-4 mb-6 text-lg font-bold text-white rounded-lg bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
