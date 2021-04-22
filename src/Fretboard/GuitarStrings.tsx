import React from "react"
import SettingsProps from "../SettingsProps"
import GuitarStringElm, { GuitarStringElmProps } from "./GuitarStringElm"

class GuitarStrings extends React.Component {
  props!:SettingsProps
 	constructor(props:SettingsProps){
 		super(props)
 	}
  getActiveStrings = () => {
    return this.props.get().activeStrings
  }
  getGuitarStrings = () => {
    let guitarStrings = []
    for(let i:number = 0; i < 6; i++){
      let isActive:boolean | undefined = this.getActiveStrings().get(i)
      if(isActive == undefined){ isActive = false}
      let props:GuitarStringElmProps = new GuitarStringElmProps(i, isActive)
      let e = <GuitarStringElm {...props} key={"string" + i}/>
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
