

require("./config/config");
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require("mongodb");
const lodash = require('lodash');
const {authenticate} = require('./middleware/authenticate');
const bcrypt = require('bcryptjs');

// const port = process.env.PORT || 3000;
const port = process.env.PORT;
var app = express();
app.use(bodyParser.json());

app.post("/todos" , authenticate, (req, res)=>{

    var todo = new Todo({
      text: req.body.text,
      _creator:req.user._id
    });

    todo.save().then((doc)=>{
      res.send(doc);
    } , (e)=>{
      res.status(400).send(e);
    });
});

app.get('/todos' , authenticate, (req, res)=>{
  Todo.find({
    _creator: req.user._id
  }).then(
    (todos)=>res.status(200).send({todos})
  ).catch((e)=>res.status(400).send(e))
});


app.get("/todos/:id" ,authenticate, (req, res)=>{
  var id = req.params.id;

   if(!ObjectID.isValid(id))
   {
     res.status(404).send();
   }
   else
   {
     // Todo.findById(id).then((todo)=>{
       Todo.findOne({
         _id: id,
         _creator: req.user._id
       }).then((todo)=>{
       if(todo)
       {
         return res.status(200).send({todo});
       }
       res.status(404).send();
     }).catch(e=>res.send.status(400).send());
   }
  // Todo.findById(id).then(()=>{
  //
  // })

});

app.delete("/todos/:id" , authenticate, (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }
  // Todo.findByIdAndRemove(id).then((result)=>{
  Todo.findOneAndRemove({
    _id: id,
    _creator:req.user._id
  }).then((result)=>{
    if(!result)
    {
      return res.status(404).send();
    }
    res.status(200).send({todo: result});
  }).catch((e)=>res.status(400).send())
});


app.patch("/todos/:id" , authenticate, (req, res)=>{
  var id= req.params.id;
  var body = lodash.pick(req.body , ['text' , 'completed']);
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }

  if(lodash.isBoolean(body.completed) && body.completed)
  {
     body.completedAt = new Date().getTime();
  }
  else
  {
    body.completed=false;
    body.completedAt= null;
  }
  // Todo.findByIdAndUpdate(id , {
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  } , {
    $set : body
  } , {new:true}).then((todo)=>{
    if(!todo)
    {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e)=>{
     res.status(400).send();
  });


});

app.post("/users" , (req, res)=>{

  var body = lodash.pick(req.body, ["email" , "password"]);
  var newUser = new User(body);

  // var newUser = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // });

  newUser.save().then(()=>{
    return newUser.generateAuthToken();
  }).then((token)=>{
    res.status(200).header('x-auth' , token).send({
      user: newUser
    })
  }).catch((err)=>{
    res.status(400).send({err})
  });
});



app.get("/users/me" , authenticate, (req, res)=>{
   res.status(200).send(req.user);
  // var token = req.header('x-auth');
  // var user = User.findByToken(token).then((user)=>{
  //   if(!user){
  //       return Promise.reject();
  //   }
  //   res.status(200).send(user)
  // } ).catch((e)=>{
  //   res.status(401).send();
  // });

});


app.post('/users/login' , (req , res)=>{
  var email = req.body.email;
  var password = req.body.password;
  User.findByCredentials(email , password).then((user)=>{
    user.generateAuthToken().then((token)=>{
      res.header("x-auth" , token).status(200).send(user);
    })

  }).catch((e)=>{
    res.status(404).send();
  });



});

app.delete('/users/me/token' , authenticate, (req , res)=>{
   var user = req.user;
   user.removeToken(req.token).then(()=>{
        res.status(200).send();
   }).catch((e)=>{
     res.status(400).send();
   });
});

app.listen(port , ()=>{console.log(`Started on port ${port}`)});

module.exports = {app}
