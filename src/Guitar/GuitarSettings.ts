import Music from "../Music/Music"

export class GuitarSettings{    
    static neckLength:number = 1000
    static neckWidth:number = 420
    static nutPosition:number = 10
       static getNoteForPosition = (position:Position) =>{
        let rootNoteName:string = StringSettings.TuningSelected[position.stringIndex]
        return Music.getNoteHalfStepsFrom(rootNoteName, position.fretIndex)
    }
    stringSettings:StringSettings
    fretSettings:FretSettings
    constructor(){
        this.stringSettings = new StringSettings()
        this.fretSettings = new FretSettings()
    }
}
export class FretSettings {
    static fretXPositionsFromNut:number[] = [20,820,1575,2287,2960,3595,4194,4760,5294,5798,6274,6723,7146,7546,7924,8280,8617,8934,9234,9517,9784,10036,10273,10498,10710]
    constructor(){}
}
export class StringSettings {
    static stringStartY:number = 0
    static stringStartX:number = 0
    static stringGapY:number = GuitarSettings.neckWidth / 6
    static TuningE:string[] = ["E", "B", "G", "D", "A", "E"]
    static TuningEb:string[] = ["Eb", "Bb", "Gb", "Db", "Ab", "Eb"]
    static TuningDefault:string[] = StringSettings.TuningE
    static TuningSelected:string[] = StringSettings.TuningDefault
    static StringSettings:Map<number, boolean> = new Map()
    static getAllTunings():Map<string,string[]> {
        let m:Map<string, string[]> = new Map()
        m.set("E", StringSettings.TuningE)
        m.set("Eb", StringSettings.TuningEb)
        return m
    } 
    static setTuning(tuning:string[]){
        StringSettings.TuningSelected = tuning
    }
    constructor(){

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
        return GuitarSettings.getNoteForPosition(this)
    }
    getDomId = () => {
        return "#dot-" + this.stringIndex + "-" + this.fretIndex
    }
}