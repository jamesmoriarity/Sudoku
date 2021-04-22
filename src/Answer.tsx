import GuitarTrainerSettings from "./GuitarTrainerSettings"
import { NoteDotProps } from "./Fretboard/NoteDot"

export class Answer{
    isCorrect:boolean
    didTimeout:boolean
    allotedAnswerTime:number
    answerTime:number
    fretIndex:number
    stringIndex:number
    noteName:string
    noteDotProp:NoteDotProps | null
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
    removeNoteDotProps = () => {
        this.noteDotProp = null
    }
}
export default Answer