import React from "react"
import { Answer } from "../Answer"

export class ScoreboardProps{
    history:Answer[]
    numCorrect!:number
    numWrong!:number
    constructor(history:Answer[]){
        this.history = history
        this.numCorrect = 0
        this.setNumberCorrect()
    }

    setNumberCorrect = () => {
        this.history.forEach( (answer:Answer) => {
            if (answer.isCorrect){this.numCorrect++}
            else{this.numWrong++}
        })
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
        let l:number = this.props.history.length
        let pct:number = (this.props.history.length > 0) ? Math.floor((c/l) * 100) : 0
        return c + "/" + l + " : " + pct + "%"
    }
}
export default Scoreboard
