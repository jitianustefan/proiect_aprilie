var config = require('./dbconfig');//am incarcat configuratie de conexiune
const sql = require('mssql');//am incarcat mssql

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

module.exports = {
    getProgramari: getProgramari,
    getProgramare: getProgramare,
    adaugaProgramare: adaugaProgramare
}