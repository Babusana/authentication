"use client"
import React, { useEffect } from 'react'
import './globals.css'
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, )
  
  return (
    <>
      
    </>
  )
}

export default Page