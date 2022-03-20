import React from "react";
import '../css/Map.scss';
import { scaleLinear } from "d3-scale";

// imgs of the map
const img1 = require('./imgs/demo.png');
const img2 = require('./imgs/second_floor.png');

// DEBUGGING; 
// fake json data w/ location info; 
const data = [{id: 1, x: 30, y: 40}]; // the slot machine is at (30 meters, 40 meters) in the room

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // coordinates of the markers; for now there are only two
            start: [0, 0],
            dest: [0, 0],
            // size of img
            sizeOfImg: [0, 0], // [width, height]
        };

        this.onImgLoad = this.onImgLoad.bind(this);
        this.move = this.move.bind(this);
        this.meterToPx = this.meterToPx.bind(this);
    };

    // detect the size of the image & load the markers 
    onImgLoad({target:img}){
        this.setState({ sizeOfImg: [img.offsetWidth, img.offsetHeight] }, () => {
            // fallback
            // need to load the markers after the API call in the future
            this.setState({start: [0, 0]});
            // loading the markers based on the API location information at the start
            // and change the location to pixels accordingly 
            this.setState({dest: [this.meterToPx(data[0].x), this.meterToPx(data[0].y)]});
            
            console.log('w:' + this.state.sizeOfImg[0] + 'px', 'h:' + this.state.sizeOfImg[1] + 'px');
        });
    }

    meterToPx = (valuInMeter) => {
        // meter to px
        const changeUnits = scaleLinear()
            .domain([0, 80]) //meter`
            .range( [0, this.state.sizeOfImg[0]] ); //px
        return changeUnits(valuInMeter);
    }


    // for DEBUGGING purposes; see if the marker can move dynamically  
    move(){
        data[0].x += 5;
        data[0].y += 10;

        this.setState({
            // with constraints to the max size of the img
            dest: [Math.min(this.state.sizeOfImg[0], Math.max(0, this.meterToPx(data[0].x))), 
                Math.min(this.state.sizeOfImg[1], Math.max(0, this.meterToPx(data[0].y)))] 
        });

        console.log('destination x: ' + this.state.dest[0] + 'px, y: ' + this.state.dest[1] + 'px');
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
                    <span className="marker" style = {{ left: `${this.state.dest[0]}px`, top: `${this.state.dest[1]}px`, color: 'blue' }}>
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