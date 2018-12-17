var extend = require('util')._extend;
var con = require('./db');
var edo=require('./edonomix.js');
var jwt = require('jsonwebtoken');
const secret = "supersecretkey";
const { exec } = require('child_process');

module.exports = {

    user: function(req, res) 
    {
       con.query("SELECT name as username, email, userType FROM users where email=?",[req.decoded.data],function(err,result,fields)
      {
        if(err)
        {
          console.log(err);
          res.json({"success":false,'msg':'something wrong'});  
        }
        else if(result.length==1)
        {
          req.session.email = result[0].email;
          console.log(req.session.email)
           res.json({'success':true,'msg':'home page','data':result,'token':req.token})        }
        else
        { 
          res.json({"success":false,'msg':'something wrong'});  
        }      
      });
    },

   

    logout :function(req,res,next){
        console.log("req.session.cookie.maxAge"+req.session.cookie.maxAge);
        req.session.destroy();
        next();
    },
    logauth :function(req,res,next)
    {
      console.log(req.ip);
      var user = extend({}, req.body);
      con.query("select *  from user where user_name=?",user.username,function(err,result,fields){
      if(err)
        {      
          console.log(err);
          res.json({'success':false});
        }
       else if(result.length==1)
       {
          if(edo.hashPassword(user.password)===result[0].password)
          {
            var hour = 3600000; 
            req.session.cookie.expires = new Date(Date.now() + hour);
            req.session.cookie.maxAge = hour;
            console.log("req.session.cookie.maxAge"+req.session.cookie.maxAge,req.session.cookie.expires);
            req.session.userid=result[0].user_id;
            next();
          }
          else
          {
            //wrong pass
            res.json({"success":true,'msg':'user login page invalid user name/password'});
          }     
      }
      else
      { 
        console.log("hash"+edo.hashPassword(user.password));
        res.json({"success":true,'msg':'user login page wrong username'});       
      }  
      });
    },
    auth2:function(req,res,next)
    {
      var token =req.cookies.token || req.token;
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
    console.log('--------------------------------------------------------------------------');
    console.log('token before',token);
    token = req.headers.authorization.split(' ')[1];
    console.log('token after',token);
    }
    console.log('token'+token);
      if (token) 
      {   

          exec('sudo node jwtverify.js ' + token, (err, stdout, stderr) => {
          if (err) {
            // node couldn't execute the command
            console.log(err);
            res.json({"success":false,'msg':'jwtverify file error'});
            return;
          }

              req.decoded = JSON.parse(stdout);
              // console.log(req.decoded.data)
              req.token=token;
              next();

        });

      } 
      else 
      {
        console.log('pratik *********************'+JSON.stringify(req.headers)+'*************************************************');
        res.json({"success":false,'msg':'user login page'});
      }
    }, 
    auth3:function(req,res,next)
    {
      var token =req.cookies.token || req.token;
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { // Authorization: Bearer g1jipjgi1ifjioj
      // Handle token presented as a Bearer token in the Authorization header
    console.log('--------------------------------------------------------------------------');
    token = req.headers.authorization.split(' ')[1];
    }
      if (token) 
      { 
        res.json({"success":false,'msg':'user login page'});
      } 
      else 
      {
        next();
      }
    },   
}         

