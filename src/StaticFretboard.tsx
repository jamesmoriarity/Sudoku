import React from "react"
import FretboardElm from "./FretBoardElm"
import Frets from "./Frets"
import GuitarStrings from "./GuitarStrings"
import FretboardDots from "./FretboardDots"

export class StaticFretboard extends React.PureComponent{
 	constructor(props:any){
 		super(props)
 	}
  render(){
    return  <g className="staticFretboard">
              <FretboardElm/>
              <FretboardDots/>
              <Frets/>
              <GuitarStrings/>
            </g>
  }
}
export default StaticFretboard
