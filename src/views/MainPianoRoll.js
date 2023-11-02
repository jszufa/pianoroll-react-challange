import { useParams } from "react-router-dom";
import PianoRollDisplay from "../PianoRollDisplay";


function MainPianoRoll(props) {

    //1.Zrobić routing, tak żeby przekazywać id klikniętego pianoRolla jako props, albo coś podobnego
    //a) dowiedzieć się jak robi się dynamiczne ścieżki w routerze

    //b) jak przekazać dane do wyrysowania piano roll?

    //PianoRoll Id is passed as a dynamic parameter in the route
    const param = useParams();

    return (

        <div className="container">
            <h1>Details page number{param.rollId}</h1>
            <PianoRollDisplay rollId={param.rollId} /* partData={partData} to można przekazać przez link -> pytanie co z resztą listy -> i tak potrzebuję dostępu do wszystkich aktualnie załadowanych piano rollsów */ />
            {/* PianoRollList */}
        </div>
    )

}

export default MainPianoRoll;