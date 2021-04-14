import GuitarTrainerSettings from "./GuitarTrainerSettings"
import { NoteDotProps } from "./NoteDot"

export class Answer{
    isCorrect:boolean | undefined
    didTimeout:boolean
    allotedAnswerTime:number
    answerTime:number
    fretIndex:number
    stringIndex:number
    noteName:string
    noteDotProp:NoteDotProps
    constructor(noteDotProp:NoteDotProps){
        this.noteDotProp = noteDotProp
        this.isCorrect = (noteDotProp.answeredCorrectly == true)
        this.didTimeout = (noteDotProp.answeredCorrectly == undefined)
        this.allotedAnswerTime = GuitarTrainerSettings.QuestionTimeInSeconds
        this.answerTime = Date.now() - noteDotProp.questionStartTime
        this.fretIndex = noteDotProp.fretIndex
        this.stringIndex = noteDotProp.stringIndex
        this.noteName = noteDotProp.noteName
    }
}
export default Answer