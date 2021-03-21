import React from "react"
import {NoteDotProps} from "./NoteDot"
import StaticFretboard from "./StaticFretboard"
import NoteDotCollection, { NoteDotCollectionProps} from "./NoteDotCollection"

export class ExerciseState{
  noteDotPropsArray:NoteDotProps[]
  constructor(noteDotsProps:NoteDotProps[] = []){
    this.noteDotPropsArray = noteDotsProps
  }
}
export class Exercise extends React.Component {
  state:ExerciseState
  noteDotsRef:any = React.createRef()
 	constructor(props:any){
 		super(props)
    this.state = new ExerciseState()
 	}
  onClick = () => { this.showNextDot() }
  onDotClick = () => {}
  showNextDot = () => {
    let stringIndex = Math.floor(Math.random() * 6)
    let fretNumIndex = Math.floor(Math.random() * 6) + 1
    let noteDotPropsObj:NoteDotProps = new NoteDotProps(fretNumIndex, stringIndex, this.onClick)
    let noteDotPropsArray: NoteDotProps[] = [noteDotPropsObj]
    this.setState(new ExerciseState(noteDotPropsArray))
  }
  componentDidMount = () =>{
    this.showNextDot()
  }
  render(){
    return <>
            <g className="exercise">
              <StaticFretboard/>
              <NoteDotCollection {...new NoteDotCollectionProps(this.state.noteDotPropsArray)} ref={this.noteDotsRef}/>
            </g>
            <rect x="300px" y="1300px" fill="blue" height="200px" width="200px" onClick={this.onClick}/>
          </>
  }

}
export default Exercise
