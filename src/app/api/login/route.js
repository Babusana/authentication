import { url } from "@/app/utils/db";
import  {userData}  from "@/app/utils/model/userData";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Connection from "@/app/utils/connection";
import jwt from "jsonwebtoken";
// //Get API
export async function GET(){
  await mongoose.connect(url)
  const user = await userData.find()
  return NextResponse.json({user,status:200})
}
//POST API
export async function POST(request) {
  try {
    Connection();
    const payload = await request.json();
    const {email, password } = payload;
    if (!email || !password) {
      return NextResponse.json(
        {
          status: 401,
          message: "All fields are required",
        },
        
      );
    };
    const ifEmail = await userData.findOne({email });
    if (!ifEmail) {
      return NextResponse.json({ status: 401 ,message:"No account exist"});
    };
    const valid = await bcryptjs.compare(password, ifEmail.password);
    if (!valid) {
      return NextResponse.json({ status: 402 ,message:"Password is incorrect"});
    } ;
    const tokenData = {
      username: ifEmail.username,
      id: ifEmail._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn:"1d"})
    const response = NextResponse.json({status:200,message:"Login successful",token});
    response.cookies.set("token", token,{httpOnly:true});
    return response;
    }
  catch (error) {
    console.log(error);
    return NextResponse.json({status:500,message:"Internal server error"});
  }
}

