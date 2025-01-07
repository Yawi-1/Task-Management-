const express = require('express');
const authenticateUser = require('../middlewares/protectedRoute')
const router = express.Router();
const {addTask,showTask,updateTask,deleteTask} = require('../controllers/taskController')

router.post('/add',authenticateUser,addTask)
router.get('/show',authenticateUser,showTask)
router.put('/update',updateTask)
router.delete('/delete',deleteTask)

module.exports = router;