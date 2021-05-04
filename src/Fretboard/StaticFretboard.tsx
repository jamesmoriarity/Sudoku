import React, { Children } from "react"
import Neck from "./Neck"
import Frets from "./Frets"
import GuitarStrings from "./GuitarStrings"
import FretboardDots from "./FretboardDots"

export class StaticFretboardProps{
  isPaused:boolean
  children!:JSX.Element[]
  constructor(isPaused:boolean){
    this.isPaused = isPaused
  }
}

export class StaticFretboard extends React.PureComponent{
  props!:StaticFretboardProps
 	constructor(props:StaticFretboardProps){
 		super(props)
 	}
  getOpacity = () => {
    console.log("isPaused:" + this.props.isPaused)
    return (this.props.isPaused) ? 1 : 0.25
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
