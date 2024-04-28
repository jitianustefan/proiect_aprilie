import React, { useEffect, useState } from "react";
import './Navbar.css';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCarSide} from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from "../Sidebar/SidebarContext";
//import Sidebar from "../Sidebar/Sidebar";

const Navbar = ({stareLogin, setStareLogin}) =>{
    const[rol, setRol] = useState("");
    const[prenume, setPrenume] = useState("");
    const[email, setEmail] = useState("");
    const { toggleSidebar } = useSidebar();
    //const[togglemeniu,setToggleMeniu] = useState(false);
    
    useEffect(() =>{
        if(stareLogin === "true"){
            setPrenume(sessionStorage.getItem('prenume'));
            setRol(sessionStorage.getItem('rol'));
            setEmail(sessionStorage.getItem('email'));
        }
    },[stareLogin]);

    function delogare (){
        setStareLogin(false);
        sessionStorage.setItem('esteLogat', false);
        sessionStorage.setItem('nume', "");
        sessionStorage.setItem('prenume', "");
        sessionStorage.setItem('rol', "");
        sessionStorage.setItem('email',"");
        
    }
    console.log("login navbar: ",stareLogin);

    return(
        <>
            <ul className="navbar-components">
                <li className="navbar-menu"><button onClick={toggleSidebar}><FontAwesomeIcon icon={faBars} /></button></li>   
                <li className="navbar-logo"><FontAwesomeIcon icon={faCarSide} /></li> 
                <li className="navbar-rol">{stareLogin ==="true" ? `Departamentul: ${rol}` : ""}</li>
                <li className="navbar-firma">Platforma VehicleCare</li>
                <li className="navbar-greetings">{stareLogin ==="true" ? `Bine ai revenit ${prenume} !`  : ""}</li>
                <li className="navbar-avatar">
                    {stareLogin === "true"? (
                    <>
                        <div className="navbar-avatar-letter">{prenume[0]}</div>
                        <ul className="navbar-avatar-dropdown">
                            <li className="navbar-avatar-dropdown-email">{stareLogin ==="true" ? (<><div className="navbar-avatar-letter">{prenume[0]}</div> {email}</>): ""}</li>
                            <li className="navbar-avatar-dropdown-delog">{stareLogin ==="true" ? (<><div onClick={delogare}>Deconecteaza-te</div></>) : `Conecteaza-te`}</li>
                        </ul>
                    </>) : ""}
                    
                </li>
            </ul> 
        </>
    );
}


export default Navbar;
