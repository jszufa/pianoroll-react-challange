import PianoRollDisplay from "../PianoRollDisplay";


function MainPianoRoll (props) {

    //1.Zrobić routing, tak żeby przekazywać id klikniętego pianoRolla jako props, albo coś podobnego

    return (
        
        <div className="container">
            <h1>Details page </h1>
            <PianoRollDisplay/>
            {/* PianoRollList */}
        </div>
    )   

}

export default MainPianoRoll;