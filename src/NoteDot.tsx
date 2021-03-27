import React from "react"
import FretElm from "./FretElm"
import GuitarStringElm from "./GuitarStringElm"


export class NoteDotProps {
  cx:number
  cy:number
  noteName:string
  answerTime:number
  onClickHandler:Function
  fretIndex:number
  stringIndex:number
  constructor(fNum:number, sNum:number, onClickHandler:Function, noteName:string, answerTime:number){
    this.cx = FretElm.fretXPositions[fNum] // are there other ways to position it?
    this.cy = GuitarStringElm.getStringY(sNum)
    this.onClickHandler = onClickHandler
    this.noteName = noteName
    this.answerTime = answerTime
    this.fretIndex = fNum
    this.stringIndex = sNum
  }
}

export class NoteDot extends React.Component {
  props!:NoteDotProps
  constructor(props:NoteDotProps){
    super(props)
  }

  onClick = (event:React.MouseEvent<SVGGElement, MouseEvent>) => {
    this.props.onClickHandler()
  }
  render(){
    return  <circle className="noteDot" onClick={this.onClick} cy={this.props.cy} cx={this.props.cx}/>
  }

}
export default NoteDot
