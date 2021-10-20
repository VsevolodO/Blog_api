const express = require('express')
const app = express()
const _ = require('underscore')
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

    //console.log(req.query.email != undefined)
    if (req.query.email != undefined){

        const SameUsername = await knex.select('User').table('User').where('User',req.query.User)
        const SameEmail = await knex.select('User').table('User').where('email',req.query.email)
        

        if(_.isEmpty(SameUsername) == false && _.isEmpty(SameEmail) == false){
            res.status(409).json({message:'Имя пользователя и адресс почты заняты!'})
        }
  
        else if( _.isEmpty(SameUsername) == false){
            res.status(409).json({message: 'Имя пользователя занято. Пропробуйте другое'})
        }
    
        else if(_.isEmpty(SameEmail) == false) {
            res.status(409).json({message: 'Адрес электроной почты занят. Пропробуйте другой'})
        }

        else { 
            await knex('User').insert({User:req.query.User, Password:req.query.Password, email:req.query.email})
            .then(res.status(201).json({message: 'ok'}))
        }

    }
    else{
        res.status(409).json({message: 'Не заполнены небходимые поля'})
    }
})


app.listen(9000,()=>{
    console.log('server started')
})