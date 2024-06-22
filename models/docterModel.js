import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    username:String,
    password:String,
    docName:String,
    docQuals:[String],
    domain:String,
})

const Doctor=mongoose.model("doctors", doctorSchema)
export default Doctor