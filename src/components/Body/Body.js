import React from 'react';
import { useState } from 'react';
import './Body.scss';
import Map from '../Map/Map';
import { useRecoilState } from 'recoil';
import { isDesSelected, whichDestination } from '../../recoil/atoms';

// wrapping everything in the screen 
const Body = ({ }) => {
    const [toggled, setToggled] = useState(true);
    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    const [whichDes, setWhichDes] = useRecoilState(whichDestination);

    const switchFloor = () => {
        console.log(toggled);
        setToggled((state) => (state === true ? false : true));
    }

    const navigate = () => {

    }
    const close = () => {
        setIsSelected(false); 
    }

    return (
        <body>

            {/* fixed */}
            <span className='searchBar'>
                <span className='searchBarWrapper'>
                    <input type="text" placeholder="search for a location..." />
                    <button>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </span>
                {/* popular games */}
                <span className='dropdownMenu'>
                    <span> <p> Poker </p> </span>
                    <span> <p> BlackJack </p> </span>
                    <span> <p> American Roulette </p> </span>
                    <span> <p> Game King </p> </span>
                </span>
            </span>

            <Map toggled={toggled} />

            <div className={`${isSelected ? `` : `hidden`} popover`}>
                <div className='desInfo'>
                    <h3> BankId: {whichDes} </h3>
                    <p> 0.4 m  </p>
                    <p> vacant  </p>
                </div>

                <a className='closeBtn' onClick={close}>
                    <span></span>
                    <span></span>
                </a>
                <button className='navigateBtn' onClick={navigate}> Navigate </button>
            </div>

            {/* fixed button group */}
            {/* <span className='btnWrapper'>
                <span className='flootBtn'>
                    <button>
                        2F
                    </button>
                    <button>
                        1F
                    </button>
                </span>

                <button></button>
            </span> */}

            {/* <button onClick={switchFloor} className="switchFloorBtn"> 
                {toggled ? "Switch to Second Floor" : "Switch to First Floor"} 
            </button> */}
        </body>

    )
}

export default Body
