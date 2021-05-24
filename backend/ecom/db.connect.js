const mongoose = require('mongoose');
const myPassword = process.env['PASSWORD']
const connectDb=async()=>{
  try{
      const db= await mongoose.connect(`mongodb+srv://sethgAdmin:${myPassword}@sethg-cluster.kgrbn.mongodb.net/Ecom?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true} )
      console.log("succesfully connected")
  }
  catch(error){
    console.log("error while connecting",error)
  }

}
module.exports= connectDb;