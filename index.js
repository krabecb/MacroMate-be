const express = require('express')
const app = express()
const PORT = 4000
require('./config/db.connection')

//CONTROLLERS
const authController = require('./controllers/auth')

//MIDDLEWARE
//Body parser: Add JSON data from request to the request object
app.use(express.json())
//Body parser: Adds x-www-urlencoded data from request to the request object
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))