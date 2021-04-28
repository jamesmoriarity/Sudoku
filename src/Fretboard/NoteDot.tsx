import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap} from "gsap"
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
    console.log("constructor")
    this.dotRef = null
    this.timeline  = gsap.timeline({paused:true})
  }
  resetTimeline = (oldCoordinates:Coordinates) => {
    // create array of old coordinates and currentcoordinates with motionpath
    this.timeline.pause()
    this.timeline.clear()
    let move:TweenLite = gsap.to(this.dotRef, {x: this.props.coordinates.x, y: this.props.coordinates.y, duration:NoteDotProps.animationInSeconds }) 
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
  animateToPosition = (oldCoordinates:Coordinates) => {
    this.resetTimeline(oldCoordinates)
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
    this.animateToPosition(new Coordinates(0,0))
  }
  componentDidUpdate = (prevProps:NoteDotProps) => {
    let newPosition:Position = this.props.question.position
    let oldPosition:Position = prevProps.question.position
    if( !newPosition.equals(oldPosition) ) 
      this.animateToPosition(prevProps.coordinates)
  }
}
export default NoteDot
