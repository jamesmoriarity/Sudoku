import GuitarTrainerSettings from "./GuitarTrainerSettings"
import Position from "./Position"

class Question{
    position: Position
    answer: string
    answeredCorrectly:boolean | undefined
    constructor(position:Position){
        this.position = position
        this.answer = GuitarTrainerSettings.guitar.getNoteNameForPosition(position)
    }
    equals = (position:Position) => {
        return (this.position.fretIndex == position.fretIndex && this.position.stringIndex == position.stringIndex)
    }
}
export default Question