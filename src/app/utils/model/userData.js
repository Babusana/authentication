import mongoose from "mongoose"
const userDataSchema = new mongoose.Schema({
  username:{
    type:String,
    required: true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,  
    required:true
  }
})
export const userData = mongoose.models.userdata || mongoose.model("userdata",userDataSchema)||mongoose.model("userdata",userDataSchema)