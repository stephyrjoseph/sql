const express = require('express');
const  hbs = require('hbs');
const wax = require('wax-on');
const {createConnection} = require('mysql2/promise');
// const { Connection } = require('mysql2/typings/mysql/lib/Connection');
require('dotenv').config();

const app = express();



//set up the view engine
app.set('view engine','hbs');

// require('handlebars-helpers')({
    // handlebars:hbs.handlebars
// })

//enable static files
app.use(express.static('public'));

// enable the form processing
app.use(express.urlencoded({
    extended:false
}))

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
    app.post('/create-Users', async function(req,res){
        const{name,email,address,contact_no}=req.body;
        const query= `INSERT INTO Users(name,email,address,contact_no)
        VALUES ("${name}","${email}","${address}","${contact_no}");`

        //res.send(query);
        const response = await connection.execute(query);

        res.redirect('/Users');
    })
    app.get("/delete-Users/:UserId",async function(req,res){
        const {UserId} = req.params; // same as 'const UserId = req.params.UserId'
        const query = `SELECT * FROM Users WHERE user_id =${UserId}`;
        const [Users] = await connection.execute(query);
        const userToDelete = Users[0];

        res.render('delete-Users',{
            'user': userToDelete
        })

    })
    app.post('/delete-Users/:UserId',async function(req,res){
        const {UserId} = req.params;
        const query = `DELETE FROM Users WHERE user_id =${UserId}`;
        const [Users]=await connection.execute(query);
        res.redirect('/Users');

    })
    app.get('/update-Users/:UserId',async function(req,res){
        const {UserId} = req.params;
        const query = `SELECT * FROM Users WHERE user_id = ${UserId}`;
        const [Users]=await connection.execute(query);
        const wantedUser = Users[0];

        res.render('update-Users',{
            'user':wantedUser

        });
    })
    app.post('/update-Users/:UserId',async function(req,res){
        const {UserId} = req.params;
        const {name,email,address,contact_no}=req.body;
        const query = `UPDATE Users SET name="${name}", 
        email="${email}",
        address="${address}",
        contact_no=${contact_no} WHERE user_id = ${UserId}`;
        const [Users]=await connection.execute(query);
        res.redirect('/Users');
    })
}

main();





app.listen(4000, function(){
    console.log("server has started");
})