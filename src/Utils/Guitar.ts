import Position from "../Position"
import Music from "./Music"

class Guitar{
    static getNoteForPosition = (position:Position, noteNames:string[]) =>{
        let rootNoteName:string = Guitar.stringNames[position.stringIndex]
        let rootNoteIndex:number = noteNames.indexOf(rootNoteName)
        let selectedNoteIndex:number = (rootNoteIndex + position.fretIndex) % 12
        return noteNames[selectedNoteIndex]
    }
    static stringNames:["E", "B", "G", "D", "A", "E"]
}
export default Guitar