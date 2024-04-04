const mongoose=require('mongoose')

mongoose.connect('mongodb://0.0.0.0/exploding-kitten')

const db=mongoose.connection

db.on('error',()=>console.log("Error"))

db.once('open',()=>{})