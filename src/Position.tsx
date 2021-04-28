import PositionHistory from "./PositionHistory"

class Position{
    fretIndex:number
    stringIndex:number
    constructor(fretIndex:number, stringIndex:number){
        this.fretIndex = fretIndex
        this.stringIndex = stringIndex
    }
    setFretIndex = (fretIndex:number) => this.fretIndex = fretIndex
    setStringIndex = (stringIndex:number) => this.stringIndex = stringIndex
    toString = () => { return this.fretIndex.toString() + "." + this.stringIndex.toString()}
    equals = (position:Position) => {
        return ( position.fretIndex == this.fretIndex && position.stringIndex == this.stringIndex)
    }
}
export default Position