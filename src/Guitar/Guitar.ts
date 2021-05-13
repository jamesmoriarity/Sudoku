import Music from "../Music/Music"

export class Guitar{    
    static TuningE:string[] = ["E", "B", "G", "D", "A", "E"]
    static TuningEb:string[] = ["Eb", "Bb", "Gb", "Db", "Ab", "Eb"]
    static TuningDefault:string[] = Guitar.TuningE
    static TuningSelected:string[] = Guitar.TuningDefault
    static getNoteForPosition = (position:Position) =>{
        let rootNoteName:string = Guitar.TuningSelected[position.stringIndex]
        return Music.getNoteHalfStepsFrom(rootNoteName, position.fretIndex)
    }
    static getAllTunings():Map<string,string[]> {
        let m:Map<string, string[]> = new Map()
        m.set("E", Guitar.TuningE)
        m.set("Eb", Guitar.TuningEb)
        return m
    } 
    static setTuning(tuning:string[]){
        Guitar.TuningSelected = tuning
    }
}
export class Position{
    stringIndex:number
    fretIndex:number
    constructor(stringIndex:number, fretIndex:number){
        this.stringIndex = stringIndex
        this.fretIndex = fretIndex
    }
    getNoteName = () => {
        return Guitar.getNoteForPosition(this)
    }
}