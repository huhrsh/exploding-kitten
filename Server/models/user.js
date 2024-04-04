const mongoose=require('mongoose')

const userSchema= mongoose.Schema({
    name:{
        require,
        type:String
    },
    username:{
        require,
        type:String
    },
    games:{
        type:Number,
        default:0
    },
    won:{
        type:Number,
        default:0
    },
    deck:{
        type:Array,
        default:[]
    },
    inHand:{
        type:Array,
        default:[]
    }
})

const User=new mongoose.model("User",userSchema)
module.exports=User