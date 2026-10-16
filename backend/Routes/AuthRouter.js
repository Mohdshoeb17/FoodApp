const express =require('express');
const { signuValidation, loginValidation } = require('../middleware/authMidleware');
const { signup, login } = require('../controller/authController');
const router=express.Router();
router.post('/signup',signuValidation,signup);
router.post('/login',loginValidation,login);
module.exports=router;
