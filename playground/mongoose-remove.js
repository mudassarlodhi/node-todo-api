

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");


//Todo Remove

Todo.remove({
_id: "5c44a4dcb867420bb8389b48"
}).then((result)=>{
  console.log(result);
});

//Find One And Remove and return
// Todo.findOneAndRemove({
//
// });

//Find by ID and remove

// Todo.findByIdAndRemove("5c44a4d0b867420bb8389b47").then( (doc)=>{
//   console.log("Deleted ",doc);
// });
