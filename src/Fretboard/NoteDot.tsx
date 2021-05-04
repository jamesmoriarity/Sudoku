import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap, Power3} from "gsap"
import GuitarTrainerSettings from "../GuitarTrainerSettings"
import Guitar from "../Utils/Guitar"
import Position from "../Position"
import Question from "../Question"
import Coordinates from "../Coordinates"


export class NoteDotProps {
  static animationInSeconds:number = 1
  question:Question
  static radius:number = 100
  onAnimationComplete:Function
  coordinates:Coordinates
  constructor(question:Question, onAnimationComplete:Function){
    this.question = question
    this.onAnimationComplete = onAnimationComplete
    let x:number = FretElm.fretXPositions[this.question.position.fretIndex] // are there other ways to position it?
    let y:number = GuitarStringElm.getStringY(this.question!.position.stringIndex)
    this.coordinates = new Coordinates(x,y)
  }
}

export class NoteDot extends React.PureComponent {
  props!:NoteDotProps
  dotRef:SVGSVGElement | null
  timeline:TimelineLite
  constructor(props:NoteDotProps){
    super(props)
    this.dotRef = null
    this.timeline = gsap.timeline({paused:true})
  }
  resetTimeLine = () => {
    this.timeline?.kill()
    this.timeline = this.getSliderTimeline()
  }
  getSliderTimeline = () => {
    let timeline:TimelineLite  = gsap.timeline({paused:true})
    let duration:number = NoteDotProps.animationInSeconds
    let move:TweenLite = gsap.to(this.dotRef, {opacity:1, x: this.props.coordinates.x, y: this.props.coordinates.y, duration: duration, ease:Power3.easeOut }) 
    timeline.eventCallback("onComplete", this.onAnimationComplete)
    timeline.add(move)
    return timeline
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
  getRadius = () => {
    return NoteDotProps.radius
  }
  getBackgroundShape = () => {
    return <circle className={this.getCircleClassName()} cx="0" cy="0" r={this.getRadius()}></circle>
  }  
  setDotRef = (e:SVGSVGElement) => this.dotRef = e
  getClassName = () => {
    return "noteDot"
  }
  render(){
    return  <g ref={this.setDotRef} className={this.getClassName()}> 
              {this.getBackgroundShape()}
              {this.getLabel()}
            </g>
  }
  animateToPosition = () => {
    this.resetTimeLine()
    this.timeline.restart()
  }
  onAnimationComplete = () => {
    this.props.onAnimationComplete()
  }
  stopAnimation = () => {
    this.timeline.pause()
  }
  componentDidMount = () => {
    this.animateToPosition()
  }
  componentDidUpdate = (prevProps:NoteDotProps) => {
    let newPosition:Position = this.props.question.position
    let oldPosition:Position = prevProps.question.position
    this.animateToPosition()
  }
}
export default NoteDot
