import React, { useEffect, useState } from "react";
import './Login.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Login = ({stareLogin, setStareLogin}) => {

    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const navigate = useNavigate();


    //use effect pentru verificarea starii de conectare si pentru redirectionare
    useEffect(() => {
        
        console.log("valoare din useeffect logat:",stareLogin);
        if(stareLogin === "true")
        {
            navigate('/admin/dashboard');
        }
    }, [navigate,stareLogin]);


    //functia prin care verific logarea pe backend
    async function login(event){
        event.preventDefault();
        const body = {
            "email" : email,
            "parola" : parola
        }
        await axios.post(`http://localhost:8090/admin/login`, body)
        .then(response => {
            console.log('Date  din FE!', response);
            if(response.data.esteAutentificat !=null)
            {
                sessionStorage.setItem('id_utilizator',response.data.id_utilizator);
                sessionStorage.setItem('esteLogat', response.data.esteAutentificat);
                sessionStorage.setItem('nume', response.data.nume);
                sessionStorage.setItem('prenume', response.data.prenume);
                sessionStorage.setItem('rol', response.data.rol);
                sessionStorage.setItem('email',response.data.email);
                // setIsLoggedIn("true");
                setStareLogin("true");
                console.log("Stare login din sesiune: ", sessionStorage.getItem('esteLogat'));
                
            }
        })
        .catch(error => console.error('Eroare la trimiterea datelor',error));
    }
    return(
        <>
        <div> 
            <div className="container">
            <h2>Bine ai venit<br/>Te rog sa te conectezi</h2>
            <form className="formular-login" onSubmit={login}>
                <label for="">Email:</label>
                <input type="email" id="email" placeholder="Email" value={email} onChange={e=> setEmail(e.target.value)}/>
                <label for="parola">Parola:</label>
                <input type="password" id="parola" placeholder="Parola" value={parola} onChange={e=> setParola(e.target.value)}/>
                <br></br>
                <input type="submit" value="Conecteaza-te"/>
                {/* <button onClick={login}>Login</button> */}
            </form>
            </div>
        </div>
        </>
    );
}

export default Login;