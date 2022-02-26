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



module.exports.add =  async function(req, res) {
    console.log(req.body)
    await knex('BlogData').insert({User:req.body.User, Message:req.body.Message})
    .then(res.status(201).json({message: 'ok'}))

}

module.exports.get=  async function(req, res) {
  console.log('get')
  const result = await knex('BlogData').select('Message').where({User:req.body.User})

  res.json(result)

}