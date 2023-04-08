import React, { useState } from "react";
import learningPortal from "../../../assets/image/learningportal.svg";
import { useRegisterMutation } from "../../../features/auth/AuthApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [register, { data }] = useRegisterMutation();
  const navigate = useNavigate();

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    if (password === confirmPassword) {
      register({
        name,
        email,
        role: "student",
        password,
      }).then((response) => {
        if (response.data?.user) {
          navigate("/course-player/video/1");
        } else {
          setError("There was an error");
        }
        setIsSubmitting(false);
      });
    } else {
      setError("Password and confirmPassword are not same!!");
      setIsSubmitting(false);
    }

    if (data?.user) {
      toast.success("Register successfully!");
    } else {
      toast.error("Register failed!");
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
              Create Your New Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autocomplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="login-input rounded-t-md"
                  placeholder="Student Name"
                />
              </div>
              <div>
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input "
                  placeholder="Email address"
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  placeholder="Password"
                />
              </div>
              <div>
                <label for="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autocomplete="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="login-input rounded-b-md"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Create Account
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
