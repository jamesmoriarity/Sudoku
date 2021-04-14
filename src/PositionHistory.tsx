import GuitarTrainerSettings from "./GuitarTrainerSettings";

class PositionHistory{
    notes:Map<string,boolean[]>
    constructor(){
        this.notes = new Map()
        let stringNames:string[] = GuitarTrainerSettings.guitar.stringNames
        stringNames.forEach((stringName:string)=>{
            this.notes.set(stringName, [])
        })
    }
    addAnswer = (noteName:string, correctAnswer:boolean) => {
        let answers:boolean[] = [...this.getAnswers(noteName)]
        answers.push(correctAnswer)
        this.notes.set(noteName, answers)
    }
    getAnswers = (noteName:string) => {
        let answers:boolean[] | undefined = this.notes.get(noteName)
        if(answers == undefined){throw new Error("No note by that name")}
        return answers
    }
    getNotePCT = (noteName:string) => {
        let answers:boolean[] = [...this.getAnswers(noteName)]
        let correctAnswers:number = 0
        answers.forEach( 
            (correctAnswer:boolean) =>{
                if(correctAnswer)
                    correctAnswers++
            }
        )
        return Math.floor( (correctAnswers/answers.length) * 100 )
    }
}
export default PositionHistory