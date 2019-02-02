//
//
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj.getTimestamp());

MongoClient.connect('mongodb://localhost:27017' , {useNewUrlParser:true} , (err , client)=>{
  if(err)
  {
    return console.log("Unable To Connect To MongoDB Server");
  }
  console.log("Connected To Mongodb Server");

    const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: "Something To Do",
  //   completed: false
  // } , (err, result)=>{
  //   if(err)
  //   {
  //     return console.log("Unable to insert todo ",err);
  //   }
  //   console.log(JSON.stringify(result.ops , undefined , 2));
  // });

  // db.collection('Users').insertOne({
  //   name: "Mudasser Ali",
  //   age: 25,
  //   location: "PWD Housing Society"
  // } , (err, result)=>{
  //
  //   if(err)
  //   {
  //     return console.log("Unable to insert todo ",err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  //   console.log(typeof result.ops[0]._id.getTimestamp());
  //
  // });

  client.close();
});
