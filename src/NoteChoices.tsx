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
    let x:number = (300 + (330 * this.props.index))
    let y:number = (isSharp) ? 1200 : 1420

    let centerX:number = 1000
    let centerY:number = 2000
    let coordinates = MathUtils.getPointOnCircle(centerX, centerY, 900, (this.props.index * 30))
    if(this.props.index > 4){ x += 330}
    if(this.props.index > 11){ x += 330}
    if(this.props.index > 16){ x += 330}
    let buttonFill = (isSharp) ? "#666":"#aaa"
    return <svg className="newButton" x={Math.floor(coordinates.x)} y={Math.floor(coordinates.y)} onClick={this.onClick}>
              <rect fill={buttonFill} height="200px" width="600px"/>
              <text fontSize="200" y="120" x="300"
                fill="#fff"
                textAnchor="middle"
                alignmentBaseline="middle">
                {this.props.noteName}
              </text>
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
    let notes = GuitarTrainerSettings.music.noteNames
    notes = notes.concat(GuitarTrainerSettings.music.noteNames)
    notes.map((noteName:string, index:number) => {
      let button:JSX.Element = <NoteChoiceButton key={"button" + index} {...new NoteChoiceButtonProps(this.onClick, noteName, index)} />
      buttons.push(button)
    })
    return buttons
  }
  render(){
    return  <g className="noteChoices">
              <circle cx="1300px" cy="2100px" r="1000px" fill="grey"/>
              {this.buildButtons()}
            </g>
  }
}

export default NoteChoices
