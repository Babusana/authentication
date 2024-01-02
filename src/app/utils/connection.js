import mongoose from "mongoose";
import { url } from "./db";

export default async function Connection () {
  try {
    await mongoose.connect(url,{useUnifiedTopology:true});
    console.log("Database connected successfully");
  } catch (error) {
    console.log("an error while connecting to database ",error.message);
  }
}