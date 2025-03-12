import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username : { type : String, unique : true, required : true },
  password : { type : String, required : true },
})

const contentTypes = ['image','video','article','audio'];

const contentSchema = new mongoose.Schema({
  link : { type : String, required : true },
  type : { type : String, enum : contentTypes, required : true },
  title : { type :String, required : true },
  tags : { type : mongoose.Schema.Types.ObjectId, ref : "tags" },
  userId : { type : mongoose.Schema.Types.ObjectId, ref : "users", required: true }
})

const tagSchema = new mongoose.Schema({
  title : { type : String, required: true, unique: true }
})

const lindSchema = new mongoose.Schema({
  hash : { type : String, required : true },
  userId : { type : mongoose.Schema.Types.ObjectId, ref : "users", required: true }
})

const User = mongoose.model("users",userSchema);
const Tag = mongoose.model("tags",tagSchema);
const Content = mongoose.model("contents",contentSchema);
const Link = mongoose.model("links",lindSchema);


export  { Tag,User,Content,Link } ;