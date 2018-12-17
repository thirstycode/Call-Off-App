var jwt = require('jsonwebtoken');



// console.log("####"+result[0].id);
// print process.argv
var args = process.argv.slice(2);

// token = args.join('.');


var decoded = jwt.verify(args[0], 'supersecretkey' );
// console.log("&&&&&&&"+token);

// res.cookie('token',token, {maxAge: 48*60*60*1000, httpOnly: true });

console.log(JSON.stringify(decoded));

// if(token)
// {
//    req.token = token;  
//     next();
// }
// else{
//   res.json({"success":false,'msg':'system failure'});
// }