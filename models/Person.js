const mongoose = require('mongoose');

// Define a schema for the User model
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true // This field is required
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum: ['chef', 'waiter', 'manager'], // This field can only be one of these values
        required:true // This field is required
    },mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true // This field must be unique
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true
    }
})

//Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person