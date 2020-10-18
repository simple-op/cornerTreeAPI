const mongoose=require("mongoose");


const schema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now(),
        required:true
    }
   
},{
    timestamps:true
    
})






const model=mongoose.model("jobs",schema);

module.exports=model;