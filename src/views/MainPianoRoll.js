import { useParams } from "react-router-dom";
import PianoRollDisplay from "../PianoRollDisplay";
import { useEffect, useState } from "react";


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

    return (

        <div className="container">
            <h1>Details page number{param.rollId}</h1>
            <PianoRollDisplay
                rollId={param.rollId}
                //Finding proper partData in the formatedRollsList
                partData={props.formatedRollsList.filter((roll) => roll.id == param.rollId)[0].partData} />


            {/* PianoRollList */}
        </div>
    )

}

export default MainPianoRoll;