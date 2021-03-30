import React from "react"
import FretElm from "./FretElm"

class Frets extends React.Component {
  frets:JSX.Element[]
  static fretNum:number = 13
 	constructor(props:any){
 		super(props)
    this.frets = this.makeFrets()
 	}
  makeFrets = () => {
    let frets = []
    for(let i:number = 0; i < Frets.fretNum; i++){
      let e = <FretElm {...{fretIndex:i}} key={"fret" + i}/>
      frets.push( e )
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
              {this.frets}
            </g>
  }
}
export default Frets
