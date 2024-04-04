const mongoose=require('mongoose')

let connectionString;

// if (process.env.NODE_ENV === 'production') {
    connectionString = 'mongodb+srv://harshj2010:VX24tDMuhoVh7vjN@cluster0.a24hwkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// } else {
//     connectionString = 'mongodb://0.0.0.0/exploding-kitten';
// }

mongoose.connect(connectionString)

const db=mongoose.connection

db.on('error',()=>console.log("Error"))

db.once('open',()=>{})