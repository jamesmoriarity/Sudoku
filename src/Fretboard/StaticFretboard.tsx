import React, { Children } from "react"
import Neck from "./Neck"
import Frets from "./Frets"
import GuitarStrings from "./GuitarStrings"
import FretboardDots from "./FretboardDots"

export class StaticFretboardProps{
  hasStarted:boolean
  children!:JSX.Element[]
  constructor(isPaused:boolean){
    this.hasStarted = isPaused
  }
}

export class StaticFretboard extends React.PureComponent{
  props!:StaticFretboardProps
 	constructor(props:StaticFretboardProps){
 		super(props)
 	}
  getOpacity = () => {
    return (this.props.hasStarted) ? 0.25 : 1
  }
  render(){
    return  <g className="staticFretboard" opacity={this.getOpacity()}>
              <Neck/>
              <FretboardDots/>
              {this.props.children}
            </g>
  }
}
export default StaticFretboard
