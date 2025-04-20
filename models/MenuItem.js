const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    itemName :{
        type:String,
        required : true
    },
    itemPrice :{
        type:Number,
        required : true
    },
    taste:{
        type:String,
        enum : ['Sweet', 'Spicy', 'Sour', 'Bitter'],
        required : true
    },
    is_Drink :{
        type:Boolean,
        default : false // default value
    },
    ingredients :{
        type:[String],
        default : []
    },
    num_sales:{
        type:Number,
        default : 0
    }
})

const MenuItem = mongoose.model('MenuItem', menuSchema);

module.exports = MenuItem