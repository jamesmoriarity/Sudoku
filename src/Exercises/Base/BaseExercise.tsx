import React, { RefObject } from "react"


export class BaseExerciseState{
    // history:ExerciseHistory
    // settings:ExerciseSettings
    constructor(){
      // this.history = new ExerciseHistory()
      /// this.settings = new ExerciseSettings()
    }
  }

export class BaseExercise extends React.PureComponent{
    state:BaseExerciseState
    constructor(props:any){
      super(props)
      this.state = new BaseExerciseState()
    }
    render(){
      return  <></>
    }
}
export default BaseExercise