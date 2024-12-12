const express = require('express');
const {register, login, getAllUsersEmail, webHookForGit } = require('../controllers/authController');
const {authenticate} = require('../middleware/authMiddleware');

const router = express.Router();
express.get('/',()=>{
    res.status(200).json({message:"done"})
})

router.post('/register', register);
router.post('/login', login);
router.get('/all-emails', getAllUsersEmail);
router.post('/webhook', webHookForGit);
router.get('/protected',authenticate, (req,res)=>{
    res.status(200).json({message:"this is a protected route"});
});

module.exports = router;