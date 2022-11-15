import React from 'react';
import { useState, useEffect } from 'react';
import './Body.scss';
import Map from '../Map/Map';
import { useRecoilState } from 'recoil';
import { isDesSelected, gameName } from '../../recoil/atoms';

import { paths } from "../../API/fakedata";

// wrapping everything in the screen 
const Body = ({ }) => {
    const [points, setPoints] = useState([]);

    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    const [name, setName] = useRecoilState(gameName);

    const [listOfPaths, setListOfPaths] = useState([]);
    var tempPath = []; 
    var pathsArr = [];  

    const close = () => {
        setIsSelected(false); 
        setListOfPaths([]); 
    }

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
                listOfPaths={listOfPaths} 
                points={points}
                />

            <div className={`${isSelected ? `` : `hidden`} popover`}>
                <div className='desInfo'>
                    <h3> {name} </h3>
                </div>

                <a className='closeBtn' onClick={close}>
                    <span></span>
                    <span></span>
                </a>
                <button className='navigateBtn'> Navigate </button>
            </div>

        </div>

    )
}

export default Body
