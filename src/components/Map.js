import React from "react";
import { useState } from 'react';
import '../css/Map.css';


class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // imgs of the map
            img1: require('./imgs/demo.png'),
            img2: require('./imgs/second_floor.png'),
            // coordinates of the markers
            start: [0, 0],
            des: [0, 0],
        }
    };

    render(){
        return(
            <div className="map" style={{position: 'relative'}}>
                <span className="marker" style = {{ top: `${this.state.start[1]}%`, left: `${this.state.start[0]}%`, backgroundColor: 'red'}}></span>
                <span className="marker" style = {{ top: `${this.state.dest[1]}%`, left: `${this.state.dest[0]}%`, backgroundColor: 'blue' }}></span>

                <img className ="floor-img" src={this.props.toggled ? this.state.img1 : this.state.img2}/>
            </div>
        )
    }
}

export default Map