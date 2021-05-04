import { runInThisContext } from "vm"
import Question from "../Question"

export class ExerciseHistoryStats{
  rightAnswers:number
  wrongAnswers:number
  totalAnswers:number
  constructor(questions:Question[]){
    this.rightAnswers = 0
    this.wrongAnswers = 0
    this.totalAnswers = questions.length
    questions.forEach((question:Question) => {
      return (question.answeredCorrectly) ? this.rightAnswers++ : this.wrongAnswers++
    })
  }
}

class ExerciseHistory{
    historyString:string | null
    questions:Question[]
    constructor(){
        this.historyString = localStorage.getItem('GuitarTrainerExercisePositionHistory')
        this.questions = []
        /* if(this.historyString != null){
            this.positionHistory = PositionHistory.fromJSON(JSON.parse(historyString))
          }
          else{
            this.positionHistory = new PositionHistory()
          } */
    }
    add = (question:Question) => { this.questions.push(question)}
    getExerciseStats = () => {
      let summary = new ExerciseHistoryStats(this.questions)
      return summary
    }
}
export default ExerciseHistory