import PianoRollDisplay from '../components/PianoRollDisplay';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function Home(props) {

    const loadPianoRollData = () => {
        axios.get(`https://pianoroll.ai/random_notes`)
            .then((response) => {
                generateFormatedRollsList(response.data);
            })
            .catch((err) => { console.error('Error loading data:', err) });
    }

    const generateFormatedRollsList = (data) => {
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
        localStorage.setItem('formatedRollsList', JSON.stringify(newPianoRollsList));
    }

    //Double render effect just in development mode
    useEffect(() => {
        loadPianoRollData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='homeContainer w-11/12 lg:w-10/12 xl:w-4/5 m-auto'>

            <div id="buttonContainer" className='my-5'>
                <button
                    id="loadCSV"
                    className='bg-emerald-700 hover:opacity-70 duration-200'
                    onClick={() => loadPianoRollData()}>Load Piano Rolls!</button>
            </div>

            <div
                id="pianoRollContainer"
                className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {/* PIANO ROLLS LIST */}
                {props.formatedRollsList.length > 0 &&
                    props.formatedRollsList.map((roll) => {
                        return (
                            <Link to={`/${roll.id}`} key={roll.id}>
                                <PianoRollDisplay rollId={roll.id} partData={roll.partData} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;