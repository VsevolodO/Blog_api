const express = require('express')
const { use } = require('passport')
const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')
require('dotenv').config()

const app = express()
const passport = require('passport')
const bodyparser =  require('body-parser')

app.use(bodyparser.json())

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use('/uploads', express.static('uploads'))

app.use('/api/auth',authRouter)
app.use('/api/blog',blogRouter)

module.exports = app

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server started at ${port}`)
})

