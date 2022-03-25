import React, {useEffect, useState} from "react";
import './Map.scss';

// DEBUGGING; 
// fake json data w/ location info; 
import {data} from '../data/location';

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');


const Map = (props) => {
    const [start, setStart] = useState([0, 0]); 
    const [sizeOfImg, setSizeOfImg] = useState([0, 0]); 


    // detect the size of the image & load the markers 
    const onImgLoad = ({ target: img }) => {
        const { offsetHeight, offsetWidth } = img;
        setSizeOfImg( [offsetWidth, offsetHeight] ); 
        console.log(setSizeOfImg); 
    }

    // for user location in the future 


    // for DEBUGGING purposes; see if the marker can move dynamically  
    const move = () => {
        setStart(
            // with constraints to the max size of the img
            [Math.min(sizeOfImg[0], Math.max(0, start[0]+20)), 
                Math.min(sizeOfImg[1], Math.max(0, start[1]+30))] 
        );

        console.log('destination x: ' + start[0] + 'px, y: ' + start[1] + 'px');
    }
    

    return(
        <div className="map-container" style={{position: 'relative'}}>
            
            {/* this div is to limit the markers within the map img */}
            <div className="map">

                {/* dots / map markers */}
                <span className="marker" style = {{ left: `${start[0]}px`, top: `${start[1]}px`, color: 'red'}}>
                    <i class="fa-solid fa-location-dot"></i>
                </span>

                {/* mapping all the slot machines from json data (../data/location.js) */}
                {data.map( (d) => (
                    <span key={d.id} className="slotMachine marker"
                        style={{ left: `${d.x}px`, top: `${d.y}px`, color: '#F7A072' }}
                    > 
                        <i class="fa-solid fa-location-dot"></i> 
                    </span>
                )) }

                {/* img */}
                <img className ="floor-img" onLoad={onImgLoad} src={props.toggled ? img1 : img2}/>
            </div>
            
            {/* DEBUGGING */}
            <button onClick={move} style={{ padding: '10px' }}> move user location </button>

        </div>
    )
    
}

export default Map