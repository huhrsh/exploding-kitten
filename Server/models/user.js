const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = mongoose.Schema({
    name: {
        require,
        type: String
    },
    username: {
        require,
        type: String
    },
    games: {
        type: Number,
        default: 0
    },
    won: {
        type: Number,
        default: 0
    },
    highScore: {
        type: Number,
        default: 0
    },
    current: {
        type: Number,
        default: 0
    },
    deck: {
        type: Array,
        default: []
    },
    inHand: {
        type: Array,
        default: []
    }
})

const User = new mongoose.model("User", userSchema)
module.exports = User