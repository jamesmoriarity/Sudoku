import Position from "../Position"
import Music from "./Music"

class Guitar{
    static getNoteForPosition = (position:Position) =>{
        let rootNoteName:string = Guitar.stringNames[position.stringIndex]
        let rootNoteIndex:number = Music.activeNoteNames.indexOf(rootNoteName)
        let selectedNoteIndex:number = (rootNoteIndex + position.fretIndex) % 12
        return Music.activeNoteNames[selectedNoteIndex]
    }
    static stringNames:string[] = ["E", "B", "G", "D", "A", "E"]
}
export default Guitar