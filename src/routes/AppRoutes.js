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
            <Route path="/" element={<Home
                formatedRollsList={props.formatedRollsList}
                setFormatedRollsList={props.setFormatedRollsList}
            />} />
            <Route path="/:rollId" element={<MainPianoRoll formatedRollsList={props.formatedRollsList} />} />
        </Routes>
    )
}

export default AppRoutes;



