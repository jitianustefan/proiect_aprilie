var Db = require('./dboperatii_admin');

var express = require('express');

var router = express.Router();

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

//ruta adaugare client
router.route('/adaugaclient').post((request,response)=>{
    let dateclient = {...request.body};
    console.log("date din ADmin: ", dateclient);
    Db.adaugaClient(dateclient).then(result =>{
        response.status(201).json(result[0]);
    })
})
// ruta cautare clienti pentru a edita
router.route('/cauta/:nume/:prenume').get((request,response) =>{
    Db.cautaNume(request.params.nume, request.params.prenume).then(result =>{
        response.status(201).json(result[0]);
    })
})

router.route('/cautatel/:telefon').get((request,response) =>{
    Db.cautaTelefon(request.params.telefon).then(result =>{
        response.status(201).json(result[0]);
    })
})

//ruta aduc date pentru un client anume in functie de id
router.route('/cautacl/:id').get((request,response) =>{
    Db.getClient(request.params.id).then(result =>{
        response.status(201).json(result[0]);
    })
})

//ruta prin care modific datele clientului
router.route('/actualizez_client').post((request,response)=>{
    let dateclient = {...request.body};
    console.log("date din ADmin: ", dateclient);
    Db.actualizezClient(dateclient).then(result =>{
        response.status(201).json(result[0]);
    })
})

//ruta aduc masini in functie de id-ul clientului 
router.route('/masini/:id').get((request,response)=>{
    Db.getMasini(request.params.id).then(result =>{
        //console.log(result);
        response.json(result[0]);
    })
})

//ruta aduc masina in functie de id-ul masinii
router.route('/masina/:id').get((request,response) =>{
    Db.getMasina(request.params.id).then(result =>{
        response.status(201).json(result[0]);
    })
})


//ruta prin care modific datele despre masina
router.route('/actualizez_masina').post((request,response)=>{
    let dateMasina = {...request.body};
    console.log("date din ADmin: ", dateMasina);
    Db.actualizezMasina(dateMasina).then(result =>{
        response.status(201).json(result[0]);
    })
})
//ruta, afiseaza programarile
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

module.exports = router;

