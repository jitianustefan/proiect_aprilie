import React from "react";
import "./VeziIstoric.css";
import axios from 'axios';


const VeziIstoric = () =>{

    async function afiseazaProgramari() {
        const response = await axios.get(`http://localhost:8090/admin/programari`)

                console.log('Data received in FE: ', response)
    }
    return(
        <>
            <h2>VeziIstoric</h2>
            <div>
                    <button onClick={afiseazaProgramari}>Afiseaza programarile</button>
            </div>
        </>
    );
}


export default VeziIstoric;