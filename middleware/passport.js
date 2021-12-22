const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = "test-jwt"

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


const options  = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys
}

module.exports = passport =>{
    passport.use(
        new JwtStrategy(options, async (payload, done) =>{
           try{ 
                const User = await knex.select('email','User_id').table('User').where('User',payload.User_id)
                    if(User){
                        done(null, User)
                    }else{
                        done(null, false)
                }
        } catch(e){
            console.log(e)
        }
        })
    )
}