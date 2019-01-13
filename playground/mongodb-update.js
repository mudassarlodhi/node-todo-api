//
//
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017' , {useNewUrlParser:true} , (err , client)=>{
  if(err)
  {
    return console.log("Unable To Connect To MongoDB Server");
  }
  console.log("Connected To Mongodb Server");

  const db = client.db('TodoApp');

  //findOneAndUpdate

//   db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID("5c3a41f253478adaeeccb17e")
//   } , {
//   $set: {
//     completed:false
//   }
// }, {
//   returnOriginal:false
// }).then( (result)=>console.log(result));


db.collection('Users').findOneAndUpdate({
  name: "Mubashir Lodhi"
} , {
$set: {
  name:"Mudasser Lodhi"
},
$inc: {
  age:2
}
}, {
returnOriginal:false
}).then( (result)=>console.log(result));



  // client.close();
});
