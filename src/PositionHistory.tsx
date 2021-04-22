import { Answer } from "./Answer";
import GuitarTrainerSettings from "./GuitarTrainerSettings";

class PositionHistory{
    static stringNumber:number = 6
    static fretNumber:number = 13
    static numberOfAnswersToUse = 20
    static minimumNumberOfAnswers = 2
    static fromJSON(obj:any){
        let history:PositionHistory =  new PositionHistory()
        history.positions = obj.positions
        return history
    }
    positions:Answer[][][]
    constructor(){
        this.positions = []
        for(let f:number = 0; f < PositionHistory.fretNumber; f++){
            let fretStrings:Answer[][] = []
            for(let s:number = 0; s < PositionHistory.stringNumber; s++){
                let stringAnswers:Answer[] = []
                fretStrings.push(stringAnswers)
            }
            this.positions.push(fretStrings)
        }
    }

    addAnswer = (answer:Answer) => {
        let f:number = answer.fretIndex
        let s:number = answer.stringIndex
        answer.removeNoteDotProps()
        this.positions[f][s].push(answer)
        localStorage.setItem('GuitarTrainerExercisePositionHistory', JSON.stringify(this))
    }
    getAnswers = (f:number, s:number) => {
        return this.positions[f][s]
    }
    getNotePCT = (f:number, s:number) => {
        let answers:Answer[] = this.getAnswers(f,s)
        if(answers.length == 0)
            return -1
        let correctAnswers:number = 0
        answers.forEach( 
            (answer:Answer) =>{
                if(answer.isCorrect)
                    correctAnswers++
            }
        )
        return Math.floor( (correctAnswers/answers.length) * 100 )
    }
}
export default PositionHistory