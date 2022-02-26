
const express = require('express')
const app = express();
const router = express.Router()
const controller = require('../controllers/blog')
const passport = require('passport');
app.use(passport.initialize())


require('../middleware/passport')(passport)

router.post('/add', controller.add)
// router.get('/get',controller.get_posts)
router.get('/get',controller.get, passport.authenticate('jwt', {session:false}))
module.exports = router