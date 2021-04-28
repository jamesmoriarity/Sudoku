import { runInThisContext } from "vm"
import Question from "../Question"

export class ExerciseSessionHistoryStats{
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

class ExerciseSessionHistory{
    historyString:string | null
    questions:Question[]
    constructor(){
        this.historyString = localStorage.getItem('GuitarTrainerExercisePositionHistory')
        this.questions = []
        // position history?
    }
    add = (question:Question) => { 
      this.questions.push(question)
      return this
    }
    getExerciseStats = () => {
      let summary = new ExerciseSessionHistoryStats(this.questions)
      return summary
    }
    clone = ():ExerciseSessionHistory => {
      let copy:ExerciseSessionHistory = new ExerciseSessionHistory()
      copy.questions = this.questions.concat()
      return copy
    }
}
export default ExerciseSessionHistory