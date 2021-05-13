import PositionHistory from "./PositionHistory"
import Guitar from "./Utils/Guitar"

class Position{
    fretIndex:number
    stringIndex:number
    noteName:string
    constructor(stringIndex:number, fretIndex:number){
        this.stringIndex = stringIndex
        this.fretIndex = fretIndex
        this.noteName = Guitar.getNoteForPosition(this)
    }
    setFretIndex = (fretIndex:number) => this.fretIndex = fretIndex
    setStringIndex = (stringIndex:number) => this.stringIndex = stringIndex
    toString = () => { return this.fretIndex.toString() + "." + this.stringIndex.toString()}
    equals = (position:Position) => {
        return ( position.fretIndex == this.fretIndex && position.stringIndex == this.stringIndex)
    }
}
export default Position