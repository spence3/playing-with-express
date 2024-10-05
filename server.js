//imports
const express = require('express')
const path = require('path')
const posts = require('./routes/posts')
const port = process.env.PORT || 8000
const app = express()
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')
const notFound = require('./middleware/notFound')


//body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//logger
app.use(logger)

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/api/posts', posts)


//error handler
app.use(notFound)
app.use(errorHandler)

app.listen(port, () =>{
    console.log(`Server is running on ${port}`)
})