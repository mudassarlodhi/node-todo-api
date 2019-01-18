

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");
const {ObjectID} = require("mongodb");


var id = '5c423fbfffefaa110cc663be'; //valid

// if(!ObjectID.isValid(id))
// {
//   console.log("ID is not Valid");
// }

//  Todo.find({
//    _id: id
//  }).then((todos)=>{
//    console.log("todos ",todos)
//  });
//
//
//  Todo.findOne({
// completedAt: null,
//  }).then((todo)=>{
//    console.log("todo ",todo)
//  });


 // Todo.findById(id).then((todoByID)=>{
 //   if(!todoByID)
 //   {
 //     console.log("ID Not Found");
 //   }
 //   console.log("todobyID ",todoByID)
 // }).catch(error=>console.log("ID not valid"));
User.findById("5c3b7da345b25e1e5438b31e").then( (user)=>{
  if(!user)
  {
    return console.log("User not found")
  }
  console.log(user);
});


User.findById("5c3b7da345a25e1e5438b31e").then( (user)=>{
  if(!user)
  {
    return console.log("User not found")
  }
  console.log("User Found ",user);
});


//All In One
User.findById("5c3b7da345a25e1e5438b31easasa").then( (user)=>{
  if(!user)
  {
    return console.log("User not found")
  }
  console.log("User Found ",user);
}).catch((e)=>console.log("Incorrect ObjectID"));
