import { NoteDotProps } from "./NoteDot"

export class Answer{
    noteDotProp:NoteDotProps
    isCorrect:boolean
    didTimeout:boolean
    time:number
    constructor(isCorrect:boolean, noteDotProps:NoteDotProps[], didTimeOut:boolean = false){
        this.isCorrect = isCorrect
        this.noteDotProp =  noteDotProps[0]
        this.didTimeout = false
        this.time = Date.now()
    }
}
export default Answer