import React from "react";

export class Controls extends React.Component{
    controlsRef:SVGElement | null
    constructor(props:any){
        super(props)
        this.controlsRef = null
    }
    setControlsRef = (e:SVGSVGElement) => this.controlsRef = e
    render(){
        return  <svg ref={this.setControlsRef} className="controls" viewBox="0 0 3200 3200" x="2100px" y="1400px" width="3200px" height="3200px" >
                    { this.props.children }
                </svg>
    }
}

export default Controls