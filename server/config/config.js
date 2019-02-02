
var env = process.env.NODE_ENV || "development";

var config = require("./config.json");
if(env=="development" || env=="test")
{

  var envConfig = config[env];
  // console.log(envConfig.PORT);

  Object.keys(envConfig).forEach((key)=>{
    process.env[key] = envConfig[key];
  });

}
else
{
   process.env.dbUsername =   config["production"].username;
   process.env.dbPassword =   config["production"].password;
}

// if(env=="development")
// {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
// }
// else if(env=="test")
// {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
// }
