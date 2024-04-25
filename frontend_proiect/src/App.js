import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import AdaugaProgramare from "./componente/Pages/Dashboard/AdaugaProgramare";
import Login from "./componente/Pages/Login/Login";
import Dashboard from "./componente/Pages/Dashboard/Dashboard";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* <Route path='/' element={<Login />} /> */}
                    <Route path='/' element={<Dashboard />} />
                    {/* <Route path='/profile/:id' element={<Profile />} />
                    <Route path='/book/:user' element={<BookUser />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;