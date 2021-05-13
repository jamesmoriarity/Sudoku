import GuitarTrainerSettings from "./GuitarTrainerSettings";
import Question from "./Question";

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
    positions:Question[][][]
    constructor(){
        this.positions = []
        for(let f:number = 0; f < PositionHistory.fretNumber; f++){
            let fretStrings:Question[][] = []
            for(let s:number = 0; s < PositionHistory.stringNumber; s++){
                let stringAnswers:Question[] = []
                fretStrings.push(stringAnswers)
            }
            this.positions.push(fretStrings)
        }
    }

    addQuestion= (question:Question) => {
        let f:number = question.position.fretIndex
        let s:number = question.position.stringIndex
        this.positions[f][s].push(question)
        localStorage.setItem('GuitarTrainerExercisePositionHistory', JSON.stringify(this))
    }
    getAnswers = (f:number, s:number) => {
        return this.positions[f][s]
    }
    getNotePCT = (f:number, s:number) => {
        let questions:Question[] = this.getAnswers(f,s)
        if(questions.length == 0)
            return -1
        let correctAnswers:number = 0
        questions.forEach( 
            (question:Question) =>{
                if(question.answeredCorrectly)
                    correctAnswers++
            }
        )
        return Math.floor( (correctAnswers/questions.length) * 100 )
    }
}
export default PositionHistory