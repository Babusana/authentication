"use client";
import axios from "axios";
import React, { useState } from "react";
import "./register.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Page = () => {
  const router = useRouter();
  const [message, setmessage] = useState();
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const registerSubmit = async (e) => {
    e.preventDefault();
    const notify = (res,msg) => {
      if (res == 200) {
        toast.success(msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      if (res == 401){
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      if (res == 402){
        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    };
    try {
      const { data } = await axios.post("http://localhost:3000/api/register", {
        username,
        email,
        password,
      });
      const result = data.result;
      if (data.status === 200) {
        notify(200,data.message);
        setemail("");
        setpassword("");
        setusername("");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
      if (data.status === 401) {
        notify(401,data.message);
        setemail("");
        setpassword("");
        setusername("");
      }
      if (data.status === 500) {
        notify(402,data.message);
        setemail("");
        setpassword("");
        setusername("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="body">
        <div className="main">
          <div className="signup">
            <h1 id="txt-register">Register</h1>
            <form onSubmit={registerSubmit}>
              <input
                type="text"
                name="txt"
                placeholder="Username"
                required=""
                id="signup-input"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required=""
                id="signup-input"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <input
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
                id="signup-input"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <button id="signup-btn">Sign up</button>
            </form>
            <p id="txt-register">Already a user</p>
            <Link id="txt-register" href={"/login"}>
              Sign In
            </Link>
            <p id="txt-error">{message}</p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Page;
