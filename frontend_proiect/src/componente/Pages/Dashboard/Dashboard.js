import React, { useEffect } from 'react';
import { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import AdaugaProgramare from './AdaugaProgramare';
import Sidebar from '../../Sidebar/Sidebar';
import { useSidebar } from '../../Sidebar/SidebarContext';
import AdaugaClient from './AdaugaClient';
import EditeazaClient from './EditeazaClient';
import VeziIstoric from './VeziIstoric';

const Dashboard = (stareLogin) => {
    const { isSidebarOpen } = useSidebar();
    const navigate = useNavigate();
    const [actiune, setActiune] = useState();

    useEffect(() =>{
        console.log('stare log use ef dashboard:', stareLogin.stareLogin);
        if(stareLogin.stareLogin === false) 
        {
            console.log('stare log use ef dashboard:', stareLogin.stareLogin);
            navigate('/admin'); 
        }
    },[navigate,stareLogin.stareLogin]);

    console.log("Am selectat din sidebar actiunea : ",actiune);
    return (
        <>
        <div className='page-content'>
            <div className={`sidebar-dashboard ${isSidebarOpen ?  'open' : ""} `}>
                <Sidebar actiune = {actiune} setActiune = {setActiune}/>
            </div>  
            <div className={`main-content ${isSidebarOpen ?  'open' : ""} `}>
                {actiune === "adaugClient" ? <AdaugaClient /> : ""}
                {actiune === "editezClient" ? <EditeazaClient /> : ""}
                {actiune === "adaugProgramare" ? <AdaugaProgramare /> : ""}
                {actiune === "veziIstoric" ? <VeziIstoric /> : ""}
            </div>
            <div className='div de KK'>

            </div>
        </div>
        </>
    );
}

export default Dashboard;