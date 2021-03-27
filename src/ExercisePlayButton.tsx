import React from "react"

export class ExercisePlayButtonProps{
    onStartHander:Function
    onPauseHandler:Function
    isPlaying:boolean
    constructor(onStartHander:Function, onPauseHandler:Function, isPlaying:boolean){
        this.onStartHander = onStartHander
        this.onPauseHandler = onPauseHandler
        this.isPlaying = isPlaying
    }
}
export class ExercisePlayButton extends React.PureComponent{
    props!:ExercisePlayButtonProps
    interval:number | undefined
    constructor(props:ExercisePlayButtonProps){
        super(props)
    }

    getMessage = () => {
        return (this.props.isPlaying) ? "[pause]" : "[start]"
    }
    getHandler = ():Function => {
        return (this.props.isPlaying) ? this.props.onPauseHandler : this.props.onStartHander
    }
    onClick = () => {
        this.getHandler()()
    }
    render(){
        return <g className="exercisePlayButton" onClick={this.onClick}><text>{this.getMessage()}</text></g>
    }
}