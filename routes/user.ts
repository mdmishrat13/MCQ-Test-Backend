const express = require('express');
const {
    createUser,
    loginUser,
    getProfile,
    logoutUser,
    getUsers,
    checkLoggedIn,
} = require('./../controllers/user')

const router = express.Router()

router.post('/register',createUser);
router.post('/login',loginUser);
router.get('/checkloggedin',checkLoggedIn);
router.get('/logout',logoutUser)
router.get('/profile/:id',getProfile)
router.get('/users',getUsers)


module.exports = router;