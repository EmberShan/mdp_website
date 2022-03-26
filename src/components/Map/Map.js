import React, {useEffect, useState} from "react";
import './Map.scss';

// displaying slot machine markers 
import SlotMachine from '../SlotMachine/index'; 

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');

const Map = (props) => {
    const [start, setStart] = useState([0, 0]); //x, y
    const [sizeOfImg, setSizeOfImg] = useState([0, 0]); //width, height 
    

    // detect the size of the image & load the markers 
    const onImgLoad = ({ target: img }) => {
        const { offsetWidth,  offsetHeight} = img;
        setSizeOfImg( [offsetWidth,  offsetHeight] ); 
    }


    // for DEBUGGING purposes; see if the marker can move dynamically  
    const move = () => {
        setStart(
            // with constraints to the max size of the img
            [Math.min(sizeOfImg[0], Math.max(0, start[0]+20)), 
                Math.min(sizeOfImg[1], Math.max(0, start[1]+30))] 
        );

        console.log("size of image is: " + sizeOfImg); 
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

                <SlotMachine />

                {/* img */}
                <img className ="floor-img" onLoad={onImgLoad} src={props.toggled ? img1 : img2}/>
            </div>
            
            {/* DEBUGGING */}
            <button onClick={move} style={{ padding: '10px' }}> move user location </button>

        </div>
    )
    
}

export default Map