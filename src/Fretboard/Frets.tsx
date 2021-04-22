import React from "react"
import SettingsProps from "../SettingsProps"
import FretElm, { FretElmProps } from "./FretElm"

class Frets extends React.Component {
  static fretNum:number = 13
  props!:SettingsProps
 	constructor(props:SettingsProps){
 		super(props)
 	}
  getActiveFrets = () => {
    return this.props.get().activeFrets
  }
  getFrets = () => {
    let frets = []
    for(let i:number = 0; i < Frets.fretNum; i++){
      let isActive:boolean = ( this.getActiveFrets().get(i) == true)
      let props:FretElmProps = new FretElmProps(i, isActive)
      frets.push( <FretElm {...props} key={"fret" + i}/> )
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
