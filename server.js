const express = require('express')
const app = express()
const port = 3000
const post_router = require('./routes/posts.js')
const dotenv = require('dotenv')

// Importing the posts data from db.js
const posts = require('./data/db.js')

//Importing the middlewares Errors handlers
const error404handler = require('./middlewares/error404handler.js')
const errors500handlers = require('./middlewares/error500handler.js')

//Set Body Parser
app.use(express.json())

// Set the router for the posts API

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})

app.get('/', (req, res) => {
    // res.json(posts)
    res.send('Post Page')
})

app.use('/api/posts', post_router)

app.use(error404handler)
app.use(errors500handlers)