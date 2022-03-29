const multer = require('multer')
const moment = require('moment')
const fs = require('fs')
const fileFilter =(req, file, cb) => {
    if(file.mimetype === 'image/jpeg' ) {
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmm-SSS')
        console.log(file.path)
        cb(null,`${date}-${file.originalname}`)
    }
})

module.exports = multer({
    storage, fileFilter

})

