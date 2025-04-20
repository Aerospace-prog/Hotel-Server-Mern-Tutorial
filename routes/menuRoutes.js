const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');


//POST method to add menu items
router.post('/',async (req,res)=>{
    try{
        const data = req.body;

        const menuItem = new MenuItem(data);

        const response = await menuItem.save();

        console.log('data saved');

        res.status(200).json(response);


    }catch(error){
        console.log(error);

        res.status(500).json({error : 'Internal Server Error'});
    }
})


//GET method to get menu item
router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
    
        console.log('Data Fetched');

        res.status(200).json(data);
    }catch(error){
        console.log(error);

        res.status(500).json({error : 'Internal Sever Error'});
    }
})


//Parameterized API for taste
router.get('/:taste',async(req,res)=>{
    try{
        const taste = req.params.taste;

        const response = await MenuItem.find({taste:taste});

        console.log('Data Fetched');

        res.status(200).json(response);
    }catch(error){
        console.log(error);

        res.status(500).json({error : 'Internal Sever Error'});

    }
})


//Update Route for Menu Item
router.put('/:id' , async (req,res)=>{
    try{
        const menuId = req.params.id;

        const data = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuId, data, {
            new:true, // return the updated document
            runValidators:true,// Run mongoose validators
        });

        if(!response){
            return res.status(400).json({error : 'Invaled Menu Id'});
        }
        console.log('Data Updated');
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Sever Error'});
    }
})

//Delete Route for Menu Item
router.delete('/:id',async (req,res)=>{
    try{
        const menuId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuId);

        if(!response){
            return res.status(400).json({error : 'Invaled Menu Id'})
        }
        console.log('Data Deleted');
        res.status(200).json(response);

    }catch(error){
        console.log(error);
        res.status(500).json({error : 'Internal Sever Error'});
    }
})

module.exports = router