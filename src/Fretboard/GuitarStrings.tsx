import React from "react"
import GuitarStringElm, { GuitarStringElmProps } from "./GuitarStringElm"

export class GuitarStringsProps{
  activeStrings:Map<number, boolean>
  constructor(activeStrings:Map<number, boolean>,){
    this.activeStrings = activeStrings
  }
}

class GuitarStrings extends React.Component {
  props!:GuitarStringsProps
 	constructor(props:GuitarStringsProps){
 		super(props)
 	}
  getGuitarStrings = () => {
    let guitarStrings = []
    for(let i:number = 0; i < 6; i++){
      let isActive:boolean | undefined = this.props.activeStrings.get(i)
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
