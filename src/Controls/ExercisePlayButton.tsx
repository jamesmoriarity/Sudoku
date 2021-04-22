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
    renderPlay = () => {
        return  <svg className="play-mode" x="0px" y="0px" height="800px" width="800px" viewBox="0 0 485 485">
                    <g>
                        <path className="button-outline" d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5
                            s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026
                            C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5
                            S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z"/>
                        <polygon points="181.062,336.575 343.938,242.5 181.062,148.425 	"/>
                    </g>
                    </svg>
    }
    renderPause = () => {
        return  <svg className="pause-mode" height="800px" width="800px" x="0px" y="0px" viewBox="0 0 485 485">
                    <g>
                        <path className="button-outline" d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5
                            s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026
                            C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5
                            S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z"/>
                        <rect x="172.5" y="140" width="55" height="205"/>
                        <rect x="257.5" y="140" width="55" height="205"/>
                    </g>  
                </svg> 
    }
    render(){
        return  <g className="exercisePlayButton" onClick={this.onClick}>
                    <rect className="playButtonBack" width="600px" height="600px"/>
                    {(this.props.isPlaying) ? this.renderPause() : this.renderPlay()}
                </g>
    }
}