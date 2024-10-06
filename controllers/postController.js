const express = require('express')
const router = express.Router()
var fs = require('fs')
var data = fs.readFileSync('db.json')
var posts = JSON.parse(data)

// let posts = [
//     {id: 1, title: 'Post One'},
//     {id: 2, title: 'Post Two'},
//     {id: 3, title: 'Post Three'}
// ]

// @desc     get all posts
// @route    GET /api/posts
const getPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
        return res
            .status(200)
            .json(posts.slice(0,limit))
    }
    res.status(200).json(posts.posts)
}


//@desc     get single post
//@route    GET /api/posts/:id
const getPost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.posts.find((post) => post.id === id)

    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }
    res.status(200).json(post)  
}

//@desc     create new post
//@route    POST /api/posts/
const createPost = (req, res, next) => {
    const newPost = {
        id: posts.posts.length + 1,
        title: req.body.title
    }
    if(!newPost.title){
        const error = new Error(`Please include a title`)
        error.status = 400
        return next(error)
    }
    posts.posts.push(newPost)
    fs.writeFile('db.json', JSON.stringify(posts), (err) => {
        if(err) throw err
        console.log('Successfully added')
    })
    // console.log(posts)
    res.status(201).json(posts)
}

//@desc     update post
//@route    PUT /api/posts/:id
const updatePost =  (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)
    
    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }

    post.title = req.body.title
    res.status(200).json(posts)
}



//@desc     delete post
//@route    DELETE /api/posts/:id
const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const index = posts.findIndex(post => post.id === id)
    console.log(index)

    if(index === -1){
        const error = new Error(`A post with the id of ${id} was not found`)
        return next(error)
    }
    posts.splice(index,1)
    res.status(200).json(`Deleted post with id ${id}`)
}


// Export the functions
module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};