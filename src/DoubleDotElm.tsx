import React from "react"

class DoubleDotElm extends React.Component {
  cx:number
  static cxPositions: number[] = [6964, 10634]
  static cyPositions: number[] = [350, 850]

  constructor(props:any){
    super(props)
    this.cx = DoubleDotElm.cxPositions[props.dotIndex]
  }

  render(){
    return  <g className="dot">
              <circle cy={DoubleDotElm.cyPositions[0]} cx={this.cx} r="65"/>
              <circle cy={DoubleDotElm.cyPositions[1]} cx={this.cx} r="65"/>
            </g>
    }

}
export default DoubleDotElm
