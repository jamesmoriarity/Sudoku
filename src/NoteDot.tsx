import React, { RefCallback } from "react"
import FretElm from "./Fretboard/FretElm"
import GuitarStringElm from "./Fretboard/GuitarStringElm"
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
  pct:number
  constructor(fIndex:number, sIndex:number, pct:number = 0, showLabel:boolean = false){
    this.x = FretElm.fretXPositions[fIndex] // are there other ways to position it?
    this.y = GuitarStringElm.getStringY(sIndex)
    this.noteName = GuitarTrainerSettings.guitar.getNoteNameForPosition(sIndex, fIndex)
    this.fretIndex = fIndex
    this.stringIndex = sIndex
    this.pct = pct
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
      let label:string = this.props.noteName
      if(this.props.showLabel)
        label = label.concat(":" + this.props.pct)
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
