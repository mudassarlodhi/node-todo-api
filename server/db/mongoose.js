


var env = process.env.NODE_ENV || "development";


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp" ,  {useNewUrlParser:true});
if(env == "development" || env == "test")
{
  mongoose.connect(process.env.MONGODB_URI,  {useNewUrlParser:true});
}
else
{
    mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    auth: {
      user: process.env.dbUsername,
      password: process.env.dbPassword
    }
  }).then(()=>{}).catch((e)=>console.log("error ",e));
}

module.exports =
{
  mongoose:mongoose
}
