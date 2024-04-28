import React, { useState } from "react";
import "./AdaugaClient.css";
import axios from "axios";

const AdaugaClient = () =>{

    const[numeClient, setNumeClient] = useState("");
    const[prenumeClient, setPrenumeClient] = useState("");
    const[telefonClient,setTelefonClient] = useState("");
    const[emailClient, setEmailClient] = useState("");

    async function inregclient(){
        const body = {
            "creatDe": sessionStorage.getItem("id_utilizator"),
            "nume":numeClient,
            "prenume": prenumeClient,
            "telefon": telefonClient,
            "email": emailClient
        }
        console.log("creatDe din componenta:",body.creatDe);
        await axios.post(`http://localhost:8090/admin/adaugaclient`,body)
        .then(response => console.log('Date trimise cu succes', response))
        .catch(error => console.error('Eroare la trimiterea datelor', error));
    }
    return(
        <>
        <h2>AdaugaClient</h2>
        <form>
            <input type="text" name="nume_client" placeholder="Nume Client" value={numeClient} onChange={e=> setNumeClient(e.target.value)}/>
            <input type="text" name="prenume_client" placeholder="Prenume Client" value={prenumeClient} onChange={e=> setPrenumeClient(e.target.value)}/>
            <input type="text" name="telefon_client" placeholder="Telefon Client" value={telefonClient} onChange={e=> setTelefonClient(e.target.value)}/>
            <input type="email" name="email_client" placeholder="Email Client" value={emailClient} onChange={e=> setEmailClient(e.target.value)}/>
            <button onClick={inregclient}>Inregistreaza Client</button>
        </form>
        </>
    );
}

export default AdaugaClient;
