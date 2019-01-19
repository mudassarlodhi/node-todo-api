

const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Todo} = require('../models/todo');
const {User} = require('../models/user');
const {ObjectID} = require("mongodb");

const todos = [
  { _id: new ObjectID(), text: "First test todo"},
  {  _id: new ObjectID(), text: "second test todo"}
]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=>done());
});

describe("POST /Todos" , ()=>{
  it('should create a new todo' , (done)=>{
    var text = "Test Todo Text";
    request(app).post('/todos')
    .send({text:text})
    .expect(200)
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

   request(app).get("/todos").expect(200).
   expect((res)=>{
      expect(res.body.todos.length).toBe(2);
   })
   .end(done);



  });


});



describe("GET /Todos/:id" , ()=>{
  it('should return a todo doc' , (done)=>{
       request(app).get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{

        expect(res.body.todo.text).toBe(todos[0].text)
      }).end(done)
  });



  it('should return a 404 if todo not found' , (done)=>{
       request(app).get(`/todos/5c423fbfffefaa110cc663be`)
      .expect(404)
      .expect((res)=>{

        expect(res.body).toEqual({})
      }).end(done)
  });



  it('should return a 404 for non-object ID' , (done)=>{
       request(app).get(`/todos/123`)
      .expect(404)
      .expect((res)=>{

        expect(res.body).toEqual({})
      }).end(done)
  });


});
