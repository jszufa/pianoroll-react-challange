import PianoRollDisplay from '../PianoRollDisplay';
import { useState } from 'react';
import axios from 'axios';


function Home() {

    const [pianoRolls, setPianoRolls] = useState([]);

    const loadPianoRollData = () => {
        axios.get(`https://pianoroll.ai/random_notes`)
            .then((response) => {
                setPianoRolls(response.data);
                console.log(response.data);
            })
            .catch((err) => { console.error('Error loading data:', err) });
    }

    //może to nazwać inaczej -> bo teraz w sumie generuje Piano Rolls, a nie svgs - jeszcze. Nie wiem, czy ten kod jest czytelny teraz. Mógłbym też zrobić to na zasadzie, funkcja obrabiająca dane - i stworzyć drugi stan - coś na zasadzie, formatedPianoRolls, a potem zmapować tablicę tych piano rollsów. To może być czytelniejsze
    const generateSVGs = (data) => {
        console.log('generated')
        const pianoRollList = [];

        for (let it = 0; it < 20; it++) {
            const start = it * 60;
            const end = start + 60;
            const partData = data.slice(start, end);

            pianoRollList.push(<PianoRollDisplay key={it} rollId={it} partData={partData} />)
        }
        return pianoRollList;
    }

    return (
        <div>
            <h1> Welcome to PianoRoll frontend coding challenge!</h1>

            <div id="buttonContainer">
                <button id="loadCSV" onClick={() => loadPianoRollData()}>Load Piano Rolls!</button>
            </div>

            <div id="pianoRollContainer" className='grid gap-4 grid-cols-3'>
                {/* PIANO ROLLS LIST */}
                {pianoRolls.length > 0 && generateSVGs(pianoRolls)}
            </div>
        </div>
    )
}

export default Home;