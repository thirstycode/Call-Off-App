var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');
var jwt = require('jsonwebtoken');
const secret = "supersecretkey";
const { exec } = require('child_process');

// router.get('/',function(req, res, next) 
// {

//   if(req.cookies && req.cookies.token)
//   {
//     next();
//   }
//   else
//   {     
//     res.json({"success":true,'msg':'login page'});
//   }      
// },func.auth2,func.user);


router.get('/',function(req,res,next)
{
  console.log(req.body);
  if(req.cookies && req.cookies.token)
  {   
    next();
  }
  else
  {

    var token = req.query.token;

    console.log("&&&&&&&"+token);

    res.cookie('token',token, {maxAge: 48*60*60*1000, httpOnly: true });
    
    if(token)
    {
       req.token = token;  
        next();
    }
    else{
      res.json({"success":false,'msg':'system failure'});
    }

  }        
},func.auth2,func.user);

module.exports = router;