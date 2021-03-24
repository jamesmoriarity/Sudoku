import React from "react"
import ExerciseComponents from "./ExerciseComponents"

class GuitarTrainerState{
  exerciseComponent:any | undefined
  exerciseName:string
  constructor(exerciseName:string = "" ){
    this.exerciseName = exerciseName
    if( (exerciseName != "") && ExerciseComponents.getComponents().has(exerciseName)){
      this.exerciseComponent = ExerciseComponents.getComponents().get(exerciseName)
    }
  }
}

class GuitarTrainer extends React.Component {
  props:any; state:GuitarTrainerState
 	constructor(props:any){
 		super(props)
    this.state = new GuitarTrainerState(ExerciseComponents.getNames()[0])
 	}
  onExerciseSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(new GuitarTrainerState(event.currentTarget.value))
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
    let ExceriseComponent:any = this.state.exerciseComponent
    return (ExceriseComponent == undefined)? null : <ExceriseComponent {...this.state}/>
  }
  render(){
    return  <>
              <div>{this.getExerciseOptions()}</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="1150px" height="300px"
                viewBox="0 0 11500 3000" className="fretboard-super">
                {this.getExerciseComponent()}
              </svg>
            </>
  }
}
export default GuitarTrainer
