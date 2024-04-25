var Db = require('./dboperatii_admin');
var programari = require('./programari');

//module necesare pentru crearea de API
var express = require('express');
//var bodyParser = require('body-parser');
//var cors = require('cors');

//var app = express();
var router = express.Router();

router.use((request,response, next) => {
    console.log('middleware front');
    next();
})

module.exports = router;