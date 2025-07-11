import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const resp = await axios.post(`${backendUrl}/api/v1/admin`, {
        email,
        password,
      });
      if (resp.data.success) {
        setToken(resp.data.token);
        toast.success("Login Successfully");
      } else {
        toast.error(resp.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("admin login", error);
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandle}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md bg-white w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your.email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md bg-white w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className={`mt-2 w-full py-2 px-4 rounded-md text-white ${
              isLoading ? "bg-gray-300 text-base" : "bg-black text-white"
            }`}
            type="submit"
          >
            {isLoading ? "Sign In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
