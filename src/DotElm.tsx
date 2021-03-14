import React from "react"

class DotElm extends React.Component {
  cx:number
  static cxPositions:number[] = [1961, 3308, 4507, 5576, 9405, 8132, 8805, 9940]

  constructor(props:any){
    super(props)
    this.cx = DotElm.cxPositions[props.dotIndex]
  }

  render(){
    return  <g className="dot">
              <circle cy="600.0" cx={this.cx} r="65"/>
            </g>
    }

}
export default DotElm
