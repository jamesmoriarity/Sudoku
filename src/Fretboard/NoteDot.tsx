import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap} from "gsap"
import GuitarTrainerSettings from "../GuitarTrainerSettings"
import Guitar from "../Utils/Guitar"
import Position from "../Position"
import Question from "../Question"


export class NoteDotProps {
  static animationInSeconds:number = 1
  question:Question
  static radius:number = 100
  onAnimationComplete:Function
  x:number
  y:number
  constructor(question:Question, onAnimationComplete:Function){
    this.question = question
    this.onAnimationComplete = onAnimationComplete
    this.x = FretElm.fretXPositions[this.question.position.fretIndex] // are there other ways to position it?
    this.y = GuitarStringElm.getStringY(this.question!.position.stringIndex)

  }
}

export class NoteDot extends React.PureComponent {
  props!:NoteDotProps
  dotRef:SVGSVGElement | null
  timeline:TimelineLite
  constructor(props:NoteDotProps){
    super(props)
    console.log("constructor")
    this.dotRef = null
    this.timeline  = gsap.timeline({paused:true})
  }
  resetTimeline = () => {
    this.timeline.pause()
    this.timeline.clear()
    let move:TweenLite = gsap.to(this.dotRef, {x: this.props.x, y: this.props.y, duration:NoteDotProps.animationInSeconds }) 
    this.timeline.eventCallback("onComplete", this.onAnimationComplete)
    this.timeline.add(move)
  }
  getLabel = () => {
    if(this.props.question.answered){
      let label:string = this.props.question.answer
      return <text x="0" y="0" width="100%">{label}</text>
    }
    return null
  }
  getCircleClassName = () => {
    let className:string = ""
    if(this.props.question.answered){
      className = (this.props.question.answeredCorrectly) ? "answer-correct" : "answer-incorrect"
    }
    return className 
  }
  getBackgroundShape = () => {
    return <circle className={this.getCircleClassName()} cx="0" cy="0" r={NoteDotProps.radius}></circle>
  }  
  setDotRef = (e:SVGSVGElement) => this.dotRef = e
  render(){
    return  <g ref={this.setDotRef} className="noteDot"> 
              {this.getBackgroundShape()}
              {this.getLabel()}
            </g>
  }
  animateToPosition = () => {
    this.resetTimeline()
    this.timeline.restart()
  }
  onAnimationComplete = () => {
    console.log("onAnimationComplete")
    this.props.onAnimationComplete()
  }
  stopAnimation = () => {
    this.timeline.pause()
  }
  componentDidMount = () => {
    this.animateToPosition()
  }
  componentDidUpdate = (prevProps:NoteDotProps) => {
    let currentPosition:Position = this.props.question.position
    let newPosition:Position = prevProps.question.position
    if( !currentPosition.equals(newPosition) ) 
      this.animateToPosition()
  }
}
export default NoteDot
