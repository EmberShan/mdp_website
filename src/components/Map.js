import React from "react";
import '../css/Map.css';
import { scaleLinear } from "d3-scale";

// imgs of the map
const img1 = require('./imgs/demo.png');
const img2 = require('./imgs/second_floor.png');

// DEBUGGING; fake json data w/ location info; 
const data = [{id: 1, x: 30, y: 40}]; // the slot machine is at (30 meters, 40 meters) in the room
// linear scale functions
// example: width of room is 80 meters and width of img is 227px
const meterToPx = scaleLinear()
    .domain([0, 80]) //meter
    .range([0, 227]); //px

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // coordinates of the markers; for now there are only two
            start: [0, 0],
            dest: [100, 100],
            // size of img
            sizeOfImg: {},
        };
        // functions here
        this.onImgLoad = this.onImgLoad.bind(this);
        this.move = this.move.bind(this);
    };

    // detect the size of the image
    onImgLoad({target:img}){
        this.setState({sizeOfImg: {w: img.offsetWidth, h: img.offsetHeight}});
        console.log('w:' + img.offsetWidth + 'px', 'h:' + img.offsetHeight + 'px');
    }


    // for DEBUGGING purposes; see if the marker can move dynamically  
    move(){
        this.setState({
            dest: [Math.min(100, Math.max(0, this.state.dest[0] - 5)), Math.min(100, Math.max(0, this.state.dest[1] - 10))] 
        });
        console.log();
    }

    render(){
        return(
            <div className="map-container" style={{position: 'relative'}}>
                
                {/* this div is to limit the markers within the map img */}
                <div className="map">
                    {/* dots / map markers */}
                    <span className="marker" style = {{ top: `${this.state.start[1]}%`, left: `${this.state.start[0]}%`, color: 'red'}}>
                        <i class="fa-solid fa-location-dot"></i>
                    </span>
                    <span className="marker" style = {{ top: `${this.state.dest[1]}%`, left: `${this.state.dest[0]}%`, color: 'blue' }}>
                        <i class="fa-solid fa-location-dot"></i>
                    </span>
                    {/* img */}
                    <img className ="floor-img" onLoad={this.onImgLoad} src={this.props.toggled ? img1 : img2}/>
                </div>
                
                {/* DEBUGGING */}
                <button onClick={this.move} style={{padding: '10px'}}> move marker </button>

            </div>
        )
    }
}

export default Map