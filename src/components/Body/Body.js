import React from 'react';
import { useState } from 'react';
import './Body.scss';
import Map from '../Map/Map';

const Body = ({}) => {
    const [toggled, setToggled] = useState(true)

    const switchFloor = () =>{
        console.log(toggled);
        setToggled((state) => (state === true ? false : true));
    }

    return (
        <body>
            <Map toggled={toggled}/>

            {/* <button onClick={switchFloor} className="switchFloorBtn"> 
                {toggled ? "Switch to Second Floor" : "Switch to First Floor"} 
            </button> */}
        </body>
        
    )
}

export default Body
