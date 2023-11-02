import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from '../views/Home';
import MainPianoRoll from '../views/MainPianoRoll';

function AppRoutes(props) {

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/mp" element={<MainPianoRoll />}/>
        </Routes>
    )
}

export default AppRoutes;



