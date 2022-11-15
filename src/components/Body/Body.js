import React from 'react';
import { useState, useEffect } from 'react';
import './Body.scss';
import Map from '../Map/Map';
import { useRecoilState } from 'recoil';
import { isDesSelected, gameName } from '../../recoil/atoms';

import { paths } from "../../API/fakedata";

// wrapping everything in the screen 
const Body = ({ }) => {

    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    const [name, setName] = useRecoilState(gameName);

    const [floor, setFloor] = useState(true); //true is first floor, false is second  

    const close = () => {
        setIsSelected(false);
    };

    const switchToFirstFloor = () => {
        setFloor(false);
        setIsSelected(false);
    };
    const switchToSecondFloor = () => {
        setFloor(true);
    };

    return (
        <div>

            {/* fixed */}
            <span className='searchBar'>
                <span className='searchBarWrapper'>
                    <input type="text" placeholder="search for a location..." />
                    <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
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

            <Map
                floor={floor}
            />

            <div className={`${isSelected ? `` : `hidden`} popover`}>
                <div className='desInfo'>
                    {/* <h3> {name} </h3> */}
                    <h3> GameName </h3>
                </div>

                <a className='closeBtn' onClick={close}>
                    <span></span>
                    <span></span>
                </a>
                <button className='navigateBtn'> Navigate </button>
            </div>

            <div className='buttonGroup'>
                <span
                    className={`${floor ? `` : `active`} second-floor-btn`}
                    onClick={switchToFirstFloor}> 2F </span>
                <span
                    className={`${floor ? `active` : ``} first-floor-btn`}
                    onClick={switchToSecondFloor}> 1F </span>
            </div>

            <span
                className='locate-btn'
                style={{ fontSize: '2rem', }}>
                    <i class="fa-solid fa-location-arrow"></i>
            </span>

        </div>

    )
}

export default Body
