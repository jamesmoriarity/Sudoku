import React from "react"
import {NoteDot, NoteDotProps} from "./NoteDot"
import Settings from "./GuitarTrainerSettings"

class ExerciseState{
  cycles:number
  noteDots:NoteDotProps[]
  constructor(noteDotsProps:NoteDotProps[], cycles:number){
    this.cycles = cycles
    this.noteDots = noteDotsProps
  }
}

class Exercise extends React.Component {
  state:any
 	constructor(props:any){
 		super(props)
    this.state = new ExerciseState([], 0)
 	}

  getNoteDotComps = () => {
    let dotComps = []
    for(let i:number = 0; i < this.state.noteDots.length; i++){
      let e = <NoteDot {...this.state.noteDots[i]} key={"noteDot" + i + this.state.cycles}/>
      dotComps.push( e )
    }
    return dotComps
  }

  showNextDot = () => {
    let s = Math.floor(Math.random() * 6)
    let f = Math.floor(Math.random() * 6) + 1
    let radius:number = Settings.displayConfig.dotRadius
    let noteDotPropsObj:NoteDotProps = new NoteDotProps(f, s, radius, this.showNextDot)
    let noteDotPropsArray: NoteDotProps[] = [noteDotPropsObj]
    let newCycles = this.state.cycles + 1
    this.setState(new ExerciseState(noteDotPropsArray, newCycles))
  }

  componentDidMount = () =>{
    this.showNextDot()
  }

  render(){
    return this.getNoteDotComps()
  }

}
export default Exercise
