import React, { useEffect, useState, useRef } from "react";
import './Map.scss';
import LineTo from 'react-lineto';
import { useRecoilState } from 'recoil';
import { isDesSelected, gameName } from '../../recoil/atoms';
// displaying slot machine markers 
import SlotMachine from '../SlotMachine/index';

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');


const Map = (props) => {
    const [startX, setStartX] = useState(0); //x of user location 
    const [startY, setStartY] = useState(0); //y of user location 

    const [sizeOfImg, setSizeOfImg] = useState([0, 0]); //width, height 

    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);

    // detect the size of the image & load the markers 
    const onImgLoad = ({ target: img }) => {
        const { offsetWidth, offsetHeight } = img;
        setSizeOfImg([offsetWidth, offsetHeight]);
    };
    useEffect(() => {
        console.log("size of image", sizeOfImg);
    }, [sizeOfImg]);

    // put request 
    const [id, setId] = useState(1);

    const [input, setInput] = useState({
        device_id: 0,
        start_x: 0,
        start_y: 0,
        end_x: 0,
        end_y: 0
    })
    const [putResult, setPutResult] = useState(false);
    // result containing points of the paths
    const [result, setResult] = useState([]);
    const [mounted, setMounted] = useState(false);
    // the array that is used to draw the lines 
    const [lines, setLines] = useState([]);

    const [name, setName] = useRecoilState(gameName);

    // ----------- requesting paths (PUT) -----------
    const requestPath = (event, endX, endY) => {
        setMounted(false);
        setInput({
            device_id: id,
            start_x: startX,
            start_y: startY,
            end_x: endX,
            end_y: endY
        });
    };
    useEffect(() => {
        putData();
    }, [input]);
    async function putData() {
        try {
            await fetch(`https://mdpcasinoapi.azurewebsites.net/api/navigation/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
            });
            setPutResult(!putResult);
        } catch (err) {
            console.log(putResult);
        }
    };

    // ----------- fetch the path data -----------
    useEffect(() => {
        pathData()
            .then((pathData) => {
                cleanPathData(pathData);
            })
            .catch((error => {
                console.log(error);
            }));
    }, [putResult]);
    async function pathData() {
        const response = await fetch(`https://mdpcasinoapi.azurewebsites.net/api/route/${id}`);
        const fetchedData = await response.json();
        if (!response.ok) {
            return response.statusText;
        }
        return fetchedData;
    };

    // ----------- clean up the path data from backend -----------
    const cleanPathData = (arr) => {
        const pathPoints = [];
        arr.forEach((a) => {
            pathPoints.push(a.split(" "));
        });
        var tempLines = [];
        // var obj = { x: 0, y: 0, w: 0, h: 0 }; //x and y are start point coord
        for (let i = 1; i < pathPoints.length; i++) {
            const obj = { x: 0, y: 0, w: 0, h: 0 }; //x and y are start point coord
            // start point is pathPoints[i-1] and end point is pathPoints[i]
            const x1 = pathPoints[i - 1][0];
            const y1 = pathPoints[i - 1][1];
            const x2 = pathPoints[i][0];
            const y2 = pathPoints[i][1];

            // and set height and width accordingly 
            obj.x = x1 / 6.38; obj.y = (y1 / 6.68) - 5;
            // determine if the line is horizontal or vertical 
            if (x2 - x1 === 0) {
                obj.h = (y2 - y1) / 6.68;
                obj.w = 1;
            }
            else if (y2 - y1 === 0) {
                obj.h = 1;
                obj.w = (x2 - x1) / 6.38;
            };
            tempLines.push(obj);
        }
        setLines(tempLines);
    };
    useEffect(() => {
        setMounted(true);
    }, [lines]);


    // -------- user location --------
    // for fetching user location data from the API 
    async function userData() {
        const response = await fetch(`https://mdpcasinoapi.azurewebsites.net/api/users/1`);
        const fetchedData = await response.json();
        if (!response.ok) {
            return response.statusText;
        }
        return fetchedData;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            userData()
                .then((userData) => {
                    setStartX(
                        Math.min(sizeOfImg[0], Math.max(0, userData.currentX))
                    )
                    setStartY(
                        Math.min(sizeOfImg[1], Math.max(0, userData.currentY))
                    )
                    console.log(startX, startY);
                })
                .catch((error => {
                    console.log(error);
                }));
        }, 1000);
        return () => clearInterval(interval);
    }, [startX, startY, sizeOfImg]);


    return (
        <div className="map-container" style={{ position: 'relative' }} id='canvas'>

            {/* this div is to limit the markers within the map img */}
            <div className="map" id='mapID'>

                {/* dots / map markers */}
                <span className="marker" style={{ fontSize: '2rem', left: `${startX}px`, top: `${startY}px`, color: 'red' }}>
                    <i className="fa-solid fa-location-pin"></i>
                </span>

                {/* ----------------------------- */}
                {/* all the codes about slot machines are in the SlotMachine folder */}
                <SlotMachine requestPath={requestPath} sizeOfImg={sizeOfImg} />

                {/* img */}
                <span>
                    {/* the paths */}
                    {
                        isSelected && mounted && 
                        lines.map((l, index) => {
                            return (
                                <span key={index}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: 'red',
                                        zIndex: '2',
                                        top: `${l.y}%`,
                                        left: `${l.x}%`,
                                        height: `${l.h}%`,
                                        width: `${l.w}%`,
                                    }}></span>
                            )
                        })
                    }
                    <img className="floor-img"
                        onLoad={onImgLoad} src={img1} />
                </span>

                <p> {result} </p>

            </div>

        </div>
    )

}

export default Map