import React from "react"
import GuitarTrainerSettings from "./GuitarTrainerSettings"
import MathUtils from "./MathUtils"

export class NoteChoiceButtonProps{
  onClickHandler:Function; noteName:string; index:number
  constructor(onClickHandler:Function, noteName:string, index:number){
    this.onClickHandler = onClickHandler
    this.noteName = noteName
    this.index = index
  }
}
export class NoteChoiceButton extends React.PureComponent{
  props!:NoteChoiceButtonProps
  constructor(props:any){
    super(props)
  }
  onClick = () => {
    this.props.onClickHandler(this.props.noteName)
  }
  render(){
    let isSharp:boolean = this.props.noteName.includes("#")
    // cx="1300px" cy="2100px" r="1000px"
    let centerX:number = 1600
    let centerY:number = 1600
    let coordinates = MathUtils.getPointOnCircle(centerX, centerY, 1250, (this.props.index * 30) - 90)
    let buttonFill = "clear"
    let color:string = "#888" 
    //GuitarTrainerSettings.music.getColorForNote(this.props.noteName)
    return <svg className="noteButton" x={Math.floor(coordinates.x)} y={Math.floor(coordinates.y)} onClick={this.onClick}>
              <text className="label" fill={color}>
                {this.props.noteName}
              </text>
              <rect className="back"/>
            </svg>
  }
}

export class NoteChoicesProps{
  onClickHandler:Function
  constructor(onClickHandler:Function){
    this.onClickHandler = onClickHandler
  }
}

export class NoteChoices extends React.PureComponent{
  props!:NoteChoicesProps
  constructor(props:NoteChoicesProps){
    super(props)
  }
  onClick = (noteName:string) => {
    this.props.onClickHandler(noteName)
  }
  buildButtons = () =>{
    let buttons:JSX.Element[] = []
    let notes = GuitarTrainerSettings.music.sharpNoteNames
    notes.map((noteName:string, index:number) => {
      let button:JSX.Element = <NoteChoiceButton key={"button" + index} {...new NoteChoiceButtonProps(this.onClick, noteName, index)} />
      buttons.push(button)
    })
    return buttons
  }
  render(){
    return  <g className="noteChoices">
              <circle className="outer-ring"/>
              {this.buildButtons()}
            </g>
  }
}

export default NoteChoices
