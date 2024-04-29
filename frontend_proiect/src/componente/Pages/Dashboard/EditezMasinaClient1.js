import React, { useEffect, useState } from "react";
import "./EditeazaClient.css";
import axios from "axios";

const EditezMasinaClient1 = () => {
    const[criteriu, setCriteriu] = useState("");
    const[numeCautat, setNumeCautat] = useState("");
    const[prenumeCautat, setPrenumeCautat] = useState("");
    const[telefonCautat, setTelefonCautat] = useState("");
    const[dateClienti, setDateClienti] = useState([]);
    const[dateClientM,setDateClientM] = useState([]);
    const[stareModific, setStareModific] = useState(false);
    const[stareModificMasina, setStareModificMasina] = useState(false);
    //date client modific
    const[idclient,setIdClient] = useState("");
    const[numeClient, setNumeClient] = useState("");
    const[prenumeClient, setPrenumeClient] = useState("");
    const[telefonClient,setTelefonClient] = useState("");
    const[emailClient, setEmailClient] = useState("");
    const[statusClient, setStatusClient] = useState("");
    const[masiniClient,setMasiniClient] = useState([]);

    useEffect(() => {
        if (dateClientM) {
            setIdClient(dateClientM.id_client || '');
            setNumeClient(dateClientM.nume || '');
            setPrenumeClient(dateClientM.prenume || '');
            setTelefonClient(dateClientM.telefon || '');
            setEmailClient(dateClientM.email || '');
            setStatusClient(dateClientM.status_client || '');
        }
    }, [dateClientM]);
    console.log("date din clienti: ", numeClient);
    async function cautaNume(){
        try {
            const response = await axios.get(`http://localhost:8090/admin/cauta/${numeCautat}/${prenumeCautat}`);
            console.log("raspunspt cautare,  nume, prenume", response);
            setDateClienti(response.data);
            //setProgramari(response.data); // Axios încapsulează răspunsul în proprietatea `data`
        } catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
    }

    async function cautaTelefon(){
        try {
            const response = await axios.get(`http://localhost:8090/admin/cautatel/${telefonCautat}`);
            console.log("raspunspt cautare,  nume, prenume", response);
            setDateClienti(response.data);

            //setProgramari(response.data); // Axios încapsulează răspunsul în proprietatea `data`
        } catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
    }
    console.log("Valoare criteriu de cautare:",criteriu);

    console.log("raspunspt variabila", dateClienti);
    async function modif_client(id){
        try {
            console.log("Id Client pe care vreay sa il modifc",id);
            const response_infoC = await axios.get(`http://localhost:8090/admin/cautacl/${id}`);
            setDateClientM(response_infoC.data[0]);
            setStareModific(true);
        }
        catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
    }
    async function modclient(){
        console.log("Ai apelat fct de modificare client")
        const body = {
            "id_client": idclient,
            "nume":numeClient,
            "prenume": prenumeClient,
            "telefon": telefonClient,
            "email": emailClient,
            "status_client": statusClient
        }
        console.log("date trimise spre modificare din FE:",body);
        await axios.post(`http://localhost:8090/admin/actualizez_client`,body)
        .then(response => console.log('Date trimise cu succes', response))
        .catch(error => console.error('Eroare la trimiterea datelor', error));

    }
    async function date_masina_by_id(id){
        try{
            const response_masiniC = await axios.get(`http://localhost:8090/admin/masini/${id}`);
            console.log("masini client: ",response_masiniC);
            setMasiniClient(response_masiniC.data);
        }
        catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
    }

    async function modif_masina(id){
        try {
            console.log("Id masina pe care vreay sa o modifc",id);
            const response_infoC = await axios.get(`http://localhost:8090/admin/cautacl/${id}`);
            setDateClientM(response_infoC.data[0]);
            setStareModificMasina(true);
        }
        catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
    }
    return(
        <>
        {stareModific ? 
        (
            <div className="formular-actualizare">
            <h2>Modifica Client</h2>
            <form className="formular-actualizare">
                <label for="nume_client">Nume Client:</label>
                <input type="text" id ="nume_client" name="nume_client" placeholder="Nume Client" value={numeClient} onChange={e=> setNumeClient(e.target.value)}/>
                <label for="prenume_client">Prenume Client:</label>
                <input type="text" id="prenume_client" name="prenume_client" placeholder="Prenume Client" value={prenumeClient} onChange={e=> setPrenumeClient(e.target.value)}/>
                <label for="telefon_client">Telefon Client:</label>
                <input type="text" id="telefon_client" name="telefon_client" placeholder="Telefon Client" value={telefonClient} onChange={e=> setTelefonClient(e.target.value)}/>
                <label for="email_client">Email Client:</label>
                <input type="email" id="email_client" name="email_client" placeholder="Email Client" value={emailClient} onChange={e=> setEmailClient(e.target.value)}/>
                <label for="masini_client">Masinile Clientului</label>
                <select className="" id="masini_client" name="masiniClient">
                    <option value="" disabled hidden>Masini Client</option>
                    {
                        masiniClient.map((masiniCli) =>{
                            return (
                                <option value={masiniCli["marca"]}>{masiniCli["marca"]}</option>
                            );
                        })
                    }
                </select>
                <label for="status_client">Status Cont Client:</label>
                <input type="text" id="status_client" name="status_client" placeholder="Status Client" value={statusClient} onChange={e=> setStatusClient(e.target.value)}/>
                <button onClick={modclient}>Salveaza Modificarile</button>
            </form>
            </div>
        ) 
        : 
        (
            <div>
            <h2>Editez Masina Client</h2>
            <h3>Cauta Client</h3>
            <select className="select_cauta" id="criteriu_select" value={criteriu} name="criteriu" onChange={e =>setCriteriu(e.target.value)}>
                <option value="" disabled hidden>Alege Criteriu Cautare</option>
                <option value="nume-prenume">Nume Si Prenume</option>
                <option value="telefon">Telefon</option>
            </select>
            <br/>
            {criteriu === "nume-prenume" ? (
                <>
                    <input type="text" id="caut_nume" value={numeCautat} placeholder="Nume Cautat" onChange={e=> setNumeCautat(e.target.value)}/>
                    <input type="text" id="caut_prenume" value={prenumeCautat} placeholder="Prenume Cautat" onChange={e=> setPrenumeCautat(e.target.value)}/>
                    <button onClick={cautaNume}>Cauta</button>
                </>
            ) : ""}

            {criteriu === "telefon" ? (
                <>
                    <input type="text" id="caut_nume" value={telefonCautat} placeholder="Numar de telefon" onChange={e=> setTelefonCautat(e.target.value)}/>
                    <button onClick={cautaTelefon}>Cauta</button>
                </>
            ) : ""}
            {
            dateClienti.map((dateC) =>{
                return (
                    <div>
                    <table>
                        <thead>
                            <tr>
                                <th className="">Nume</th>
                                <th className="">Prenume</th>
                                <th className="">Telefon</th>
                                <th className="">Email</th>
                                <th className="">Status_Client</th>
                            </tr>
                        </thead>
                        <tbody >
                            
                                        <tr>
                                            <td className="" >{dateC["nume"]}</td>
                                            <td className="">{dateC["prenume"]}</td>
                                            <td className="">{dateC["telefon"]}</td>
                                            <td className="">{dateC["email"]}</td>
                                            <td className="">{dateC["status_client"]}</td>
                                            <td className=""><button onClick={() => modif_client(dateC["id_client"])}>Modifica</button></td>
                                        </tr>
                        </tbody>
                    </table>
                    {dateC["id_client"] ? (date_masina_by_id(dateC["id_client"])) : ""}
                    <h4>Masini Client: {dateC["nume"]}</h4>
                    {masiniClient.map((masiniCli) =>{
                            return (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nr Inmatriculare</th>
                                            <th>Serie Sasiu</th>
                                            <th>Marca</th>
                                            <th>Model</th>
                                            <th>Anul Fabricatiei</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{masiniCli["nr_inmatriculare"]}</td>
                                            <td>{masiniCli["serie_sasiu"]}</td>
                                            <td>{masiniCli["marca"]}</td>
                                            <td>{masiniCli["model"]}</td>
                                            <td>{masiniCli["anul_fabricatiei"]}</td>
                                            <td className=""><button onClick={() => modif_masina(masiniCli["id_masina"])}>Modifica</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        })
                    } 
                    </div>
                );
            })}
            </div>
        )}
        

        </>
    );
}

export default EditezMasinaClient1;