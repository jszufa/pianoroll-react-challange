import PianoRollDisplay from '../PianoRollDisplay';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Home(props) {

    //wydaje się że stan pianoRolls jest w ogóle nie potrzebny

    const loadPianoRollData = () => {
        axios.get(`https://pianoroll.ai/random_notes`)
            .then((response) => {
                props.setPianoRolls(response.data);
                console.log(response.data);
                generateFormatedRollsList(response.data);
            })
            .catch((err) => { console.error('Error loading data:', err) });
    }


    //Double render effect - just in development mode
    //useEffect(() => { loadPianoRollData() }, []);

    /* useEffect(() => { generateFormatedRollsList(props.pianoRolls) }, [props.pianoRolls]); */
    const generateFormatedRollsList = (data) => {
        console.log('generated')
        let newPianoRollsList = [];

        for (let it = 0; it < 20; it++) {
            const start = it * 60;
            const end = start + 60;
            const partData = data.slice(start, end);

            newPianoRollsList.push(
                {
                    id: it,
                    partData: partData,
                }
            )
        }
        props.setFormatedRollsList(newPianoRollsList);
        console.log(newPianoRollsList);
    }

    return (
        <div>
            <h1> Welcome to PianoRoll frontend coding challenge!</h1>

            <div id="buttonContainer">
                <button id="loadCSV" onClick={() => loadPianoRollData()}>Load Piano Rolls!</button>
            </div>

            <div id="pianoRollContainer" className='grid gap-4 grid-cols-3'>
                {/* PIANO ROLLS LIST */}
                {props.formatedRollsList.length > 0 &&
                    props.formatedRollsList.map((roll) => {
                        return (
                            <Link to={`/${roll.id}`} key={roll.id}><PianoRollDisplay rollId={roll.id} partData={roll.partData} /></Link>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Home;