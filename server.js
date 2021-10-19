const express = require('express')
const app = express()
const knex = require('knex')({
    client: 'pg',
    version: '13',
    connection: {
      host : '127.0.0.1',
      port:'5432',
      user : 'postgres',
      password : 'admin',
      database : 'Blog',
      timezone: 'UTC',
      dateStrings: true,
    }
});

app.post('/registration', async (req,res) => {
    console.log(req.query.user)
    const insert =  await knex('User').insert({user:req.query.user}, {password:req.query.password})
res.json("status:ok");


})


app.listen(9000,()=>{
    console.log('server started')
})