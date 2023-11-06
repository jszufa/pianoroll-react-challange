import { useParams } from "react-router-dom";
import ActivePianoRollDisplay from "../components/ActivePianoRollDisplay";
import PianoRollDisplay from "../components/PianoRollDisplay";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function MainPianoRoll(props) {

    //PianoRoll Id is passed as a dynamic parameter in the route
    const param = useParams();

    const [filteredPianoRolls, setFilteredPianoRolls] = useState([])

    useEffect(() => {
        setFilteredPianoRolls(
            props.formatedRollsList.filter((roll) => roll.id !== Number(param.rollId))
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <div className="main-roll-view">

            <div className="active-roll-holder">
                <ActivePianoRollDisplay
                    rollId={param.rollId}
                    //Finding proper partData in the formatedRollsList
                    partData={props.formatedRollsList.filter((roll) => roll.id === Number(param.rollId))[0].partData} />
            </div>

            <div className="rolls-wrapper space-y-4">
                {filteredPianoRolls.map((roll) => {
                    return (
                        <Link to={`/${roll.id}`} key={roll.id}>
                            <PianoRollDisplay rollId={roll.id} partData={roll.partData} />
                        </Link>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default MainPianoRoll;