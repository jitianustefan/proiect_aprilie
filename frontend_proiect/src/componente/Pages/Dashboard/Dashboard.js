import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const[id_client,setIdClient] = useState("");
    const[id_masina,setIdMasina] = useState("");
    const[creatDe, setCreatDe] = useState("");
    const[data_inceput, setDataInceput] = useState("");
    const[data_sfarsit, setDataSfarsit] = useState("");


    async function inregProgramare() {
        const body = {
            "id_client": id_client,
            "id_masina": id_masina,
            "creatDe": creatDe,
            "data_inceput": data_inceput,
            "data_sfarsit": data_sfarsit,
            "stare_programare":"finalizata",
            "actiune_masina": "revizie",
            "primire_masina": "usa zgariata",
            "procesare_masina": "am reparat tot",
            "durata_reparatie": 110
        }
        await axios.post(`http://localhost:8090/admin/programare`,body)
            .then(response => console.log('Date trimise cu succes', response))
         .catch(error => console.error('Eroare la trimiterea datelor', error));
    }

    async function afiseazaProgramari() {
        const response = await axios.get(`http://localhost:8090/admin/programari`)

                console.log('Data received in FE: ', response)
    }
    
    return (
        <>
        <div>
            <h1>formular adauga programare</h1>
            <form onSubmit={inregProgramare}>
                <input className="input_cauta" type='text' id='caut' name='id_client' placeholder="id_client" value={id_client} onChange={e => setIdClient(e.target.value)}/>
                <input className="input_cauta" type='text' id='caut' name='id_masina' placeholder="id_masina" value={id_masina} onChange={e => setIdMasina(e.target.value)}/>
                <input className="input_cauta" type='text' id='caut' name='creatDe' placeholder="creatDe" value={creatDe} onChange={e => setCreatDe(e.target.value)}/>
                <input className="input_cauta" type='text' id='caut' name='data_inceput' placeholder="data/ora inceput" value={data_inceput} onChange={e => setDataInceput(e.target.value)}/>
                <input className="input_cauta" type='text' id='caut' name='data_sfarsit' placeholder="data/ora sfarsit" value={data_sfarsit} onChange={e => setDataSfarsit(e.target.value)}/>
                <input type='submit' value={'Inregistreaza programare'}/>
            </form>
            <div>
                <button onClick={afiseazaProgramari}>Afiseaza programarile</button>
            </div>
        </div>
        </>
    );
}

export default Dashboard;