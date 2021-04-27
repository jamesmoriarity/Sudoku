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
  question:Question | undefined
  static radius:number = 100
  onAnimationComplete:Function
  x:number
  y:number
  constructor(question:Question | undefined, onAnimationComplete:Function){
    this.question = question
    this.onAnimationComplete = onAnimationComplete
    if(this.question != undefined){
      this.x = FretElm.fretXPositions[this.question.position.fretIndex] // are there other ways to position it?
      this.y = GuitarStringElm.getStringY(this.question!.position.stringIndex)
    }
    else{
      this.x = 0
      this.y = 0
    }
  }
}

export class NoteDot extends React.PureComponent {
  props!:NoteDotProps
  dotRef:SVGSVGElement | null
  constructor(props:NoteDotProps){
    super(props)
    console.log("constructor")
    this.dotRef = null
  }
  getLabel = () => {
    if(this.props.question?.answeredCorrectly != undefined){
      let label:string = this.props.question.answer
      return <text x="0" y="0" width="100%">{label}</text>
    }
    return null
  }
  getCircleClassName = () => {
    let className:string = ""
    if(this.props.question?.answeredCorrectly != undefined){
      className = (this.props.question.answeredCorrectly) ? "answer-correct" : "answer-incorrect"
    }
    return className 
  }
  getBackgroundShape = () => {
    return <circle className={this.getCircleClassName()} cx="0" cy="0" r={NoteDotProps.radius}></circle>
  }  
  setDotRef = (e:SVGSVGElement) => this.dotRef = e
  render(){
    if(this.props.question == undefined){
      return <g className="noteDot"></g>
    }
    return  <g ref={this.setDotRef} className="noteDot"> 
              {this.getBackgroundShape()}
              {this.getLabel()}
            </g>
  }
  animateToPosition = () => {
    let tl:TimelineLite = gsap.timeline({paused:true})
    let move:TweenLite = gsap.to(this.dotRef, {x: this.props.x, y: this.props.y, duration:NoteDotProps.animationInSeconds })  // add callback
    tl.add(move)
    tl.eventCallback("onComplete", this.onAnimationComplete)
    tl.play()
  }
  onAnimationComplete = () => {
    console.log("onAnimationComplete")
    this.props.onAnimationComplete()
  }
  componentDidUpdate = (prevProps:NoteDotProps) => {
    if( (prevProps.x != this.props.x || prevProps.y != this.props.y ) && this.props.question != undefined ) 
      this.animateToPosition()
  }
}
export default NoteDot
