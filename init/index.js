const mongoose =require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = "mongodb+srv://rohitgoyal195:88QFB0vakYZwtdC1@cluster0.2abu1gz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main().then(()=>{
  console.log("connected to database");
}).catch((err)=>{
  console.log(err);
});

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({...obj,owner:"6697b0a859d5cc67b729c8c6"}));
    await Listing.insertMany(initData.data);
    console.log("data initialized");
}

initDB();