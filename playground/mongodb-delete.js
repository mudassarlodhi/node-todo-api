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

  //deleteMany
  // db.collection('Todos').deleteMany({
  //   text: "Eat Lunch"
  // }).then(
  //   (success)=>console.log(success)
  // );


  db.collection('Users').deleteMany({
    name: "Mudasser Ali"
  }).then(
    (success)=>console.log(success)
  );


  //deleteOne

  // db.collection('Todos').deleteOne({
  //   text: "Eat Lunch"
  // }).then((success)=>console.log(success));



  //findOneAndDelete

  // db.collection('Todos').findOneAndDelete({
  //   completed: false
  // }).then((success)=>console.log(success));

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("5c3a1fcd6f74c533e09eacf1")
  // }).then((success)=>console.log(success));

  // client.close();
});
