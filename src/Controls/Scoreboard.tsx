import React from "react"
import ExerciseHistory from "../Exercises/ExerciseHistory"

export class ScoreboardProps{
    history:ExerciseHistory
    numCorrect!:number
    numWrong:number
    totalQuestions:number
    constructor(history:ExerciseHistory){
        this.history = history
        this.numCorrect = this.history.getNumCorrect()
        this.numWrong = this.history.getNumWrong()
        this.totalQuestions = this.history.getTotalQuestions()
    }
}

class Scoreboard extends React.PureComponent {
    props!:ScoreboardProps
    constructor(props:ScoreboardProps){
        super(props)
    }
    render(){
        return <g className="scoreboard"><text>{this.getText()}</text></g> 
    }
    getText = ():string => {
        let c:number = this.props.numCorrect 
        let l:number = this.props.totalQuestions
        let pct:number = (this.props.totalQuestions > 0) ? Math.floor((c/l) * 100) : 0
        return c + "/" + l + " : " + pct + "%"
    }
}
export default Scoreboard
