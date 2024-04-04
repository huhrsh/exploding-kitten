const User = require('../models/user')
const mongoose=require('mongoose')

module.exports.createUser = async (req, res) => {
    try {
        const userPresent = await User.findOne({ username: req.body.username });
        if (!userPresent) {
            const newUser = await User.create({
                name: req.body.name,
                username: req.body.username
            });
            res.status(200).json(newUser);
        } else {
            res.status(500).json({ msg: "Username already taken" });
        }
    } catch (error) {
        console.error(error);
        res.status(501).json({ msg: "Internal Server Error" });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const userPresent = await User.findOne({ username: req.body.username });
        if (!userPresent) {
            res.status(500).json({ msg: "Username does not exist" });
        } else {
            res.json(userPresent);
        }
    } catch (error) {
        console.error(error);
        res.status(501).json({ msg: "Internal Server Error" });
    }
};

module.exports.getLeaderboard = async (req, res) => {
    try {
        const userData = await User.find({}).sort({won:-1});
        res.json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};


module.exports.updateUser=async(req,res)=>{
    try{
        const user=req.body
        const newUser=await User.findByIdAndUpdate(user._id,{games:user.games, won:user.won, deck:user.deck, inHand:user.inHand},{ new: true } )
        console.log(newUser)
        res.status(200).json({msg:"Updated Successfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}