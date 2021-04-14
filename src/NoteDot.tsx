import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap} from "gsap"
import GuitarTrainerSettings from "./GuitarTrainerSettings"


export class NoteDotProps {
  x:number
  y:number
  noteName:string
  fretIndex:number
  stringIndex:number
  questionStartTime:number
  showLabel:boolean
  answeredCorrectly:boolean | undefined
  constructor(fNum:number, sNum:number, showLabel:boolean = false){
    this.x = FretElm.fretXPositions[fNum] // are there other ways to position it?
    this.y = GuitarStringElm.getStringY(sNum)
    this.noteName = GuitarTrainerSettings.guitar.getNoteNameForPosition(sNum, fNum)
    this.fretIndex = fNum
    this.stringIndex = sNum
    this.questionStartTime = 0;
    this.showLabel = showLabel
    this.answeredCorrectly = undefined
  }
}


export class NoteDot extends React.PureComponent {
  props!:NoteDotProps
  constructor(props:NoteDotProps){
    super(props)
  }
  getLabel = () => {
    if(this.props.showLabel || (this.props.answeredCorrectly != undefined)){
      return <text x="0" y="0" width="100%">{this.props.noteName}</text>
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
    if(this.props.showLabel){
      return <rect className="note-dot-label" x="0" y="-100" height="200" width="200"/>
    }
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
