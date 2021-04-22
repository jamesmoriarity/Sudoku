import Question from "../Question"

class ExerciseHistory{
    historyString:string | null
    constructor(){
        this.historyString = localStorage.getItem('GuitarTrainerExercisePositionHistory')
        /* if(this.historyString != null){
            this.positionHistory = PositionHistory.fromJSON(JSON.parse(historyString))
          }
          else{
            this.positionHistory = new PositionHistory()
          } */
    }
    add = (question:Question) => { }
    getTotalQuestions = () => {
      return 0
    }
    getNumWrong = () => {
      return 0
    }
    getNumCorrect = () => {
      return 0
    }
}
export default ExerciseHistory