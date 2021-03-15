import React from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"


export class NoteDotProps {
  fretNumber:number
  stringNumber:number
  constructor(fNum:number, sNum:number){
    this.fretNumber = fNum
    this.stringNumber = sNum
  }
}

export class NoteDot extends React.Component {
  static r:number = 65
  cx:number
  cy:number

  constructor(props:NoteDotProps){
    super(props)
    this.cx = FretElm.fretXPositions[props.fretNumber] - NoteDot.r
    this.cy = GuitarStringElm.getStringY(props.stringNumber)
  }

  render(){
    return  <g className="noteDot">
              <circle cy={this.cy} cx={this.cx} r={NoteDot.r}/>
            </g>
    }

}
export default NoteDot
