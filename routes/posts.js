const express = require('express')
const {getPosts, getPost, createPost, updatePost, deletePost} = require('../controllers/postController')
const router = express.Router()

//Get all posts
router.get('/', getPosts)

//Get a single post
router.get('/:id', getPost)

//Create new post
router.post('/', createPost)

//update post
router.put('/:id', updatePost)

//delete post
router.delete('/:id', deletePost)

module.exports = router
