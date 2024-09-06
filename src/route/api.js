

const express= require('express')
const router= express.Router()
const testController= require('../controllers/testController')
const userController= require('../controllers/userController')
const authverifymiddleware = require('../middlewares/authverifymiddleware')
const todoController= require('../controllers/todoController')


// user api
router.get("/test", testController.test)
router.post('/registration', userController.registration)
router.get('/login', userController.logIn)
router.get('/get-all-users', userController.getAllUsers)
router.put('/update-user/:id', userController.upateUser)
router.post('/delete-user/:id', userController.deleteUser)
router.post('/user-profile-update', authverifymiddleware, userController.profileUpdate)     
router.get('/user-profile-details', authverifymiddleware, userController.profileDetails)     
router.get('/email-verify/:email', userController.emailVerify)
router.get('/otp-verify/:email/:otp', userController.otpVerify)
router.post('/reset-password', userController.resetPassword)
// user api end


// todo api


router.post('/create-todo', authverifymiddleware, todoController.createTodo)
router.post('/todo-update-status/:id/:status', authverifymiddleware, todoController.updateTodo)
router.get('/delete-todo/:id', authverifymiddleware, todoController.deleteTodo)
router.get('/todo-list-by-status/:status',authverifymiddleware, todoController.todoList)
router.get('/todo-count-by-status', authverifymiddleware, todoController.todoCount)

// todo api end 



module.exports= router