import { NoteDotProps } from "../Fretboard/NoteDot"
import Position from "../Position"
import Question from "../Question"
import SettingsProps from "../SettingsProps"
import ExerciseSettings from "./Settings/ExerciseSettings"

class ExerciseSequence{
  getState:Function
  getSettings:Function
  constructor(getState:Function, getSettings:Function){
    this.getState = getState
    this.getSettings = getSettings
  }
  reset = () => {}
  getNextQuestion = ():Question => {
    let stringIndex:number = this.getNextStringIndex()
    let fretIndex:number = this.getNextFretIndex()
    let nextQuestion:Question = new Question(new Position(fretIndex, stringIndex))
    return (nextQuestion.equals(this.getState().currentQuestion)) ? this.getNextQuestion() : nextQuestion
  }
  getNextFretIndex = () => {
    let activeFrets:number[] = []
    this.getSettings().activeFrets.forEach((isActive:boolean, fretIndex:number) => {
      if(isActive){ activeFrets.push(fretIndex) }
    })
    return activeFrets[Math.floor( Math.random() * (activeFrets.length) )]
  }
  getNextStringIndex = () => {
    let activeStrings:number[] = []
    this.getSettings().activeStrings.forEach((isActive:boolean, stringIndex:number) => {
      if(isActive){ activeStrings.push(stringIndex) }
    })
    return activeStrings[Math.floor( Math.random() * (activeStrings.length) )]
  }
}
export default ExerciseSequence