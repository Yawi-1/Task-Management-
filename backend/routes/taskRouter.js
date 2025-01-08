const express = require('express');
const authenticateUser = require('../middlewares/protectedRoute')
const router = express.Router();
const {addTask,showTask,updateStatus,deleteTask} = require('../controllers/taskController')

router.post('/add',authenticateUser,addTask)
router.get('/show',authenticateUser,showTask)
router.put('/:id',updateStatus)
router.delete('/:id',deleteTask)

module.exports = router;