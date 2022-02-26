const express = require('express')
const { use } = require('passport')
const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')

const app = express()
const passport = require('passport')
const bodyparser =  require('body-parser')

app.use(bodyparser.json())



app.use(passport.initialize())
require('./middleware/passport')(passport)


app.use('/auth',authRouter)
app.use('/blog',blogRouter)

app.use('/1',authRouter)

module.exports = app
const port = 9001
app.listen(port,()=>{
    console.log(`server started at ${port}`)
})

