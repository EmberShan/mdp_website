import React from "react";
import './Map.scss';

// DEBUGGING; 
// fake json data w/ location info; 
import {data} from '../data/location';

// imgs of the map
const img1 = require('../../imgs/demo.png');
const img2 = require('../../imgs/second_floor.png');


class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // coordinates of the markers; for now there are only two
            start: [0, 0],
            // size of img
            sizeOfImg: [0, 0], // [width, height]
        };

        this.onImgLoad = this.onImgLoad.bind(this);
        this.move = this.move.bind(this);
    };

    // detect the size of the image & load the markers 
    onImgLoad({target:img}){
        this.setState({ sizeOfImg: [img.offsetWidth, img.offsetHeight] }, () => {
            // fallback
            // need to load the markers after the API call in the future
            this.setState({start: [0, 0]});
            console.log('w:' + this.state.sizeOfImg[0] + 'px', 'h:' + this.state.sizeOfImg[1] + 'px');
        });
    }

    // for user location in the future 


    // for DEBUGGING purposes; see if the marker can move dynamically  
    move(){
        this.setState({
            // with constraints to the max size of the img
            start: [Math.min(this.state.sizeOfImg[0], Math.max(0, this.state.start[0]+5)), 
                Math.min(this.state.sizeOfImg[1], Math.max(0, this.state.start[1]+10))] 
        });

        console.log('destination x: ' + this.state.start[0] + 'px, y: ' + this.state.start[1] + 'px');
    }

    render(){
        return(
            <div className="map-container" style={{position: 'relative'}}>
                
                {/* this div is to limit the markers within the map img */}
                <div className="map">

                    {/* dots / map markers */}
                    <span className="marker" style = {{ left: `${this.state.start[0]}px`, top: `${this.state.start[1]}px`, color: 'red'}}>
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
                    <img className ="floor-img" onLoad={this.onImgLoad} src={this.props.toggled ? img1 : img2}/>
                </div>
                
                {/* DEBUGGING */}
                <button onClick={this.move} style={{padding: '10px'}}> move user location </button>

            </div>
        )
    }
}

export default Map