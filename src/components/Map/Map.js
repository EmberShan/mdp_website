import React, { useEffect, useState, useRef } from "react";
import './Map.scss';
import LineTo from 'react-lineto';

// displaying slot machine markers 
import SlotMachine from '../SlotMachine/index';

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');


const Map = (props) => {
    const [startX, setStartX] = useState(0); //x of user location 
    const [startY, setStartY] = useState(0); //y of user location 

    const [sizeOfImg, setSizeOfImg] = useState([0, 0]); //width, height 

    const [paths, setPaths] = useState([]); //posX, posY 

    // detect the size of the image & load the markers 
    const onImgLoad = ({ target: img }) => {
        const { offsetWidth, offsetHeight } = img;
        setSizeOfImg([offsetWidth, offsetHeight]);
    }

    useEffect(() => {
        setPaths(props.listOfPaths);
    }, [props.listOfPaths]);


    useEffect(() => {
        const interval = setInterval(() => {
            setStartX(
                Math.min(sizeOfImg[0], Math.max(0, startX + 20))
            )
            setStartY(
                Math.min(sizeOfImg[1], Math.max(0, startY + 20))
            )
            console.log("updating... X:" + startX + " Y: " + startY)
            console.log(sizeOfImg)
        }, 1000);
        return () => clearInterval(interval);
    }, [startX, startY, sizeOfImg]);


    return (
        <div className="map-container" style={{ position: 'relative' }} id='canvas'>

            {/* this div is to limit the markers within the map img */}
            <div className="map" id='mapID'>
            
                {/* dots / map markers */}
                <span className="marker" style={{ fontSize: '2rem', left: `${startX}px`, top: `${startY}px`, color: 'red' }}>
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
                {/* all the codes about slot machines are in the SlotMachine folder */}
                <SlotMachine />

                {/* img */}
                <img className="floor-img"
                    onLoad={onImgLoad} src={props.toggled ? img1 : img2} />

            </div>

        </div>
    )

}

export default Map