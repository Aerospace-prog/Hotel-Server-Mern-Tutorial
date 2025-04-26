const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


//POST route to add a person
router.post('/',async (req,res)=>{
    try{
        const data = req.body //Assuming the request body contains person data

        //Create a new Person document using the mongoose model
        const newPerson = new Person(data);
        
        //Save the person document to the database (handling callback)
        const response = await newPerson.save(); // wait for the promise to resolve
        console.log('data saved');

        res.status(200).json(response);
    }catch(error){
        console.log(error);

        res.status(500).json({error : 'Internal Server Error'});
    }
})



//GET method to get the peroson
router.get('/',async (req,res)=>{
    try{
        const data = await Person.find(); //find all documents in the collection

        console.log('Data Fetched');

        res.status(200).json(data);
    }catch(error){
        console.log(error);

        res.status(500).json({error:'Internal Server Error'})
    }
})

//GET Person By Id route
router.get('/:id' , async(req,res)=>{
    
    try{
        const id = req.params.id; //Extract the Id from URL parameter

        const data = await Person.findById(id);

        if(!data){
            return res.status(400).json({error : 'Invaled Person Id'});
        }

        console.log('Data Fetched');
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'});
    }
})



//Parameterized API endpoint
router.get('/work/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType; // Extract the work type from URL parameter

        if(workType === 'chef' || workType === 'waiter' || workType === 'manager'){
            
            const response = await Person.find({work:workType});

            console.log('Data Fetched');

            res.status(200).json(response);

        }else{
            res.status(400).json({error : 'Invalid work type'});
        }
    }catch(error){
        console.log(error);

        res.status(500).json({error : 'Internal Sever Error'});
    }

})

//Update Operation
router.put('/:id' , async(req,res)=>{
    try{
        const personId = req.params.id; //Extract the Id from URL parameter

        const updatedPersonData = req.body; //Assuming the request body contains person data

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new:true, // return the updated document
            runValidators:true,// Run mongoose validators
        })

        if(!response){
            return res.status(400).json({error : 'Invaled Person Id'});
        }

        console.log('Data Updated');
        res.status(200).json(response);

    }catch(error){
        console.log(error);

        res.status(500).json({error : 'Internal Sever Error'});
    }
})

//DELETE Operation
router.delete('/:id',async(req,res)=>{
    try{
        const personId = req.params.id; //Extract the Id from URL parameter

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(400).json({error : 'Invaled Person Id'});
        }

        console.log('Data Deleted');
        res.status(200).json(response);
    }catch(error){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})


module.exports = router