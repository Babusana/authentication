import { url } from "@/app/utils/db";
import  {userData}  from "@/app/utils/model/userData";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Connection from "@/app/utils/connection";
// //Get API
// export async function GET(){
//   await mongoose.connect(url)
//   const user = await userData.find()
//   return NextResponse.json({result:user,status:200})
// }
//POST API
export async function POST(request) {
  try {
    Connection();
    const payload = await request.json();
    const { username, email, password } = payload;
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          status: 402,
        },
        "All fields are required"
      );
    }
    const user = await userData.findOne({ username });
    const ifEmail = await userData.findOne({email });
    if (user || ifEmail) {
      return NextResponse.json({ status: 401 ,message:"Account already exists"});
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const finalData = {username, email, password:hashedPassword}
    const newUser = new userData(finalData);
    const result  = await newUser.save();
    return NextResponse.json(
      {
        result,
        status: 200,
        message:"Successfully registered"
      },)
    }
  catch (error) {
    console.log(error);
  }
}

