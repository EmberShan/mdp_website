import React from 'react';
import { useState, useEffect } from 'react';
import './Body.scss';
import Map from '../Map/Map';
import { useRecoilState } from 'recoil';
import { isDesSelected, gameName, gameSearched } from '../../recoil/atoms';

// wrapping everything in the screen 
const Body = ({ }) => {

    const [isSelected, setIsSelected] = useRecoilState(isDesSelected);
    //this is for displaying the name of the slot machine clicked; for debugging purposes
    const [name, setName] = useRecoilState(gameName); 
    // for search bar
    const [searched, setSearched] = useState(false);
    const [placeHolder, setPlaceHolder] = useState('search for a location...');
    const [searchKeyword, setSearchKeyword] = useRecoilState(gameSearched); 

    const [floor, setFloor] = useState(true); //true is first floor, false is second  
    const [scale, setScale] = useState(1); //scale of the map, controlled by zoom in and out buttons 

    // close the popover that displays the game name
    const close = () => {
        setIsSelected(false);
    };
    // switching floor 
    const switchToFirstFloor = () => {
        setFloor(false);
        setIsSelected(false);
    };
    const switchToSecondFloor = () => {
        setFloor(true);
    };

    // controlling the search result menu
    const openSearchMenu = () => {
        setSearched(true);
    };
    const closeSearchMenu = () => {
        setSearched(false);
    };
    // handle which game name the user clicks 
    const handleSearch = (event) => {
        const n = event.currentTarget.dataset.id.replaceAll('_', ' ');
        setPlaceHolder(n); //set placeholder text in the search bar
        setSearchKeyword(n); //set atom of game searched to be used in other components
        closeSearchMenu(); //close the search result menu 
    };

    // close the popover when search keyword is changed
    useEffect(() => {
        close();
    }, [searchKeyword]); 


    // zoom in or out 
    const zoomIn = () => {
        
    };
    const zoomOut = () => {
        
    };


    return (
        <div>
            {/* black overlay when search menu is present */}
            {
                searched ? <span style={{
                    position: 'absolute', top: '0', left: '0', backgroundColor: 'black',
                    opacity: '0.1', width: '100vw', height: '100vh', zIndex: '2'
                }}
                    onClick={closeSearchMenu}></span>
                    : <></>
            }

            {/* fixed */}
            <span className='searchBar'>
                <span className='searchBarWrapper' onClick={openSearchMenu}>
                    <input type="text" placeholder={placeHolder} />
                    <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </span>
                {/* popular games */}
                {
                    searched ?
                        <span className='dropdownMenu'>
                            <span data-id='50_Dragons' onClick={handleSearch}> <p> 50 Dragons </p> </span>
                            <span data-id='Heaven_and_Earth' onClick={handleSearch}> <p> Heaven and Earth </p> </span>
                            <span data-id='Selexion_#1' onClick={handleSearch}> <p> Selexion #1 </p> </span>
                            <span data-id='Fortunes_Way' onClick={handleSearch}> <p> Fortunes Way </p> </span>
                            <span data-id='all' onClick={handleSearch}> <p> All games : available </p> </span>
                        </span> : <></>
                }

            </span>

            <div>
                {/* map with the markers */}
                <Map
                    floor={floor}
                    scale={scale}
                />

                {/* popover that displays the game name */}
                <div className={`${isSelected ? `` : `hidden`} popover`}>
                    <div className='desInfo'>
                        <h5> {name} </h5>
                    </div>

                    <a className='closeBtn' onClick={close}>
                        <span></span>
                        <span></span>
                    </a>
                    {/* <button className='navigateBtn'> Navigate </button> */}
                </div>

                {/* buttons that display floors */}
                <div className='zoomButtonGroup' style={{zIndex: '1000', }}>
                    <span
                        className='zoomin'
                        onClick={zoomIn}> <i class="fa-solid fa-plus"></i> </span>
                    <span
                        className='zoomout'
                        onClick={zoomOut}> <i class="fa-solid fa-minus"></i> </span>
                </div>
                
                {/* buttons that display floors */}
                <div className='buttonGroup' style={{zIndex: '1000', }}>
                    <span
                        className={`${floor ? `` : `active`} second-floor-btn`}
                        onClick={switchToFirstFloor}> 2F </span>
                    <span
                        className={`${floor ? `active` : ``} first-floor-btn`}
                        onClick={switchToSecondFloor}> 1F </span>
                </div>

                {/* locate button for locating the user location */}
                <span
                    className='locate-btn'
                    style={{ fontSize: '2rem', }}>
                    <i className="fa-solid fa-location-arrow"></i>
                </span>
            </div>


        </div>

    )
}

export default Body
