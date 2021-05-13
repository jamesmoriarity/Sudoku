import React from "react"
import ExerciseSettings from "../Exercises/Settings/ExerciseSettings"
import SettingsProxy from "../SettingsProxy"
import SettingsProps from "../SettingsProxy"
import GuitarStringElm, { GuitarStringElmProps } from "./GuitarStringElm"

export class GuitarStringsProps{
  strings:Map<number, boolean>
  constructor(strings:Map<number, boolean>){
    this.strings = strings
  }
} 
export class GuitarStrings extends React.Component {
  props!:GuitarStringsProps
 	constructor(props:GuitarStringsProps){
 		super(props)
 	}
  getStringsMap = () => {
    return this.props.strings
  }
  getGuitarStringElms = ():JSX.Element[] => {
    return [...this.getStringsMap().values()].map(this.buildGuitarStringElm)
  }
  buildGuitarStringElm = (isActive:boolean, stringIndex:number) => {
    let gProps:GuitarStringElmProps = new GuitarStringElmProps(stringIndex, isActive)
    return <GuitarStringElm {...gProps} key={"string" + stringIndex}/>
  }
  render(){
    return  <>
              <linearGradient id="stringPattern">
                <stop offset="5%" stopColor="#222"/>
                <stop offset="50%" stopColor="#666"/>
                <stop offset="95%" stopColor="#222"/>
              </linearGradient>
              <g className="guitarStrings">
                {this.getGuitarStringElms()}
              </g>
            </>
  }
}
export default GuitarStrings
