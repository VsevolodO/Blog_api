
const express = require('express')

const router = express.Router()
const controller = require('../controllers/blog')
const passport = require('passport');
const { body, check, validationResult } = require('express-validator');
const upload =  require('../middleware/f_load')
const knex = require('knex')

const validator =  function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.send(errors);
        //console.log(errors);
        fs.unlinkSync(req.file.path);
    }
    else{
        next()
    }
};


require('../middleware/passport')(passport)


// router.get('/get',controller.get_posts)
router.get('/get', passport.authenticate('jwt', {session:false}),controller.get),
router.post('/add',upload.single('image'), body("Message").notEmpty(),validator, passport.authenticate('jwt', {session:false}),controller.add)
router.delete('/del', body("Message").notEmpty(), passport.authenticate('jwt', {session:false}),controller.del)
router.patch('/path', body("Message").notEmpty(), passport.authenticate('jwt', {session:false}),controller.upd)
module.exports = router
