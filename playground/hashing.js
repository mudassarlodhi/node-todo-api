


const {SHA256} = require('crypto-js');
const bcryptjs = require('bcryptjs');

var password = "abc123!";

// bcryptjs.genSalt(10 , (err , salt)=>{
//   bcryptjs.hash(password , salt , (err, hash)=>{
// console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$fFDkkPRU5fqUKxvIwxQ42eB4hJwHxrS7dMf7b/B4mrAsuPtKccERK';
bcryptjs.compare(password , hashedPassword , (err, res)=>{
  console.log(res);
})
// const jwt = require('jsonwebtoken');
// var data = {
//   id:4
// }
//
// var token = jwt.sign(data, 'abc123');
// console.log(token);
//
// var decoded = jwt.verify(token , "abc123");
// console.log("decoded ",decoded);

// var message = "i am mudasser ali";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);



// var data = {
//   id: 4
// };
//
// var token = {
//   data:data,
//   hash: SHA256(JSON.stringify(data)+"somesecret").toString()
// }
// //
// // console.log("hash of 4 ",token.hash);
// //
// // token.data.id = 5;
// // token.hash  = SHA256(JSON.stringify(token.data)).toString();
// // console.log("hash of 5 ",token.hash);
//
//
// var resultHash = SHA256(JSON.stringify(token.data)+"somesecret").toString();
// if(resultHash==token.hash)
// {
//   console.log("Data was not changed");
// }
// else {
//   console.log("Data was changed! Dont trust");
// }
