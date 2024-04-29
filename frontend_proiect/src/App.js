import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componente/Pages/Login/Login";
import Navbar from "./componente/Navbar/Navbar";
import Dashboard from "./componente/Pages/Dashboard/Dashboard";

const App = () => {
    const [stareLogin, setStareLogin] = useState(sessionStorage.getItem('esteLogat'));
    const toggleSidebar = useState()
    console.log("au ajuns dinou in componenta APP stare login: ",stareLogin);
    return (
        <div className="app-container">
            <Navbar stareLogin = {stareLogin} setStareLogin={setStareLogin} toggleSidebar={toggleSidebar}/>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={<Login stareLogin = {stareLogin} setStareLogin={setStareLogin}/>} />
                    <Route path='/admin/dashboard' element={<Dashboard stareLogin = {stareLogin}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;