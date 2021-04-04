import { NoteDotProps } from "./NoteDot"

export class Answer{
    noteDotProp:NoteDotProps
    isCorrect:boolean
    didTimeout:boolean
    time:number
    constructor(isCorrect:boolean, noteDotProps:NoteDotProps, didTimeOut:boolean = false){
        this.isCorrect = isCorrect
        this.noteDotProp =  noteDotProps
        this.didTimeout = false
        this.time = Date.now()
    }
    getFretIndex = () => { return this.noteDotProp.fretIndex }
    getStringIndex = () => { return this.noteDotProp.stringIndex }
    getNoteName = () => { return this.noteDotProp.noteName}
}
export default Answer