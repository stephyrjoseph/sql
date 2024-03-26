const express = require('express');
const  hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();

const app = express();

//set up the view engine
app.set('view engine','hbs');

//enable static files
app.use(express.static('public'));

//wax-on(templte inheritance)
wax.on(hbs.handlebars);
wax.setLayoutPath('../views/layouts');

app.get('/',function(req,res){
    res.send("Hello World")
});

app.listen(3000, function(){
    console.log("server has started");
})