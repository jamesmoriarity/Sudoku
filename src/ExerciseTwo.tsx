import React, { RefObject } from "react"
import {NoteDotProps} from "./NoteDot"
import StaticFretboard from "./StaticFretboard"
import NoteDotCollection, { NoteDotCollectionProps} from "./NoteDotCollection"
import { NoteChoices, NoteChoicesProps } from "./NoteChoices"
import GuitarTrainerSettings from "./GuitarTrainerSettings"

export class ExerciseTwoState{
  noteDotPropsArray:NoteDotProps[]
  constructor(noteDotsProps:NoteDotProps[]){
    this.noteDotPropsArray = noteDotsProps
  }
}

export class ExerciseTwo extends React.Component {
  state:ExerciseTwoState
  noteDotsCollectionRef:RefObject<NoteDotCollection>
 	constructor(props:any){
 		super(props)
    this.state = new ExerciseTwoState([])
    this.noteDotsCollectionRef = React.createRef()
 	}
  onAnswer = (note:string) => {
    let correct:boolean = (note == this.getCurrentNoteName())
    if(correct){
      this.showNextDotPattern()
    }
    else{
    }
  }
  onDotClick = () => {}
  showNextDotPattern = () => {
      let nextDotProps:NoteDotProps = this.selectNextDot()
      this.setState(new ExerciseTwoState([nextDotProps]))
  }
  getCurrentNoteName = () => {
    return (this.state.noteDotPropsArray[0])?this.state.noteDotPropsArray[0].noteName:Math.random().toString()
  }
  selectNextDot = ():NoteDotProps => {
    let currentNoteName = this.getCurrentNoteName()
    let nextDotProps:NoteDotProps = this.getNextDotProps()
    if(currentNoteName == nextDotProps.noteName){
      return this.selectNextDot()
    }
    return nextDotProps
  }
  getNextDotProps = () => {
    let stringIndex = this.getNextStringIndex()
    let fretIndex = this.getNextFretIndex()
    let selectedNoteName:string = GuitarTrainerSettings.guitar.getNoteNameForPosition(stringIndex, fretIndex)
    return new NoteDotProps(fretIndex, stringIndex, this.onDotClick, selectedNoteName, 3)
  }
  getNextFretIndex = () => {
    let activeFrets:number[] = [3,5]
    return activeFrets[Math.floor( Math.random() * (activeFrets.length) )]
  }
  getNextStringIndex = () => {
    return Math.floor(Math.random() * 3)
  }
  componentDidMount = () =>{
    this.showNextDotPattern()
  }
  render(){
    return  <g className="exercise">
              <StaticFretboard/>
              <NoteDotCollection {...new NoteDotCollectionProps(this.state.noteDotPropsArray)} ref={this.noteDotsCollectionRef}/>
              <NoteChoices {...new NoteChoicesProps(this.onAnswer)} />
            </g>
  }
}
export default ExerciseTwo
