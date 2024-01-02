"use client"
import  axios  from 'axios';
import React, { useEffect, useState } from "react";
import "./login.css";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { set } from 'mongoose';
import Image from 'next/image';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Page() {
  const router = useRouter()
  const [message, setmessage] = useState()
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const getData = async ()=>{
    const {data} = await axios.get("http://localhost:3000/api/login")
    console.log(data.user);
    const key = data.user
    return key
  }
  const key = getData()
  const handleSubmit = async (e) => {
  e.preventDefault()
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
    const {data} = await axios.post("http://localhost:3000/api/login",{email,password})
    if (data.status === 200) {
      notify(200,data.message)
      setmessage(data.message)
      setemail("")
      setpassword("")
      setTimeout(() => {
        router.push(`/profile/`)
      }, 1000);
    }
    if (data.status === 401) {
      notify(401,data.message)
    }
    if (data.status === 402) {
      notify(402,data.message)
      setpassword("")
    }
  } catch (error) {
    console.log(error);
  }
  }
  useEffect(() => {
    getData()
  },[] )
  
  return (
    <>
      <section id="section">
        <div className="container">
          <div className="user signinBx">
            <div className="imgBx">
              <Image src={"/login.jpg"} height={400} width={400} alt="img" />
            </div>
            <div className="formBx">
              <form id="form">
                <h2>Sign In</h2>
                <div className="form">
                  <input type="text" name="" placeholder="Email" id="input" 
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  />
                  <input
                    type="password"
                    name=""
                    placeholder="Password"
                    id="input"
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                  />
                </div>
                <button id="btn" on onClick={handleSubmit}>
                  Sign In
                </button>
                <p>Dont have an account ?</p>
                <Link href={"/register"}>Signup</Link>
              </form>
            </div>
          </div>
        </div>
      </section>
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
  }
