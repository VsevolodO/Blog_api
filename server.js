const express = require('express')
const app = express()
const _ = require('underscore')
const passport = require('passport')
//const multer = require('multer')
const upload =  require('./middleware/f_load')
const jsonwt = require('jsonwebtoken')
const key = "test-jwt"

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
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

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(express.json());

//app.use(multer({dest:"uploads", preservePath:true}).single("filedata"));
app.use(upload.single('image'))

app.post('/registration', async (req,res) => {

    //console.log(req.query.email != undefined)
    if (req.query.email && req.query.User!= undefined){

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
            const cryptpass = await bcrypt.hash(req.query.Password, salt)
            await knex('User').insert({User:req.query.User, Password:cryptpass, email:req.query.email})
            .then(res.status(201).json({message: 'ok'}))
        }

    }
    else{
        res.status(409).json({message: 'Не заполнены небходимые поля'})
    }
})

app.post('/auth', async (req,res)=> {
    
    if (req.query.Password && req.query.User != undefined){
        const ExistUsername = await knex.select('*').table('User').where('User',req.query.User)

        if(_.isEmpty(ExistUsername) == false){
            
            const passwordResult = bcrypt.compareSync(req.query.Password, ExistUsername[0].Password)
            if(passwordResult){
                const token = jsonwt.sign({
                    email: ExistUsername[0].email,
                    User_id: ExistUsername[0].User_id

                },key,{expiresIn: 3600})
                res.status(200).json({token: `Bearer ${token}`})
            }
            else{
                res.json({status:'not ok'})
            }

        }
        
    } else{
        res.status(409).json({message: 'Не заполнены небходимые поля'})

    }
})

app.post('/blog', passport.authenticate('jwt', {session:false}), async(req, res)=> {
    
    console.log(req.body.file)

    if (req.body.Message != undefined){
        let file = req.body.file
        
        await knex('BlogData').insert({User:req.body.User, Message:req.body.Message})
            .then(res.status(201).json({message: 'ok'}))

    } 
    else{
        res.status(201).json({message:'not ok'})
    }


})

app.get('/blog', passport.authenticate('jwt', {session:false}), async(req, res)=> {
    console.log('get')
    const result = await knex('BlogData').select('Message').where({User:req.body.User})
    res.json(result)

})

const port = 9000
app.listen(port,()=>{
    console.log(`server started at ${port}`)
})

