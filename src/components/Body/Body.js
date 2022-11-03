import React from 'react';
import { useState, useEffect } from 'react';
import './Body.scss';
import Map from '../Map/Map';
import { useRecoilState } from 'recoil';
import { isDesSelected, whichDestination } from '../../recoil/atoms';

import { paths } from "../../API/fakedata";

// wrapping everything in the screen 
const Body = ({ }) => {
    const [points, setPoints] = useState([]);

    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    const [whichDes, setWhichDes] = useRecoilState(whichDestination);

    const [listOfPaths, setListOfPaths] = useState([]);
    var tempPath = []; 
    var pathsArr = [];  

    const navigate = () => {
        console.log(whichDes)
        return paths.find((element) => {
            console.log(element)
            if (element.bankID === whichDes){
                console.log("finding points", element.points)
                setPoints(element.points); 
                tempPath = [];
                pathsArr = []; 
                element.points.forEach(pt => {
                    if (pt.start) {
                        tempPath.push(pt.name);
                        console.log("added a start point: ", tempPath, pt.name);
                    }
                    if (pt.end) {
                        tempPath.push(pt.name);
                        console.log("added a end point: ", tempPath, pt.name);
                        pathsArr.push(tempPath); 
                        console.log("paths-----", pathsArr)
                        tempPath = [];
                    }
                })
                setListOfPaths(pathsArr); 
            }
        })
    }
    

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

        </div>

    )
}

export default Body
