const express = require('express');
const  hbs = require('hbs');
const wax = require('wax-on');
const {createConnection} = require('mysql2/promise');
require('dotenv').config();

const app = express();

//set up the view engine
app.set('view engine','hbs');

//enable static files
app.use(express.static('public'));

//wax-on(templte inheritance)
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

async function main(){
    
    const connection = await createConnection({
        'host':process.env.DB_HOST,
        'user':process.env.DB_USER,
        'database':process.env.DB_DATABASE,
        'password':process.env.DB_PASSWORD
    })
    app.get('/Users', async function(req,res){
        // the [] is known as array destucting
       let[Users]= await connection.execute(`
       SELECT * FROM  Users
       `);
       res.render('Users',{
        'Users':Users
       });
    });
    app.get('/create-Users', async function(req,res){
        res.render('create-Users')
    })

}

main();





app.listen(4000, function(){
    console.log("server has started");
})