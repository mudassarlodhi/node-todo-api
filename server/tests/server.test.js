

const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {ObjectID} = require("mongodb");
const {todos , populateTodos , users , populateUsers} = require('./seed/seed');

//
// const todos = [
//   { _id: new ObjectID(), text: "First test todo"},
//   {  _id: new ObjectID(), text: "second test todo", completed:true , completedAt:333}
// ];
beforeEach(populateUsers);
beforeEach(populateTodos);

describe("POST /Todos" , ()=>{
  it('should create a new todo' , (done)=>{
    var text = "Test Todo Text";
    request(app).post('/todos')
    .send({text:text})
    .expect(200)
    .set("x-auth" , users[0].tokens[0].token)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res)=>{
      if(err)
      {
        return done(err);
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(3);
        expect(todos[2].text).toBe(text);
        done();
      }).catch((e)=>done(e));

    })
  });


  it('should not create a todo ' , (done)=>{

    request(app).post('/todos').send({})
    .expect(400)
    .set("x-auth" , users[0].tokens[0].token)
    .end((err, res)=>{
      if(err)
      {
        return done(err)
      }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch(err=> done(err));
    });


  })
});





describe("GET /Todos" , ()=>{
  it('should return all todos' , (done)=>{

   request(app).get("/todos")
   .set("x-auth" , users[0].tokens[0].token)
   .expect(200).
   expect((res)=>{
      expect(res.body.todos.length).toBe(1);
   })
   .end(done);



  });


});



describe("GET /Todos/:id" , ()=>{
  it('should return a todo doc' , (done)=>{
       request(app).get(`/todos/${todos[0]._id.toHexString()}`)
      .set("x-auth" , users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{

        expect(res.body.todo.text).toBe(todos[0].text)
      }).end(done)
  });


  it('should not return a todo doc created by other user' , (done)=>{
       request(app).get(`/todos/${todos[1]._id.toHexString()}`)
      .set("x-auth" , users[0].tokens[0].token)
      .expect(404)
      .end(done)
  });



  it('should return a 404 if todo not found' , (done)=>{
       request(app).get(`/todos/5c423fbfffefaa110cc663be`)
       .set("x-auth" , users[0].tokens[0].token)
      .expect(404)
      .expect((res)=>{

        expect(res.body).toEqual({})
      }).end(done)
  });



  it('should return a 404 for non-object ID' , (done)=>{
       request(app).get(`/todos/123`)
       .set("x-auth" , users[0].tokens[0].token)
      .expect(404)
      .expect((res)=>{

        expect(res.body).toEqual({})
      }).end(done)
  });


});




describe("DELETE /Todos/:id" , ()=>{
  it('should delete a record' , (done)=>{
    var id = todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .set("x-auth" , users[0].tokens[0].token)
        .expect(200)
        .expect( (res)=>{
          expect(res.body.todo._id).toBe(id)
        })
        .end((err , res)=>{
          if(err)
          {
            return done(err);
          }
          Todo.findById(id).then(
            (todo)=>{
              expect(todo).toBeFalsy();
              done();
            }
          )

        });
  });



  it('should not delete a todo created by other user' , (done)=>{
    var id = todos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .set("x-auth" , users[1].tokens[0].token)
        .expect(404)
        .end((err , res)=>{
          if(err)
          {
            return done(err);
          }
          Todo.findById(id).then(
            (todo)=>{
              expect(todo).toBeTruthy();
              done();
            }
          )

        });
  });

  it('should return a 404 if todo not found' , (done)=>{
        request(app)
        .delete("/todos/5c44a59970db5c0e3084dcb6")
        .set("x-auth" , users[1].tokens[0].token)
        .expect(404)
        .end(done);

  });

  it('should return a 404 if object id is invalid' , (done)=>{
    request(app)
    .delete("/todos/123")
    .set("x-auth" , users[1].tokens[0].token)
    .expect(404)
    .end(done);
  });
});



describe("PATCH /Todos" , ()=>{
it('should change text and convert false to true' , (done)=>{
  var id = todos[0]._id.toHexString();
  var text = "The first updated test text";
  request(app)
  .patch(`/todos/${id}`)
  .set("x-auth" , users[0].tokens[0].token)
  .expect(200)
  .send({
    text,
    completed: true
  })
  .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        // expect(res.body.todo.completedAt).toBeA('number');
        expect(typeof res.body.todo.completedAt).toBe('number');
  }).end(done);

});


it('should not change text and convert false to true' , (done)=>{
  var id = todos[0]._id.toHexString();
  var text = "The first updated test text";
  request(app)
  .patch(`/todos/${id}`)
  .set("x-auth" , users[1].tokens[0].token)
  .expect(404)
  .send({
    text,
    completed: true
  })
  .end(done);

});


it('should clear the completedAt when todo is not completed' , (done)=>{
      var id = todos[1]._id.toHexString();
      var text = "Second Text string";
      request(app).patch(`/todos/${id}`)
      .set("x-auth" , users[1].tokens[0].token)
      .send({
        text,
        completed:false
      })
       .expect(200)
      .expect((res)=>{
         expect(res.body.todo.text).toBe(text);
         expect(res.body.todo.completed).toBe(false);
         expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
});

});



describe("GET /Users/me" , ()=>{
  it('should return a user if authenticated' , (done)=>{
      request(app).get("/users/me").
      set("x-auth" , users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  });


  it('should return a 404 if authenticated' , (done)=>{
    request(app).get("/users/me")
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    })
    .end(done)
  });
})



describe("POST /users" , ()=>{
  it('should create a user' , (done)=>{
    var email = "example@example.com";
    var password = "abcd123";
    request(app).post("/users")
    .send({
      email,
      password
    }).expect(200)
    .expect((res)=>{
      expect(res.headers["x-auth"]).toBeTruthy();
      expect(res.body.user._id).toBeTruthy();
      expect(res.body.user.email).toBe(email);
    }).end((err)=>{
      if(err)
      {
        return done(err)
      }
      User.findOne({
        _id: users[0]._id,
        email:users[0].email
      }).then((user)=>{
        expect(user).toBeTruthy();
        expect(user.password).not.toBe(users[0].password);
        done();
      }).catch(()=>done(err));
    })
  });


  it('should return validation error if request invalid' , (done)=>{
    var email = "example@example.com";
    var password = "abcd";
    request(app).post("/users")
    .send({
      email,
      password
    }).expect(400)
    .end(done)
  });


  it('should return error if email already exists' , (done)=>{
    var email = users[0].email;
    var password = "abcd";
    request(app).post("/users")
    .send({
      email,
      password
    }).expect(400)
    .end(done)
  });
})


describe("POST /users/login" , ()=>{
  it('should login user and return auth token' , (done)=>{
    request(app).
    post("/users/login")
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect((res)=>{
      expect(res.headers["x-auth"]).toBeTruthy();
    }).end((err , res)=>{
      if(err)
      {
        return done(err)
      }
      User.findById(users[1]._id).then((user)=>{
        expect(user.toObject().tokens[1]).toMatchObject({token:res.headers["x-auth"] , access:"auth"});
        done();
      }).catch((err)=>done(err));
    })

  });


  it('should reject invalid login' , (done)=>{
    request(app).
    post("/users/login")
    .send({
      email: users[1].email,
      password: users[0].password
    })
    .expect(404)
    .expect((res)=>{
      expect(res.headers["x-auth"]).toBeFalsy();
    }).end((err, res)=>{
      if(err)
      {
        return done(err)
      }
      //
      // Todo.findById(id).then(
      //   (todo)=>{
      //     expect(todo).toNotExist();
      //     done();
      //   }
      // )

      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens.length).toBe(1);
        done();
      }).catch(err=>done(err));
    });
  })

});


describe("Delete /users/me/token" , ()=>{


  it('should delete auth token / logout a user' , (done)=>{
    request(app)
    .delete("/users/me/token")
    .set("x-auth" , users[0].tokens[0].token)
    .expect(200)
    .end((err, res)=>{
      User.findOne({
        _id: users[0]._id
      }).then((user)=>{
        expect(user.tokens.length).toBe(0);
        done();
      }).catch((err)=>done(err))
    })
  });
})
