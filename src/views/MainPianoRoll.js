import { useParams } from "react-router-dom";
import ActivePianoRollDisplay from "../components/ActivePianoRollDisplay";
import PianoRollDisplay from "../components/PianoRollDisplay";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function MainPianoRoll(props) {

    //PianoRoll Id is passed as a dynamic parameter in the route
    const param = useParams();

    const [filteredPianoRolls, setFilteredPianoRolls] = useState([])

    useEffect(() => {
        setFilteredPianoRolls(
            props.formatedRollsList.filter((roll) => roll.id !== Number(param.rollId))
        )
    }, [])

    return (

        <div className="container flex flex-wrap md:flex-nowrap m-auto my-10 h-128">

            <div className="w-full lg:w-3/4 md:mr-4 lg:mr-8 rounded-2xl border border-zinc-300 shadow-md h-96 md:h-full pt-12 px-8">

                <ActivePianoRollDisplay
                    rollId={param.rollId}
                    //Finding proper partData in the formatedRollsList
                    partData={props.formatedRollsList.filter((roll) => roll.id === Number(param.rollId))[0].partData} />
            </div>

            <div className="rolls-wrapper w-4/5 m-auto md:w-1/4 shadow-sm flex  flex-col space-y-4 overflow-auto rounded-2xl border border-zinc-300 p-6 h-full my-6 md:my-0">
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