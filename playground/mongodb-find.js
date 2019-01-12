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
  //
  // db.collection('Todos').find().toArray().then((documents)=>{
  //   console.log("documents are ", JSON.stringify(documents , undefined , 2));
  // } , (err)=>{
  //
  // });


//fetch All Documents
  // db.collection('Todos').find({completed:false}).toArray().then((documents)=>{
  //   console.log("documents are ", JSON.stringify(documents , undefined , 2));
  // } , (err)=>{
  //
  // });


//fetch Competed Todos Documents
  // db.collection('Todos').find({completed:false}).toArray().then((documents)=>{
  //   console.log("documents are ", JSON.stringify(documents , undefined , 2));
  // } , (err)=>{
  //
  // });


//Fetch Todo By ID
  // db.collection('Todos').find({
  //   _id:new ObjectID("5c3653957502792d34617e29")
  // }).toArray().then((documents)=>{
  //   console.log("documents are ", JSON.stringify(documents , undefined , 2));
  // } , (err)=>{
  //
  // });


  //Count The Documents
  // db.collection('Todos').find().count().then((count)=>{
  //   console.log('Todos Count ',count);
  // } , err=> console.log(err));


  //Fetch Mubashir Lodhi
  db.collection('Users').find({
    name: "Mubashir Lodhi"
  }).toArray().then((documents)=>{
    console.log('Mubashir Users ',JSON.stringify(documents , undefined , 2));
  } , err=> console.log(err));

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

  // client.close();
});
