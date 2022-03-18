import React from "react";
import '../css/Map.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// imgs of the map
const img1 = require('./imgs/demo.png');
const img2 = require('./imgs/second_floor.png');

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
    };

    // detect the size of the image
    onImgLoad({target:img}){
        this.setState({sizeOfImg: {w: img.offsetWidth, h: img.offsetHeight}});
        console.log('w:' + img.offsetWidth + 'px', 'h:' + img.offsetHeight + 'px');
    }

    render(){
        return(
            <div className="map" style={{position: 'relative'}}>

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
        )
    }
}

export default Map