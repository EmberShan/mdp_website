import React, { useEffect, useState, useRef } from "react";
import './Map.scss';
import LineTo from 'react-lineto';

// displaying slot machine markers 
import SlotMachine from '../SlotMachine/index';

import { anchorPoints, paths } from "../../API/fakedata";

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');


const Map = (props) => {
    const [start, setStart] = useState([0, 0]); //x, y
    const [sizeOfImg, setSizeOfImg] = useState([0, 0]); //width, height 
    const [posOfImg, setPosOfImg] = useState([0, 0]); //posX, posY 


    const [paths, setPaths] = useState([]); //posX, posY 

    // detect the size of the image & load the markers 
    const onImgLoad = ({ target: img }) => {
        const { offsetWidth, offsetHeight } = img;
        setSizeOfImg([offsetWidth, offsetHeight]);
    }

    useEffect(() => {
        setPaths(props.listOfPaths); 
    }, [props.listOfPaths]); 

    // for DEBUGGING purposes; see if the marker can move dynamically  
    const move = () => {
        setStart(
            // with constraints to the max size of the img
            [Math.min(sizeOfImg[0], Math.max(0, start[0] + 20)),
            Math.min(sizeOfImg[1], Math.max(0, start[1] + 30))]
        );

        console.log("size of image is: " + sizeOfImg);
        console.log('destination x: ' + start[0] + 'px, y: ' + start[1] + 'px');
    }


    return (
        <div className="map-container" style={{ position: 'relative' }} id='canvas'>

            {/* this div is to limit the markers within the map img */}
            <div className="map" id='mapID'>

                {/* dots / map markers */}
                <span className="marker" style={{ fontSize: '2rem', left: `${start[0]}px`, top: `${start[1]}px`, color: 'red' }}>
                    <i class="fa-solid fa-location-pin"></i>
                </span>


                {/* for drawing the paths; get the points from API 
                and map them out on the app */}
                {props.points.map((pt, index) => {
                    return (
                        <span
                            key={index}
                            className={`${pt.name} anchor`}
                            style={{
                                left: `${pt.x}%`, 
                                top: `${pt.y}%`, 
                                backgroundColor: 'red', 
                                width: '5px', 
                                height: '5px', 
                                zIndex: '2', 
                            }}
                        ></span>
                    )
                })}


                {paths.map((p, index) => {
                    console.log("listofpaths ****** ", paths)
                    console.log("path ****** ", p)
                    return (
                        <LineTo
                            key={index}
                            className="path"
                            from={p[0]} to={p[1]}
                            borderColor='#F7A072' borderWidth={6} zIndex={0}
                        />
                    )
                })}


                {/* ----------------------------- */}

                <SlotMachine />

                {/* img */}
                <img className="floor-img"
                    onLoad={onImgLoad} src={props.toggled ? img1 : img2} />

            </div>

            {/* DEBUGGING */}
            <button onClick={move} style={{ padding: '10px' }}> move user location </button>
                
        </div>
    )

}

export default Map