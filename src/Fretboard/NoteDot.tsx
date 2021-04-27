import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap} from "gsap"
import GuitarTrainerSettings from "../GuitarTrainerSettings"
import Guitar from "../Utils/Guitar"
import Position from "../Position"
import Question from "../Question"


export class NoteDotProps {
  question:Question
  x:number
  y:number
  static radius:number = 100
  constructor(question:Question){
    this.question = question
    this.x = FretElm.fretXPositions[question.position.fretIndex] // are there other ways to position it?
    this.y = GuitarStringElm.getStringY(question.position.stringIndex)
  }
}

export class NoteDot extends React.Component {
  props!:NoteDotProps
  x:number
  y:number
  constructor(props:NoteDotProps){
    super(props)
    this.x = this.props.x
    this.y = this.props.y
  }
  getLabel = () => {
    if(this.props.question.answeredCorrectly != undefined){
      let label:string = this.props.question.answer
      return <text x="0" y="0" width="100%">{label}</text>
    }
    return null
  }
  getCircleClassName = () => {
    let className:string = ""
    if(this.props.question.answeredCorrectly != undefined){
      className = (this.props.question.answeredCorrectly) ? "answer-correct" : "answer-incorrect"
    }
    return className 
  }
  getBackgroundShape = () => {
    return <circle className={this.getCircleClassName()} cx="0" cy="0" r={NoteDotProps.radius}></circle>
  }
  render(){
    return  <svg className="noteDot" y={this.y} x={this.x}> 
              {this.getBackgroundShape()}
              {this.getLabel()}
            </svg>
  }
}
export default NoteDot
