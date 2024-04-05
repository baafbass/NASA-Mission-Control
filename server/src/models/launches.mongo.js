const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber:{
    	type:Number,
    	required:true
    },
    mission:{
    	type:String,
    	required:true
    },
    launchDate:{
    	type: Date,
    	required:true,
    },
    customers: [String],
    rocket:{
    	type:String,
    	required:true
    },
    target:{
    	required:true,
    	type:String,
    },
    upcoming:{
    	type:Boolean,
    	required:true,
    },
    success:{
    	type:Boolean,
    	required:true,
        default:true

    }
});