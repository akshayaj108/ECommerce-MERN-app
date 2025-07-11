import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [credential, setCredential] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { token, setToken, navigate, backendurl } = useContext(ShopContext);

  const handleInputChange = (event) => {
    setCredential((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        console.log(currentState);
        const response = await axios.post(
          `${backendUrl}/api/v1/register`,
          credential
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
        setLoading(false);
      } else {
        const response = await axios.post(
          `${backendUrl}/api/v1/login`,
          credential
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("register/login error", error);
      setLoading(false);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regualar text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <input
          onChange={handleInputChange}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          name="name"
          value={credential.name}
          required
        />
      )}
      <input
        onChange={handleInputChange}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        name="email"
        value={credential.email}
        required
      />
      <input
        onChange={handleInputChange}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        name="password"
        value={credential.password}
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {/* <p className="cursor-pointer text-base mt-2">Forgot Password</p> */}
        {currentState === "Login" ? (
          <p
            className="cursor-pointer text-base mt-2"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer text-base mt-2"
            onClick={() => setCurrentState("Login")}
          >
            Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className={`${
          isLoading ? "bg-gray-300 text-base" : "bg-black text-white"
        } font-light px-8 py-2 mt-4`}
      >
        {currentState === "Sign Up" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
};

export default Login;
