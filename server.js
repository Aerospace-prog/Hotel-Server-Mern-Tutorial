const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get('/',(req,res)=>{
    res.send('Welcome to My Hotel Server :)');
})

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')
//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes)



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})