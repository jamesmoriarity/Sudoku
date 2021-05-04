import React from "react"
import ExerciseSettings from "../Exercises/Settings/ExerciseSettings"
import Settings from "../Exercises/Settings/Settings"
import FretElm, { FretElmProps } from "./FretElm"

export class FretsProps{
  frets:Map<number, boolean>
  constructor(frets:Map<number, boolean>){
    this.frets = frets
  }
}
export class Frets extends React.Component {
  static fretNum:number = 13
  props!:FretsProps
 	constructor(props:FretsProps){
 		super(props)
 	}
  getFretsMap = ():Map<number, boolean> => {
    return this.props.frets
  }
  getFrets = () => {
    let frets = []
    let fretMap:Map<number,boolean> = this.getFretsMap()
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
