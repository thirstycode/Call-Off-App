var express = require('express');
var router = express.Router();
var func = require('../func.js');
var edo=require('../edonomix.js');
var con = require('../db');

router.get('/',func.auth2,function(req, res, next) 
{ 
     con.query("SELECT * FROM users WHERE email=?",req.session.email,function(err,result,fields)
    {
      if(err)
      {
        console.log(err);
        res.json({'success':false,msg: 'something went wrong'});
      }
      else if(result.length > 0)
      { 
        if(result[0].userType == 'Buyer'){

         con.query("SELECT * FROM orders WHERE email = ?",req.session.email,function(err,result,fields)
        {
          if(err)
          {
            console.log(err);
            res.json({'success':false,msg: 'something went wrong'});
          }
          else 
          { 
            res.json({ success:true,msg: 'view orders','orders':result});
          }
        });
        }
        else{
          res.json({success:false,msg: 'You need to be buyer to do this'});
        }
      }
      else
      { 
        res.json({success:false,msg:'login again'}) ;    
      }      
    });
  	   
});


module.exports = router;