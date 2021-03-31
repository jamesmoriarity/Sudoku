import React from "react"
import FretElm, { FretElmProps } from "./FretElm"

export class FretsProps{
  activeFrets:Map<number, boolean>
  onFretClickHandler:Function
  constructor(activeFrets:Map<number, boolean>, onFretClickHandler:Function){
    this.activeFrets = activeFrets
    this.onFretClickHandler = onFretClickHandler
  }
}

class Frets extends React.Component {

  static fretNum:number = 13
  props!:FretsProps
 	constructor(props:FretsProps){
 		super(props)
 	}
  getFrets = () => {
    let frets = []
    for(let i:number = 0; i < Frets.fretNum; i++){
      let activeFret:boolean | undefined = this.props.activeFrets.get(i)
      let isActive:boolean = ( activeFret == undefined) ? false : activeFret
      let props:FretElmProps = new FretElmProps(i, isActive, this.props.onFretClickHandler)
      let e = <FretElm {...props} key={"fret" + i}/>
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
              {this.getFrets()}
            </g>
  }
}
export default Frets
