import React, { useEffect, useState, useRef } from "react";
import './Map.scss';
import LineTo from 'react-lineto';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isDesSelected, gameName, gameSearched, simulateFlag } from '../../recoil/atoms';
// displaying slot machine markers 
import SlotMachine from '../SlotMachine/index';

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');


const Map = (props) => {
    const [startX, setStartX] = useState(0); //x of user location 
    const [startY, setStartY] = useState(0); //y of user location 
    const [endX, setEndX] = useState(0); //y of destination
    const [endY, setEndY] = useState(0); //y of destination

    const [sizeOfImg, setSizeOfImg] = useState([0, 0]); //width, height 

    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    const [searchKeyword, _] = useRecoilState(gameSearched);

    const [simulate, setSimulate] = useRecoilState(simulateFlag); 

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
        setEndX(endX);
        setEndY(endY);
        setMounted(false);
        setInput({
            device_id: id,
            start_x: startX,
            start_y: startY,
            end_x: endX,
            end_y: endY
        });
    };
    // set the input for put request whenever the start x and y updated
    useEffect(() => {
        setInput({
            device_id: id,
            start_x: startX,
            start_y: startY,
            end_x: endX,
            end_y: endY
        });
    }, [startX, startY]);
    // send put request whenever the input is changed 
    // (when path is requested by the user or when x and y are changed)
    useEffect(() => {
        console.log('put request');
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
                console.log("data from API", pathData)
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
            // determine if the line is horizontal or vertical 
            // and set height and width accordingly 
            if (x2 === x1) {
                obj.h = Math.abs(Math.floor((y2 - y1) / 6.68)) + 0.3;
                obj.w = 1;
                obj.x = Math.floor(x1 / 6.38);
                // determine the starting point of the line
                // obj.y = (y1 > y2) ? (Math.floor(y1 / 6.68)) : (Math.floor(y1 / 6.68)); 
                obj.y = Math.min(y1, y2) / 6.68;
            }
            else if (y2 === y1) {
                obj.h = 1;
                obj.w = Math.abs(Math.floor((x2 - x1) / 6.38)) + 0.3;
                obj.y = Math.floor(y1 / 6.68);
                // determine the starting point of the line
                // obj.x = (x1 > x2) ? (Math.floor(x2 / 6.38)) : (Math.floor(x1 / 6.38)); 
                obj.x = Math.min(x1, x2) / 6.38;
            };
            tempLines.push(obj);
        }
        setLines(tempLines);
    };
    // this ensures to only draw the lines after the putrequest, fetch, and after the data is cleaned up 
    useEffect(() => {
        setMounted(true);
        console.log("------------lines-----------", lines);
    }, [lines]);

    // if another search keyword is chosen, remove the paths
    useEffect(() => {
        setMounted(false);
    }, [searchKeyword]);

    // -------- user location --------
    // for fetching user location data from the API 
    async function userData() {
        const response = await fetch("https://mdpcasinoapi.azurewebsites.net/api/simulations/1");
        const fetchedData = await response.json();
        if (!response.ok) {
            return response.statusText;
        }
        return fetchedData;
    };
    useEffect(() => {
        console.log(simulate); 
        if (simulate) {
            const interval = setInterval(() => {
                userData()
                    .then((userData) => {
                        setStartX(userData.x)
                        setStartY(userData.y)
                        // setStartX(
                        //     Math.min(sizeOfImg[0], Math.max(0, userData.x))
                        // )
                        // setStartY(
                        //     Math.min(sizeOfImg[1], Math.max(0, userData.y))
                        // )
                        console.log("user location in pixels",
                            startX, startY);
                    })
                    .catch((error => {
                        console.log(error);
                    }));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startX, startY, sizeOfImg, simulate]);

    // -------- user location --------
    // for fetching user location data from the API 
    // async function userData() {
    //     const response = await fetch(`https://mdpcasinoapi.azurewebsites.net/api/users/${id}`);
    //     const fetchedData = await response.json();
    //     if (!response.ok) {
    //         return response.statusText;
    //     }
    //     return fetchedData;
    // };
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         userData()
    //             .then((userData) => {
    //                 setStartX(
    //                     Math.min(sizeOfImg[0], Math.max(0, userData.currentX))
    //                 )
    //                 setStartY(
    //                     Math.min(sizeOfImg[1], Math.max(0, userData.currentY))
    //                 )
    //                 console.log("user location in pixels",
    //                     startX, startY);
    //             })
    //             .catch((error => {
    //                 console.log(error);
    //             }));
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [startX, startY, sizeOfImg]);


    return (
        <div className="map-container" style={{ position: 'relative' }} id='canvas'>

            {/* this div is to limit the markers within the map img */}
            <div className="map" id='mapID'>

                {/* the marker representing the user location */}
                {
                    props.floor ?
                        <span className="marker" style={{ fontSize: '2rem', left: `${startX * sizeOfImg[0] / 638}px`, top: `${startY * sizeOfImg[1] / 668}px`, color: 'red' }}>
                            <i className="fa-solid fa-location-pin"></i>
                        </span>
                        : <></>
                }


                {/* ----------------------------- */}
                {/* all the codes about slot machines are in the SlotMachine folder */}

                {/* the map containing the slot machines, paths, and the map image */}
                <span>
                    {
                        (props.floor && (searchKeyword !== 'null')) ?
                            <SlotMachine requestPath={requestPath} sizeOfImg={sizeOfImg} />
                            : <></>
                    }

                    {/* the paths */}
                    {
                        isSelected && mounted && props.floor &&
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
                                        borderRadius: '20px',
                                    }}></span>
                            )
                        })
                    }
                    <img className="floor-img"
                        onLoad={onImgLoad} src={props.floor ? img1 : img2}
                    />
                </span>

            </div>

        </div>
    )

}

export default Map