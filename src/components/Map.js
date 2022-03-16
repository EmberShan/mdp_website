import React from "react";
import { useState } from 'react';
import '../css/Map.css';

const Map = ({toggled}) => {
    // imgs of the map
    const img1 = require('./imgs/first_floor.png')
    const img2 = require('./imgs/second_floor.png')
    // coordinates of the markers
    const [start, setStart] = useState({x: 20, y: 30});
    const [dest, setDest] = useState({x: 50, y: 30});

    //test functions for user location
    const moveUp = () => {
        setStart({ x: start.x, y: start.y + 5 });
    }
    const moveDown = () => {
        setStart({ x: start.x, y: start.y - 5 });
    }
    const moveLeft = () => {
        setStart({ x: start.x + 5, y: start.y });
    }
    const moveRight = () => {
        setStart({ x: start.x - 5, y: start.y });
    }
    //test functions for destination location
    const moveUp2 = () => {
        setDest({ x: dest.x, y: dest.y + 5 });
    }
    const moveDown2 = () => {
        setDest({ x: dest.x, y: dest.y - 5 });
    }
    const moveLeft2 = () => {
        setDest({ x: dest.x + 5, y: dest.y });
    }
    const moveRight2 = () => {
        setDest({ x: dest.x - 5, y: dest.y });
    }
    

    return(
        <div className="map">
            <span className="marker" style = {{ top: `${start.y}%`, left: `${start.x}%`, backgroundColor: 'red'}}></span>
            <span className="marker" style = {{ top: `${dest.y}%`, left: `${dest.x}%`, backgroundColor: 'blue' }}></span>

            <img className ="floor-img" src={toggled ? img1 : img2}/>

            {/* dugging buttons */}
            <div className='debug'>
                <div>
                    <p> start location </p>
                    <button className="debugBtn" onClick={moveDown}> y+ </button>
                    <button className="debugBtn" onClick={moveUp}> y- </button>
                    <button className="debugBtn" onClick={moveLeft}> x+ </button>
                    <button className="debugBtn" onClick={moveRight}> x- </button>
                </div>
                <div>
                    <p> destination location </p>
                    <button className="debugBtn" onClick={moveDown2}> y+ </button>
                    <button className="debugBtn" onClick={moveUp2}> y- </button>
                    <button className="debugBtn" onClick={moveLeft2}> x+ </button>
                    <button className="debugBtn" onClick={moveRight2}> x- </button>
                </div>
                
            </div>

        </div>
    )

}

export default Map