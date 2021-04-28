import { NoteDotProps } from "../Fretboard/NoteDot"
import Position from "../Position"
import Question from "../Question"
import SettingsProxy from "../SettingsProxy"
import { ExerciseSessionCurrentQuestionProxy, ExerciseSessionState } from "./ExerciseSession"
import ExerciseSettings from "./Settings/ExerciseSettings"

class ExerciseSequence{
  settingsGetter:Function
  currentQuestionGetter:Function
  constructor(settings:Function, currentQuestionGetter:Function){
    this.settingsGetter = settings
    this.currentQuestionGetter = currentQuestionGetter
  }
  getCurrentQuestion = ():Question|null => {
    let currentQuestion:Question | null = this.currentQuestionGetter()
    return currentQuestion
  }
  reset = () => {}
  getNextQuestion = ():Question => {
    let currentQuestion:Question | null = this.getCurrentQuestion()
    let currentPosition:Position | null = (currentQuestion) ? currentQuestion.position : null
    let nextPosition:Position = this.settingsGetter().getRandomActivePosition(currentPosition)
    let nextQuestion:Question = new Question(nextPosition)
    return nextQuestion
  }
}
export default ExerciseSequence