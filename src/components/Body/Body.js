import React from 'react';
import { useState } from 'react';
import './Body.scss';
import Map from '../Map/Map';

// wrapping everything in the screen 
const Body = ({ }) => {
    const [toggled, setToggled] = useState(true)

    const switchFloor = () => {
        console.log(toggled);
        setToggled((state) => (state === true ? false : true));
    }

    return (
        <body>

            {/* fixed */}
            <span className='searchBarWrapper'>
                <input type="text" placeholder="search for a location..." />
                <button>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </span>

            <Map toggled={toggled} />
            
            {/* fixed button group */}
            <span className='btnWrapper'>
                <span className='flootBtn'>
                    <button>
                        2F
                    </button>
                    <button>
                        1F
                    </button>
                </span>

                <button></button>
            </span>

            {/* <button onClick={switchFloor} className="switchFloorBtn"> 
                {toggled ? "Switch to Second Floor" : "Switch to First Floor"} 
            </button> */}
        </body>

    )
}

export default Body
