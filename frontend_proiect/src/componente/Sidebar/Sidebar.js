import React, { useState } from "react";
import './Sidebar.css';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faCalendarDays, faCalendarPlus, faUserTie } from '@fortawesome/free-solid-svg-icons';
const Sidebar = ({actiune, setActiune}) =>{
    const[toggleAdaugC, setToggleAdaugC] = useState(false);
    const[toggleProgr, setToggleProgr] = useState(false);
    const[toggleIstoric, setToggleIstoric] = useState(false);
    //functii de toggle pt sidebar
    function toggleA(){
        setToggleAdaugC(!toggleAdaugC);
    }
    function toggleP(){
        setToggleProgr(!toggleProgr);
    }
    function toggleI(){
        setToggleIstoric(!toggleIstoric);
    }
    function adaugClient() {
        setActiune("adaugClient");
    }
    function editezClient(){
        setActiune("editezClient");
    }

    function editezMasiniClient(){
        setActiune("editezMasinaClient")
    }
    function adaugProgramare() {
        setActiune("adaugProgramare");
    }

    function veziIstoric() {
        setActiune("veziIstoric");
    }
     return (
        <>
            <div className="sidebar">
                    <ul className="sidebar-components">
                        <li className="sidebar-administrare" >
                            <p onClick={toggleA} className="sidebar-adaug-text"><FontAwesomeIcon icon={faUserTie} className="sidebar-left-icons"/>Administrare Clienti &nbsp;{toggleAdaugC? <FontAwesomeIcon icon={faAngleUp} />: <FontAwesomeIcon icon={faAngleDown} className="sidebar-icon-arrow-down"/>}</p>
                            {toggleAdaugC ? (
                                <ul className="sidebar-administrare-items">
                                    <li className="sidebar-administrare-adaug" onClick={adaugClient}>Adauga client nou</li>
                                    <li className="sidebar-administrare-edit" onClick={editezClient}>Editeaza date client</li>
                                    <li className="sidebar-administrare-edit-masini" onClick={editezMasiniClient}>Editeaza masini client</li>
                            </ul>
                            ) : ""}
                        </li>
                        <li className="sidebar-programare" >
                            <p onClick={toggleP} className="sidebar-progr-text"><FontAwesomeIcon icon={faCalendarPlus} className="sidebar-left-icons" />Programare Clienti &nbsp;{toggleProgr? <FontAwesomeIcon icon={faAngleUp} />: <FontAwesomeIcon icon={faAngleDown} className="sidebar-icon-arrow-down"/>}</p>
                            {toggleProgr ? (
                                <ul className="sidebar-programare-items">
                                    <li className="sidebar-programare-adaug" onClick={adaugProgramare}>Adauga Programare</li>
                                </ul>
                            ): ""}
                           
                        </li>
                        <li className="sidebar-istoric" >
                            <p onClick={toggleI} className="sidebar-istoric-text"><FontAwesomeIcon icon={faCalendarDays} className="sidebar-left-icons"/>Istoric Service &nbsp;{toggleIstoric? <FontAwesomeIcon icon={faAngleUp} />: <FontAwesomeIcon icon={faAngleDown} className="sidebar-icon-arrow-down"/>}</p>
                            {toggleIstoric ? (
                                <ul className="sidebar-istoric-items">
                                    <li className="sidebar-istoric-vezi"onClick={veziIstoric}>Vezi istoric service</li>
                                </ul>
                            ): ""}
                            
                        </li>
                    </ul>
            </div>
        </>
    );
}

export default Sidebar;