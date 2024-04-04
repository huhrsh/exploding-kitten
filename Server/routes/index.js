const express=require('express')
const router=express.Router()
const mainController=require('../controllers/mainController')

router.post('/create-user',mainController.createUser)

router.post('/login-user',mainController.loginUser)

router.get('/get-leaderboard',mainController.getLeaderboard)

router.post('/update-user',mainController.updateUser)

module.exports=router