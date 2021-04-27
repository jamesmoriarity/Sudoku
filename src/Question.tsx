import GuitarTrainerSettings from "./GuitarTrainerSettings"
import Position from "./Position"
import Guitar from "./Utils/Guitar"

class Question{
    position: Position
    answer: string
    answeredCorrectly:boolean | undefined
    constructor(position:Position){
        this.position = position
        this.answer = Guitar.getNoteForPosition(position, )
    }
    equals = (question:Question) => {
        return (question != undefined && this.position.fretIndex == question.position.fretIndex && this.position.stringIndex == question.position.stringIndex)
    }
}
export default Question