//Authenticate
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStategy(async(USERNAME,PASSWORD,done)=>{
    //authentication logic here 
    try{
        console.log('Received Credentials' ,USERNAME,PASSWORD);

        const user = await Person.findOne({username : USERNAME});

        if(!user){
            //done(error,user,info)
            return done(null,false,{message : 'Incorrect Username'});
        }

        const isPasswordMatch = user.comparePassword(PASSWORD);

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message : 'Incorrect Password'});
        }


    }catch(err){
        return(done(err));
    }
}));

module.exports = passport;