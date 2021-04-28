import React from "react"
import ExerciseSettings from "../Exercises/Settings/ExerciseSettings"
import SettingsProxy from "../SettingsProxy"
import FretElm, { FretElmProps } from "./FretElm"

class Frets extends React.Component {
  static fretNum:number = 13
  props!:ExerciseSettings
 	constructor(props:ExerciseSettings){
 		super(props)
 	}
  getActiveFrets = () => {
    return this.props.activeFrets
  }
  getFrets = () => {
    let frets = []
    let fretMap:Map<number,boolean> = this.getActiveFrets()
    for(let i:number = 0; i < Frets.fretNum; i++){
      let isActive:boolean = fretMap.get(i) ?? false
      frets.push( <FretElm {...new FretElmProps(i, isActive)} key={"fret" + i}/> )
    }
    return frets
  }
  render(){
    return  <g className="frets">
              <linearGradient id="fretGradient">
                <stop offset="5%" stopColor="#444"/>
                <stop offset="50%" stopColor="#aaa"/>
                <stop offset="95%" stopColor="#444"/>
              </linearGradient>
              {this.getFrets()}
            </g>
  }
}
export default Frets
