import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap} from "gsap"
import GuitarTrainerSettings from "../GuitarTrainerSettings"
import Guitar from "../Utils/Guitar"
import Position from "../Position"


export class NoteDotProps {
  position:Position
  x:number
  y:number
  noteName:string
  answeredCorrectly:boolean | undefined
  constructor(position:Position, noteName:string, answeredCorrectly:boolean | undefined = undefined){
    this.position = position
    this.x = FretElm.fretXPositions[position.fretIndex] // are there other ways to position it?
    this.y = GuitarStringElm.getStringY(position.stringIndex)
    this.noteName = noteName
    this.answeredCorrectly = undefined
  }
}

export class NoteDot extends React.PureComponent {
  props!:NoteDotProps
  constructor(props:NoteDotProps){
    super(props)
  }
  getLabel = () => {
    if(this.props.answeredCorrectly != undefined){
      let label:string = this.props.noteName
      return <text x="0" y="0" width="100%">{label}</text>
    }
    return null
  }
  getCircleClassName = () => {
    let className:string = ""
    if(this.props.answeredCorrectly != undefined){
      className = (this.props.answeredCorrectly) ? "answer-correct" : "answer-incorrect"
    }
    return className 
  }
  getBackgroundShape = () => {
    return <circle className={this.getCircleClassName()} cx="0" cy="0" r="100"></circle>
  }
  render(){
    return  <svg className="noteDot" y={this.props.y} x={this.props.x}> 
              {this.getBackgroundShape()}
              {this.getLabel()}
            </svg>
  }
}
export default NoteDot
