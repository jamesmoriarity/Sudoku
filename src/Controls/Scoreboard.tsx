import React from "react"
import ExerciseHistory, { ExerciseHistoryStats } from "../Exercises/ExerciseHistory"

class Scoreboard extends React.PureComponent {
    props!:ExerciseHistoryStats
    constructor(props:ExerciseHistoryStats){
        super(props)
    }
    render(){
        return <g className="scoreboard"><text>{this.getText()}</text></g> 
    }
    getText = ():string => {
        let correct:number = this.props.rightAnswers 
        let total:number = this.props.totalAnswers
        let pct:number = (this.props.totalAnswers > 0) ? Math.floor((correct/total) * 100) : 0
        return correct + "/" + total + " : " + pct + "%"
    }
}
export default Scoreboard
