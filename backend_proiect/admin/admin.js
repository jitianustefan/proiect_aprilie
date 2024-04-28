var Db = require('./dboperatii_admin');
// var programari = require('./programari');

//module necesare pentru crearea de API
var express = require('express');
//var bodyParser = require('body-parser');
//var cors = require('cors');

//var app = express();
var router = express.Router();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
//app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000' // Adaugă aici portul pe care rulează aplicația React
// }));
//app.use('/admin',router);

//aici scriu autentificarile
router.use((request,response, next) => {
    console.log('middleware');
    next();
})

//ruta pentru verificare date login
router.route('/login').post((request,response)=>{
    let datelogin = {...request.body}
    Db.setLogin(datelogin).then(result =>{
        response.status(201).json(result[0]); 
    })
})

router.route('/adaugaclient').post((request,response)=>{
    let dateclient = {...request.body};
    console.log("date din ADmin: ", dateclient);
    Db.adaugaClient(dateclient).then(result =>{
        response.status(201).json(result[0]);
    })
})

router.route('/programare').post((request,response)=>{
    let programare = {...request.body}
    Db.adaugaProgramare(programare).then(result =>{
        response.status(201).json(result);
    })
})

//ruta pentru a aduce programarile
router.route('/programari').get((request,response)=>{
    Db.getProgramari().then(result =>{
        //console.log(result);
        response.json(result[0]);
    })
})

//ruta pentru a selecta programarea pentru Id
router.route('/programare/:id').get((request,response)=>{
    Db.getProgramare(request.params.id).then(result =>{
        //console.log(result);
        response.json(result[0]);
    })
})

//ruta pentru a introduce programari


// var port = process.env.PORT || 8090;
// app.listen(port);
// console.log('Progrmul API ruleaza pe portul ' + port);

module.exports = router;

