const express = require('express');
const {
    createUser,
    loginUser,
    getProfile,
    logoutUser,
    getUsers,
    checkLoggedIn,
} = require('./../controllers/user')

const {
    createCourse,
    getCourse,
    getCourses
} = require('./../controllers/courses')

const {
    createChapter,
    // getChapter,
    getChapters,
} = require('./../controllers/chapters')
const {
    createQuestion,
    getQuestions,
    getAllQuestions,
    DeleteAll
} = require('./../controllers/questions')

const router = express.Router()

router.post('/auth/register',createUser);
router.post('/auth/login',loginUser);
router.get('/auth/checkloggedin',checkLoggedIn);
router.get('/auth/logout',logoutUser)
router.get('/auth/profile/:id',getProfile)
router.get('/auth/users', getUsers)



router.post('/course/create',createCourse);
router.get('/course/:id',getCourse)
router.get('/courses',getCourses)

router.post('/course/chapter',createChapter);
router.get('/course/chapters/:id',getChapters)

router.post('/course/chapter/question',createQuestion);
// router.get('/course/chapter/questions',getAllQuestions);
router.get('/course/chapter/question/:id',getQuestions)
router.delete('/course/chapter/question/:id',DeleteAll)


module.exports = router;