require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
require('./config/db.connection')

//CONTROLLERS
const authController = require('./controllers/auth')
const postController = require('./controllers/posts_controller')

//MIDDLEWARE
//Body parser: Add JSON data from request to the request object
app.use(express.json())
//Body parser: Adds x-www-urlencoded data from request to the request object
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/posts', postController)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))