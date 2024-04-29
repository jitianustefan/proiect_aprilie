import React, { useEffect, useState } from "react";
import "./EditeazaClient.css";
import "./EditezMasinaClient.css";
import axios from "axios";

const EditezMasinaClient = () => {
    const[criteriu, setCriteriu] = useState("");
    const[numeCautat, setNumeCautat] = useState("");
    const[prenumeCautat, setPrenumeCautat] = useState("");
    const[telefonCautat, setTelefonCautat] = useState("");
    const[dateClienti, setDateClienti] = useState([]);
    const[dateClientM,setDateClientM] = useState([]);
    const[stareModific, setStareModific] = useState(false);
    const[stareModificMasina, setStareModificMasina] = useState(false);
    const[dateMasina, setDateMasina] = useState([]);
    console.log("Date aduse de pe server",dateMasina);
    console.log("date individuale: ", dateMasina.id_masina);
    //date client modific
    const[masiniClient,setMasiniClient] = useState([]);
    const[idMasina,setIdMasina] = useState("");
    const[nrinmatric,setNrInmatric] = useState("");
    const[serieSasiu,setSerieSasiu] = useState("");
    const[marca,setMarca] = useState("");
    const[model,setModel] = useState("");
    const[anFabr,setAnFabr] = useState("")
    const[tipMotor,setTipMotor] = useState("");
    const[capacitateMotor,setCapacMotor] = useState("");
    const[caiPutere,setCaiPutere] = useState("");
    const[statusMasina,setStatusMasina] = useState("");


    useEffect(() => {
        if (dateMasina) {
            setIdMasina(dateMasina.id_masina || '');
            setNrInmatric(dateMasina.nr_inmatriculare || '');
            setSerieSasiu(dateMasina.serie_sasiu || '');
            setMarca(dateMasina.marca || '');
            setModel(dateMasina.model || '');
            setAnFabr(dateMasina.anul_fabricatiei || '');
            setTipMotor(dateMasina.tip_motorizare || '');
            setCapacMotor(dateMasina.capacitate_motor || '');
            setCaiPutere(dateMasina.cai_putere || '');
            setStatusMasina(dateMasina.status_masina || '');
        }
    }, [dateMasina]);
    
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
            const response_masiniC = await axios.get(`http://localhost:8090/admin/masini/${id}`);
            console.log("masini client: ",response_masiniC);
            setDateClientM(response_infoC.data[0]);
            setMasiniClient(response_masiniC.data);
            setStareModific(true);
        }
        catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
    }
    async function modmasina(id){
        
        //aduc date masina by id
        try {
            console.log("Ai apelat fct de modificare masina cu id",id);
            const response_masina= await axios.get(`http://localhost:8090/admin/masina/${id}`);
            setDateMasina(response_masina.data[0]);
            setStareModificMasina(true);
        }
        catch (err) {
            console.log('Nu s-au găsit înregistrări sau eroare de server: ' + err.message);
        }
        
    }
    async function modif_masina(){
        console.log("Ai apelat fct de modificare masina")
        const body = {
            "id_masina": idMasina,
            "nr_inmatriculare":nrinmatric,
            "serie_sasiu": serieSasiu,
            "marca": marca,
            "model": model,
            "anul_fabricatiei": anFabr,
            "tip_motorizare": tipMotor,
            "capacitate_motor": capacitateMotor,
            "cai_putere": caiPutere,
            "status_masina": statusMasina
        }
        console.log("date trimise spre modificare din FE:",body);
        await axios.post(`http://localhost:8090/admin/actualizez_masina`,body)
        .then(response => console.log('Date trimise cu succes', response))
        .catch(error => console.error('Eroare la trimiterea datelor', error));
    }
    return(
        <>
        {stareModific ? 
        (  stareModificMasina ? 
        <>
        <form className="formular-modificare-masina">
            <label for="nr_inmatriculare">Numar Inmatriculare:</label>
            <input type="text" id ="nr_inmatriculare" name="nr_inmatriculare"  value={nrinmatric} onChange={e=> setNrInmatric(e.target.value)}/>
            <label for="serie_sasiu">Serie Sasiu:</label>
            <input type="text" id ="serie_sasiu" name="serie_sasiu"  value={serieSasiu} onChange={e=> setSerieSasiu(e.target.value)}/>
            <label for="marca">Marca:</label>
            <input type="text" id ="marca" name="marca"  value={marca} onChange={e=> setMarca(e.target.value)}/>
            <label for="model">Model:</label>
            <input type="text" id ="model" name="model"  value={model} onChange={e=> setModel(e.target.value)}/>
            <label for="an_fabr">Anul Fabricatiei:</label>
            <input type="text" id ="an_fabr" name="an_fabr"  value={anFabr} onChange={e=> setAnFabr(e.target.value)}/>
            <label for="tip_motor">Tip Motorizare:</label>
            <input type="text" id ="tip_motor" name="tip_motor"  value={tipMotor} onChange={e=> setTipMotor(e.target.value)}/>
            <label for="capac_motor">Capacitate Motor:</label>
            <input type="text" id ="capac_motor" name="capac_motor"  value={capacitateMotor} onChange={e=> setCapacMotor(e.target.value)}/>
            <label for="cai_put">Cai Putere:</label>
            <input type="text" id ="cai_put" name="cai_put"  value={caiPutere} onChange={e=> setCaiPutere(e.target.value)}/>
            <label for="status_masina">Status Masina:</label>
            <input type="text" id ="status_masina" name="status_masina"  value={statusMasina} onChange={e=> setStatusMasina(e.target.value)}/>
            <button onClick={modif_masina}>Salveaza Modificarile</button>
        </form>

        </>
        :
        (
            <div className="formular-actualizare">
            <h2>Alege Masina Pentru Modificat</h2>
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
                                            <td className=""><button onClick={() => modmasina(masiniCli["id_masina"])}>Modifica</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            );
                        })
                    } 
            </div>
        )
        ) 
        : 
        (
            <div>
            <h2>EditezMasinaClient</h2>
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
                            {
                                dateClienti.map((dateC) =>{
                                    return (
                                        <tr>
                                            <td className="">{dateC["nume"]}</td>
                                            <td className="">{dateC["prenume"]}</td>
                                            <td className="">{dateC["telefon"]}</td>
                                            <td className="">{dateC["email"]}</td>
                                            <td className="">{dateC["status_client"]}</td>
                                            <td className=""><button onClick={() => modif_client(dateC["id_client"])}>Modifica</button></td>
                                        </tr>
                                    );
                                })
                            }
                </tbody>
            </table>
            </div>
        )}
        

        </>
    );
}

export default EditezMasinaClient;