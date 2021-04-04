import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap} from "gsap"


export class NoteDotProps {
  cx:number
  cy:number
  noteName:string
  answerTime:number
  onClickHandler:Function
  fretIndex:number
  stringIndex:number
  lastCX:number
  lastCY:number
  motionTime:number
  constructor(fNum:number, sNum:number, onClickHandler:Function, noteName:string, answerTime:number, lastCX:number, lastCY:number, motionTime:number){
    this.cx = FretElm.fretXPositions[fNum] // are there other ways to position it?
    this.cy = GuitarStringElm.getStringY(sNum)
    this.onClickHandler = onClickHandler
    this.noteName = noteName
    this.answerTime = answerTime
    this.fretIndex = fNum
    this.stringIndex = sNum
    this.lastCX = lastCX
    this.lastCY = lastCY
    this.motionTime  = motionTime
  }
}

export class NoteDot extends React.Component {
  props!:NoteDotProps
  circleRef:SVGCircleElement | null
  tl:TimelineLite
  constructor(props:NoteDotProps){
    super(props)
    this.circleRef = null
    this.tl = gsap.timeline({paused:true})
  }

  onClick = (event:React.MouseEvent<SVGGElement, MouseEvent>) => {
    this.props.onClickHandler()
  }
  render(){
    return  <circle strokeDasharray="565.48" strokeDashoffset="0" className="noteDot" 
                    ref={this.setCircleRef} onClick={this.onClick} cy={this.props.lastCY} cx={this.props.lastCX}/>
  }
  setCircleRef = (e:SVGCircleElement) => {
    this.circleRef = e
  }
  componentDidMount(){
    let move:TweenLite = gsap.to(this.circleRef, {duration:this.props.motionTime, cx:this.props.cx , cy:this.props.cy })
    let turnYellow:TweenLite = gsap.to(this.circleRef, {duration:this.props.answerTime * .25, fill:"orange"})
    let turnRed:TweenLite = gsap.to(this.circleRef, {duration:this.props.answerTime * .25, fill:"red"})
    this.tl.add(move)
    this.tl.add(turnYellow, this.props.answerTime * .5)
    this.tl.add(turnRed, this.props.answerTime * .75)
    this.tl.play()
}

}
export default NoteDot
