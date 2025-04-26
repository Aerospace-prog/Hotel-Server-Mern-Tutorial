const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    mobile:{
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
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


personSchema.pre('save',async function(next){

    const person = this;//This ensures that it will calls pre middleware function whenver document is saved

    //Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) {
        return next();//here teh user not needs hashing as it is already existed user
    }
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(11);

        //hash password
        const hasedPassword = await bcrypt.hash(person.password,salt);

        //override the plain password with hashed one
        person.password = hasedPassword

        next();
    }catch(error){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with thr hashed password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(error){
        throw error;
    }
}

//Create Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person