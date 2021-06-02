import React from "react"
import ExerciseComponents from "./Exercises/ExerciseComponents"
import { GuitarSettings } from "./Guitar/GuitarSettings"

// import Player from "./Player/Player"

class GuitarTrainerState{
  exerciseComponent!:Function
  exerciseName:string
  guitarSettings:GuitarSettings
  constructor(componentName:string){
    this.exerciseName = componentName
    let components:Map<string,Function> = ExerciseComponents.getAllComponents()
    let component: Function | undefined = components.get(componentName)
    if(!component){ component = ExerciseComponents.getValues()[0] }
    this.exerciseComponent = component
    this.guitarSettings = new GuitarSettings()
  }
}

class GuitarTrainer extends React.Component {
  props:any
  state:GuitarTrainerState
 	constructor(props:any){
 		super(props)
    this.state = new GuitarTrainerState(ExerciseComponents.getNames()[0])
 	}
  onExerciseSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    let newState = new GuitarTrainerState(event.currentTarget.value)
    this.setState(newState)
  }
  buildOption = (name:string) => {
    return <option value={name} key={name}>{name}</option>
  }
  getExerciseOptions = () =>{
    return  <select defaultValue={this.state.exerciseName} onChange={this.onExerciseSelect}>
              { this.state.exerciseComponent == undefined && <option value="">select exercise</option> }
              { ExerciseComponents.getNames().map(this.buildOption) }
            </select>
  }
  getExerciseComponent = () => {
    let ExceriseComponent:Function = this.state.exerciseComponent
    return (ExceriseComponent == undefined) ? null : <ExceriseComponent {...this.state.guitarSettings}/>
  }
  render(){
    return  <>
              <div>{this.getExerciseOptions()}</div>
                {this.getExerciseComponent()}
            </>
  }
}
export default GuitarTrainer
