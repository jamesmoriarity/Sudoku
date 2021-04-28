import GuitarTrainerSettings from "./GuitarTrainerSettings"
import Position from "./Position"
import Guitar from "./Utils/Guitar"

class Question{
    position: Position
    answer: string
    answeredCorrectly:boolean
    answered:boolean
    constructor(position:Position){
        this.position = position
        this.answer = Guitar.getNoteForPosition(position, )
        this.answeredCorrectly = false
        this.answered = false
    }
    equals = (question:Question) => {
        return (question != undefined && this.position.fretIndex == question.position.fretIndex && this.position.stringIndex == question.position.stringIndex)
    }
    clone = ():Question => {
        let newCopy:Question = new Question(this.position)
        newCopy.answer = this.answer
        newCopy.answeredCorrectly = this.answeredCorrectly
        newCopy.answered = this.answered
        return newCopy
    }
}
export default Question