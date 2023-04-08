import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import learningPortal from "../../../assets/image/learningportal.svg";
import { useGetUsersQuery } from "../../../features/user/UserApi";
import { useLoginMutation } from "../../../features/auth/AuthApi";
import { ToastContainer, toast } from "react-toastify";

const AdminLogin = () => {
  //set document title
  useEffect(() => {
    document.title = "Admin-Login";
  }, []);

  //set useState
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");

  //get data
  const [login, { data, isError }] = useLoginMutation();
  const { data: users } = useGetUsersQuery();

  //find admin
  const admin = users?.find((u) => u.role === "admin");

  //routing
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.user) {
      navigate("/admin/dashboard");
    }
  }, [data, navigate]);

  //handle login
  const handleLogin = (e) => {
    e.preventDefault();

    if (admin?.email === email) {
      login({
        email,
        password,
      });
    } else if (isError === false) {
      setErrorMessage(<p style={{ color: "red" }}>There was an error</p>);

      toast.error("Login failed");
      toast.error("There was an error");
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
              alt="learningPortal"
              src={learningPortal}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Sign in to Admin Account
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
                  to="#"
                  className="font-medium text-violet-600 hover:text-violet-500"
                >
                  Forgot your password?
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

          {errorMessage}
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
