import React from "react"
import ExerciseSettings from "../Exercises/Settings/ExerciseSettings"
import SettingsProxy from "../SettingsProxy"
import SettingsProps from "../SettingsProxy"
import GuitarStringElm, { GuitarStringElmProps } from "./GuitarStringElm"

class GuitarStrings extends React.Component {
  props!:ExerciseSettings
 	constructor(props:ExerciseSettings){
 		super(props)
 	}
  getActiveStrings = () => {
    return this.props.activeStrings
  }
  getGuitarStrings = () => {
    let guitarStrings = []
    let activeStrings:Map<number,boolean> = this.getActiveStrings()
    for(let i:number = 0; i < 6; i++){
      let isActive:boolean = activeStrings.get(i) ?? false
      if(isActive == undefined){ isActive = false}
      let gProps:GuitarStringElmProps = new GuitarStringElmProps(i, isActive)
      let e = <GuitarStringElm {...gProps} key={"string" + i}/>
      guitarStrings.push( e )
    }
    return guitarStrings
  }
  render(){
    return  <g className="guitarStrings">
              <linearGradient id="stringPattern">
                <stop offset="5%" stopColor="#222"/>
                <stop offset="50%" stopColor="#666"/>
                <stop offset="95%" stopColor="#222"/>
              </linearGradient>
              {this.getGuitarStrings()}
            </g>
  }
}
export default GuitarStrings
