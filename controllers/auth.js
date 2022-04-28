require('dotenv').config()

const knex = require('knex')({
    client: 'pg',
    version: '13',
    connection: {
      host : '127.0.0.1',
      port:process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB,
      timezone: 'UTC',
      dateStrings: true,
    }
});

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const _ = require('underscore')
const jsonwt = require('jsonwebtoken');
const key = "test-jwt";

module.exports.regist = async function(req,res) {
    
    if (req.body.email && req.body.user && req.body.password != undefined){

        const SameUsername = await knex.select('User').table('User').where('User',req.body.user)
        const SameEmail = await knex.select('User').table('User').where('email',req.body.email)
        

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
            const cryptpass = await bcrypt.hash(req.body.password, salt)
            await knex('User').insert({User:req.body.user, Password:cryptpass, email:req.body.email})
            .then(res.status(201).json({message: 'ok'}))
        }

    }
    else{
        res.status(409).json({message: 'Не заполнены небходимые поля'})
    }
};

module.exports.login = async function(req,res) {
    
    if (req.body.password && req.body.user != undefined){
        const ExistUsername = await knex.select('*').table('User').where('User',req.body.user)

        if(_.isEmpty(ExistUsername) == false){
            
            const passwordResult = bcrypt.compareSync(req.body.password, ExistUsername[0].Password)
            
            if(passwordResult){
                const token = jsonwt.sign({
                    email: ExistUsername[0].email,
                    User_id: ExistUsername[0].User_id

                },key,{expiresIn: 3600})
                res.status(200).json({token: `Bearer ${token}`})
            }
            else{
                res.status(401).json({message: 'Пароль не верен'})
            }

        }
        else{
            res.status(401).json({message: 'Пользователь не найден'})
        }
        
    } else{
        res.status(409).json({message: 'Не заполнены небходимые поля'})

    }
}