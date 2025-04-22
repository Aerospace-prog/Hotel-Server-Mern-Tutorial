const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bcrypt = require('bcrypt');

const cors = require('cors');
app.use(cors());// allow frontend to access the backend

//Body parser -- to parse the body of the request
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

//PORT Storing
const PORT = process.env.PORT || 3000


//Middleware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]  Request Made to - ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest); // For adding log in every route (Recommended)


//Initialized passport and now time for to set which route authentincate
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session : false});



app.get('/',localAuthMiddleware,(req,res)=>{
    res.send('Welcome to My Hotel Server :)');
})


//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes')
//Use the routers
app.use('/person',personRoutes);
app.use('/menu',localAuthMiddleware,menuRoutes)



app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
})