import React, { RefCallback } from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"
import {gsap, Power3} from "gsap"
import GuitarTrainerSettings from "../GuitarTrainerSettings"
import Guitar from "../Utils/Guitar"
import Position from "../Position"
import Question from "../Question"
import Coordinates from "../Coordinates"
import NoteDot, { NoteDotProps } from "./NoteDot"

export class NoteDotPlayerProps{
    static animationInSeconds:number = 1
    static fadeOutDurationInSeconds:number = 0.2
    static radius:number = 90
    stringIndex:number
    noteName:string
    isPaused:boolean
    constructor(stringIndex:number, noteName:string, isPaused:boolean){
      this.stringIndex = stringIndex
      this.noteName = noteName
      this.isPaused = isPaused
    }
  }

export class NoteDotPlayerState{
  noteName:string
  isPaused:boolean
  constructor(isPaused:boolean){
    this.noteName = ""
    this.isPaused = isPaused
  }
}

export class NoteDotPlayer extends React.PureComponent{
  props!:NoteDotPlayerProps
  state:NoteDotPlayerState
  static getIDFromIndex(index:number){
    return "player-notedot-" + index
  }
  constructor(props:NoteDotPlayerProps){
    super(props)
    this.state = new NoteDotPlayerState(this.props.isPaused)
  }
  getClass = () => {
    // return (this.state.isPaused) ? "paused" : "playing"
    return "playing"
  }
  componentDidUpdate = (oldProps:NoteDotPlayerProps) => {
    if(oldProps.isPaused != this.props.isPaused){
      this.setState({isPaused:this.props.isPaused})
    }
  }
  render(){
    return  <g className="player-notedot" id={NoteDotPlayer.getIDFromIndex(this.props.stringIndex)}> 
              <circle className={this.getClass()} cx="0" cy="0" r={NoteDotPlayerProps.radius}></circle>
              <text x="0" y="0" width="100%">{this.props.noteName}</text>
            </g>
  }
}
export default NoteDotPlayer
