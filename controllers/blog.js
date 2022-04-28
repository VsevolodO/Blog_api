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
const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports.add =  async function(req, res) {
  if (req.body.filepath == undefined)
    await knex('BlogData').insert({User:req.body.User, Message:req.body.Message})
    .then(res.status(201).json({message: 'ok'}))
  else{
    await knex('BlogData').insert({User:req.body.User, Message:req.body.Message, filepath:req.file.path})
    .then(res.status(201).json({message: 'ok'}))
  }
}

module.exports.get=  async function(req, res) {

  const result = await knex('BlogData').select('Message','filepath').where({User:req.body.User}).paginate({perPage:10})
  
  res.json(result)
 

}

module.exports.del=  async function(req, res) {

  const result = await knex('BlogData').delete('*').where({User:req.body.User, Message:req.body.Message})
  
  res.json("ok")
 

}

module.exports.upd=  async function(req, res) {

  const result = await knex('BlogData').update({Message:req.body.Message}).where({User:req.body.User, Message:req.body.Oldmessage})
  
  res.json("updated")
 

}