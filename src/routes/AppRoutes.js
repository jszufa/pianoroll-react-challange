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
                pianoRolls={props.pianoRolls}
                setPianoRolls={props.setPianoRolls}
                formatedRollsList={props.formatedRollsList}
                setFormatedRollsList={props.setFormatedRollsList}
            />} />
            <Route path="/:rollId" element={<MainPianoRoll pianoRolls={props.pianoRolls} formatedRollsList={props.formatedRollsList} />} />
        </Routes>
    )
}

export default AppRoutes;



