import React from "react"
import GuitarStringElm from "./GuitarStringElm"

class GuitarStrings extends React.Component {
 	constructor(props:any){
 		super(props)
 	}
  getGuitarStrings = () => {
    let guitarStrings = []
    for(let i:number = 0; i < 6; i++){
      let e = <GuitarStringElm {...{stringIndex:i}} key={"string" + i}/>
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
