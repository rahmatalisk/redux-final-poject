import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import learningPortal from "../../../assets/image/learningportal.svg";
import { useLoginMutation } from "../../../features/auth/AuthApi";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  //set useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //get data
  const [login, { data, isError }] = useLoginMutation();
  const { data: users } = useGetUsersQuery();

  //get all student
  const allStudent = users?.filter((u) => u.role === "student");

  //navigate
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.user) {
      navigate("/course-player/video/1");
    }
  }, [data, navigate]);

  //handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const findUser = allStudent?.find((u) => u.email === email);
    if (findUser?.email) {
      login({
        email,
        password,
      });
    } else {
      toast.error("Login failed!");
      toast.error("There was an error!");
    }

    if (isError) {
      toast.error("Login failed!");
      toast.error("There was an error!");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
          <div>
            <img
              className="h-12 mx-auto"
              src={learningPortal}
              alt="learningPortal"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Student Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input rounded-t-md"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input rounded-b-md"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  to="./register"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Create New Account
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
