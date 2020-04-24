const express = require('express');
const mysql = require('mysql');
const db = require('../models/data');
const router = express.Router();


 router.post('/insertposts',(req,res)=>{
    //let post = {title:'Post One', body:'This is Pots one', email:'steve@gmail.com'};
    let post = {title: req.body.title, body: req.body.body, email: req.body.email};
    //res.send(post);
    let sql = "INSERT INTO `posts` SET ?";// ? means value is in placeholder
    db.query(sql,post,(err,result)=>{
        if(err) throw err;
        console.log("data saved");
        res.send("Data Saved Successfully");
        
    })
})



//Fetch the data
router.get('/showalldata',(req,res)=>{
    let sql = "SELECT * from `posts` ";
    db.query(sql,(err,result)=>{
        if(err) throw err;
        //console.log(result);
        //res.send(result);
        res.render('showdata',{result1:result});
    })

})


//Fetch particular data 
router.get('/showalldata/:id',(req,res)=>{
    let sql = `SELECT * from posts where id=${req.params.id} `;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    })

})


//Update data
router.get('/update/:id',(req,res)=>{
    //let newTitle = "Post Four";
    //let sql =`UPDATE posts SET title='${newTitle}' where id = ${req.params.id}` ;
    //varchar always in single quote '${newTitle}'  not backticks
    let email = req.params.id;
    let sql =`SELECT * FROM posts where email='${email}' `;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        //res.send(result);
        res.render('update',{list:result, viewTitle:"Update Users"});
        
    })
})

router.post('/employee-update',(req,res)=>{
    console.log(req.body);
    const title = req.body.title;
    const body = req.body.body;
    const email=req.body.email;
    let sql =`UPDATE posts SET title='${title}' , body ='${body}' WHERE email='${email}'`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.redirect('/showalldata');
    })
})


//Delete item 
router.get('/delete/:id',(req,res)=>{
    let email=req.params.id;
    let sql = `DELETE FROM posts where email = '${email}' `; 
  db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.redirect('/showalldata');
    })
})

module.exports = router;