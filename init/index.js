const mongoose=require("mongoose");
const initData=require("./data.js");
const listing=require("../models/listing.js");

let mongUrl="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Database is connected.");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(mongUrl);
}
const initdb=async ()=>{
   await listing.deleteMany({});
  initData.data= initData.data.map((obj)=>({...obj,owner:"66f7f833c6542eaf18b95b6b"}))
   await listing.insertMany(initData.data);
   console.log("data was initialized");

};
initdb();
