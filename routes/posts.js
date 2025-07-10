
const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts_controller')
const checkToken = require('../middlewares/checkToken')

// Importing the posts data from db.js
const posts = require('../data/db');

//Index
router.get('/', posts_controller.index)

// Show
router.get('/:id', posts_controller.show)

//Store
router.post('/', checkToken, posts_controller.store)

//Update
router.put('/:id', checkToken, posts_controller.update)

//Modify
router.patch('/:id', checkToken, posts_controller.modify)

//Destroy
router.delete('/:id', checkToken, posts_controller.destroy)
module.exports = router;

