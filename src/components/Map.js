import React from "react";
import { useState } from 'react';
import '../css/Map.css';

const Map = ({toggled}) => {
    // imgs of the map
    const img1 = require('./imgs/demo.png')
    const img2 = require('./imgs/second_floor.png')
    // coordinates of the markers
    const [start, setStart] = useState({x: 0, y: 0});
    const [dest, setDest] = useState({x: 100, y: 100});

    //change location of marker like this
    const moveUp = () => {
        setStart({ x: start.x, y: Math.min(100, Math.max(0, start.y + 5)) });
    }

    return(
        <div className="map" style={{position: 'relative'}}>
            <span className="marker" style = {{ top: `${start.y}%`, left: `${start.x}%`, backgroundColor: 'red'}}></span>
            <span className="marker" style = {{ top: `${dest.y}%`, left: `${dest.x}%`, backgroundColor: 'blue' }}></span>

            <img className ="floor-img" src={toggled ? img1 : img2}/>
        </div>

    )

}

export default Map