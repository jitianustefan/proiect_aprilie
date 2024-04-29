var config = require('../dbconfig');
const sql = require('mssql');

//functie cu care conectez utilizatorul
async function setLogin(dateLog){
    try{
        let pool = await sql.connect(config);
        let continut;
        let dateLogin = await pool.request()
        .input('email',sql.NVarChar,dateLog.email)
        .input('parola',sql.NVarChar,dateLog.parola)
        .query("SELECT * FROM Utilizatori WHERE email = @email and parola = @parola");
        console.log("sunt in operatii --- valoare dateLogin:",dateLogin.recordset);
        if (dateLogin.recordset.length > 0) {
                continut = dateLogin.recordset.map(user => ({
                esteAutentificat: true,
                id_utilizator: user.id_utilizator,
                email: user.email,
                nume: user.nume,
                prenume: user.prenume,
                rol: user.rol
            }));
            let jsonString = JSON.stringify(continut);
            //console.log(jsonString); 
        } else {
            console.log("Niciun utilizator găsit cu aceste credențiale.");
        }
        return continut;
    }
    catch(error)
    {
        console.log(error);
    }
}

//-----------ADAUGARE CLIENT---------
async function adaugaClient(addclient){
    try{
        let pool = await sql.connect(config);
        console.log("creatDe din operatii: ",addclient.creatDe);
        let dateClient = await pool.request()
        .input('creatDe',sql.Int,Number(addclient.creatDe))
        .input('nume',sql.NVarChar,addclient.nume)
        .input('prenume',sql.NVarChar,addclient.prenume)
        .input('telefon',sql.NVarChar,addclient.telefon)
        .input('email',sql.NVarChar,addclient.email)
        .query("INSERT INTO Clienti (creatDe, nume,prenume, telefon, email)values (@creatDe,@nume,@prenume,@telefon,@email)");
        return dateClient.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

// -----------Cauta dupa criterii -------

async function cautaNume(nume, prenume){
    try{
        let pool = await sql.connect(config);
        let continut;
        let dateCautare = await pool.request()
        .input('nume',sql.NVarChar,nume)
        .input('prenume',sql.NVarChar,prenume)
        .query("SELECT * FROM clienti WHERE nume = @nume and prenume = @prenume");

        if (dateCautare.recordset.length > 0) {
            return dateCautare.recordsets;
        } else {
            console.log("Niciun client găsit cu aceste credențiale.");
            continut = "Niciun client găsit cu aceste credențiale.";
        }
    }
    catch(error)
    {
        console.log(error); 
    }
}

async function cautaTelefon(telefon){
    try{
        let pool = await sql.connect(config);
        let continut;
        let dateCautare = await pool.request()
        .input('telefon',sql.NVarChar,telefon)
        .query("SELECT * FROM clienti WHERE telefon = @telefon");
        if (dateCautare.recordset.length > 0) {
            return dateCautare.recordsets;
        } else {
            console.log("Niciun client găsit cu aceste credențiale.");
            continut = "Niciun client găsit cu aceste credențiale.";
        }
    }
    catch(error)
    {
        console.log(error); 
    }
}

//functie selectez datele in functi de id-ul clientului 
async function getClient(idClient){
    try{
        console.log("id client din dboperatii: ", idClient);
        let pool = await sql.connect(config);//sql.connect este o operatie asicrona datorita ms sqlo
        let client = await pool.request()
            .input('input_parameter',sql.Int,Number(idClient))
            .query("SELECT * FROM clienti WHERE id_client = @input_parameter");
        console.log("Date client by id:",client.recordsets);
        return client.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//fct de update client
async function actualizezClient(actClient){
    try{
        let pool = await sql.connect(config);
        const currentDate = new Date();
        console.log("date modificate",actClient);
        console.log("data curenta",currentDate);
        let dateClient = await pool.request()
        .input('id_client',sql.Int,Number(actClient.id_client))
        .input('creatDe',sql.Int,Number(actClient.creatDe))
        .input('nume',sql.NVarChar,actClient.nume)
        .input('prenume',sql.NVarChar,actClient.prenume)
        .input('telefon',sql.NVarChar,actClient.telefon)
        .input('email',sql.NVarChar,actClient.email)
        .input('status_client',sql.NVarChar,actClient.status_client)
        .input('data_modificare',sql.DateTime2, currentDate)
        .query("UPDATE Clienti SET nume = @nume, prenume = @prenume, telefon = @telefon, email = @email, status_client = @status_client, data_modificare = @data_modificare WHERE id_client = @id_client");
        return dateClient.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getMasini(idClient){
    try{
        let pool = await sql.connect(config);//sql.connect este o operatie asicrona datorita ms sqlo
        let masini = await pool.request()
        .input('id_client',sql.Int, idClient)
        .query("SELECT * FROM masini WHERE id_client = @id_client");
        console.log("Masini client:",idClient,masini.recordset);
        return masini.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getMasina(idMasina){
    try{
        console.log("id client din dboperatii: ", idMasina);
        let pool = await sql.connect(config);//sql.connect este o operatie asicrona datorita ms sqlo
        let masina = await pool.request()
            .input('input_parameter',sql.Int,Number(idMasina))
            .query("SELECT * FROM masini WHERE id_masina = @input_parameter");
        console.log("Date masina by id:",masina.recordsets);
        return masina.recordsets;
    }
    catch(error){
        console.log(error);
    }
}


//fct de update masina
async function actualizezMasina(actMasina){
    try{
        let pool = await sql.connect(config);
        const currentDate = new Date();
        console.log("date modificate",actMasina);
        console.log("data curenta",currentDate);
        let dateMasina = await pool.request()
        .input('id_masina',sql.Int,Number(actMasina.id_masina))
        .input('nr_inmatriculare',sql.NVarChar,actMasina.nr_inmatriculare)
        .input('serie_sasiu',sql.NVarChar,actMasina.serie_sasiu)
        .input('marca',sql.NVarChar,actMasina.marca)
        .input('model',sql.NVarChar,actMasina.model)
        .input('anul_fabricatiei',sql.Int,Number(actMasina.anul_fabricatiei))
        .input('tip_motorizare',sql.NVarChar,actMasina.tip_motorizare)
        .input('capacitate_motor',sql.Float,actMasina.capacitate_motor)
        .input('cai_putere',sql.Float,actMasina.cai_putere)
        .input('data_modificare',sql.DateTime2, currentDate)
        .query("UPDATE masini SET nr_inmatriculare=@nr_inmatriculare,serie_sasiu = @serie_sasiu ,marca = @marca,model = @model,anul_fabricatiei = @anul_fabricatiei, tip_motorizare = @tip_motorizare,capacitate_motor = @capacitate_motor,cai_putere = @cai_putere, data_modificare = @data_modificare WHERE id_masina = @id_masina");
        return dateMasina.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function adaugaProgramare(programare){
    try{
        let pool = await sql.connect(config);
        let dateProgramare = await pool.request()
        //.input('id_programare',sql.Int, programare.id_programare)
        .input('id_client',sql.Int,programare.id_client)
        .input('id_masina',sql.Int,programare.id_masina)
        .input('creatDe',sql.Int, programare.creatDe)
        .input('data_inceput',sql.NVarChar, programare.data_inceput)
        .input('data_sfarsit',sql.NVarChar, programare.data_sfarsit)
        .input('stare_programare', sql.NVarChar, programare.stare_programare)
        .input('actiune_masina',sql.NVarChar, programare.actiune_masina)
        .input('primire_masina',sql.NVarChar, programare.primire_masina)
        .input('procesare_masina',sql.NVarChar, programare.procesare_masina)
        .input('durata_reparatie',sql.Int, programare.durata_reparatie)
        .query("INSERT INTO Programari(id_client,id_masina,creatDe,data_inceput,data_sfarsit,stare_programare,actiune_masina,primire_masina,procesare_masina,durata_reparatie) VALUES (@id_client,@id_masina,@creatDe,@data_inceput,@data_sfarsit,@stare_programare,@actiune_masina,@primire_masina,@procesare_masina,@durata_reparatie)");
        return dateProgramare.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

//functie care sa imi aduca toate programariel

async function getProgramari(){
    try{
        let pool = await sql.connect(config);//sql.connect este o operatie asicrona datorita ms sqlo
        let programari = await pool.request().query("SELECT * FROM Programari")
        return programari.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function getProgramare(idProgramare){
    try{
        let pool = await sql.connect(config);//sql.connect este o operatie asicrona datorita ms sqlo
        let programari = await pool.request()
            .input('input_parameter',sql.Int,idProgramare)
            .query("SELECT * FROM Programari WHERE id_programare = @input_parameter");
        return programari.recordsets;
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {
    getProgramari: getProgramari,
    getProgramare: getProgramare,
    adaugaProgramare: adaugaProgramare,
    setLogin: setLogin,
    adaugaClient: adaugaClient,
    cautaNume: cautaNume,
    cautaTelefon: cautaTelefon,
    getClient: getClient,
    actualizezClient: actualizezClient,
    getMasini: getMasini,
    getMasina: getMasina,
    actualizezMasina: actualizezMasina
}