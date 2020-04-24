const express = require('express');
//const mysql = require('mysql');
//const db = require('./models/data');

const exphbs = require('express-handlebars');
const app = express();
app.use(express.json()); //middleware function h yh hmesha upar hi rhega neeche jaega to work ni krega

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:false})); //form se data send (title,body,eail sb lenta h yh form se)
//abhi yh vali chalegi data lene k lie html k form se..express.json wali middleware nahi 
app.use('/',require('./controllers/controller'));
 
app.get('/abc',(req,res)=>{
    res.render('showdata');
})

app.get('/xyz',(req,res)=>{
    // res.send("hello");
    res.render('home',{title:"Add Data"});
})

app.get('/abc',(req,res)=>{
    res.render('showdata',{list:result});
})

const PORT =5000;
app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});

