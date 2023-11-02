import { useParams } from "react-router-dom";
import ActivePianoRollDisplay from "../ActivePianoRollDisplay";
import PianoRollDisplay from "../PianoRollDisplay";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function MainPianoRoll(props) {

    //1.Zrobić routing, tak żeby przekazywać id klikniętego pianoRolla jako props, albo coś podobnego
    //a) dowiedzieć się jak robi się dynamiczne ścieżki w routerze

    //b) jak przekazać dane do wyrysowania piano roll?

    //PianoRoll Id is passed as a dynamic parameter in the route
    const param = useParams();
    /* console.log(props.pianoRolls) */

    //wyświetlić sobie listę wszystkich pianorollsów w tym komponencie (poza tym z id Roll.id)
    //Zmienić logikę generowania svg w komponencie home, trzeba będzie to lepiej przekazać

    //powinienem dodać formatedrollslist do localstorage, bo się laguje przy odświeżaniu

    const [filteredPianoRolls, setFilteredPianoRolls] = useState([])

    useEffect(() => {
        setFilteredPianoRolls(
            props.formatedRollsList.filter((roll) => roll.id !== Number(param.rollId))
        )
    }, [])

    return (

        <div className="container">
            <h1>Details page number {param.rollId}</h1>
            <ActivePianoRollDisplay
                rollId={param.rollId}
                //Finding proper partData in the formatedRollsList
                partData={props.formatedRollsList.filter((roll) => roll.id === Number(param.rollId))[0].partData} />

            <div className="rolls-wrapper grid gap-4 grid-cols-3">
            {filteredPianoRolls.map((roll) => {
                return (
                    <Link to={`/${roll.id}`} key={roll.id}><PianoRollDisplay rollId={roll.id} partData={roll.partData} /></Link>
                )
            }
            )}
            </div>
        </div>
    )

}

export default MainPianoRoll;