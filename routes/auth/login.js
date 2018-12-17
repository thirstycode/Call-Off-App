var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');
var jwt = require('jsonwebtoken');
const secret = "supersecretkey";
const { exec } = require('child_process');

router.get('/',function(req, res, next) 
{

  if(req.cookies && req.cookies.token)
  {
    next();
  }
  else
  {     
    res.json({"success":true,'msg':'login page'});
  }      
},func.auth2,func.user);


router.post('/',function(req,res,next)
{
  console.log(req.body);
  if(req.cookies && req.cookies.token)
  {   
    next();
  }
  else
  {

    req.check('email','invalid email').isEmail().isLength({min:2,max:100});
    req.check('password','invalid password').isLength({min:2,max:100});
    req.check('userType','invalid type').isIn(["Buyer","Supplier","Driver"]);


    var verrs=req.validationErrors();
    if(verrs)
    {
      res.json({ success:false,msg: verrs[0].msg,});
    }
    else
    {
    var user= 
    {
      email:req.body.email,
      password:req.body.password,
      userType:req.body.userType
    };
    con.query("select id, password, userType from users where email=?",user.email,function(err,result,fields)
    {
        if(err)
        {
          console.log(err);
          res.json({'success':false,msg: 'something went wrong'});
        }
        else if(result.length==1)
        { 
          if(result[0].userType == user.userType){

            if(edo.hashPassword(user.password)===result[0].password)
            {

              exec('sudo node jwt.js ' + user.email, (err, stdout, stderr) => {
              if (err) {
                // node couldn't execute the command
                console.log(err);
                return;
              }

              // the *entire* stdout and stderr (buffered)
              // console.log(`stdout: ${stdout}`);
              // console.log(`stderr: ${stderr}`);

              token = stdout;
              // console.log('this is fucking token ',token);

              // var token=jwt.sign({aid :result[0].id}, 'supersecretkey' );
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

            });

            }
            else{
              //wrong pass
              res.json({"success":false,'msg':'login page invalid admin name/password'});
            } 
          }
          else{
            res.json({"success":false,'msg':'invalid userType'});
          }    
        }
        else{ 
            res.json({"success":false,'msg':'login page wrong email'});    
        }      
    });  
    }
  }        
},func.auth2,func.user);

module.exports = router;