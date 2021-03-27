import { NoteDotProps } from "./NoteDot"

export class Answer{
    noteDotProp:NoteDotProps
    isCorrect:boolean
    constructor(isCorrect:boolean, noteDotProps:NoteDotProps[]){
        this.isCorrect = isCorrect
        this.noteDotProp =  noteDotProps[0]
    }
}

export class TimedoutAnswer extends Answer{
    didTimeout:boolean
    constructor(isCorrect:boolean, noteDotProps:NoteDotProps[]){
        super(isCorrect, noteDotProps)
        this.didTimeout = true
    }
}