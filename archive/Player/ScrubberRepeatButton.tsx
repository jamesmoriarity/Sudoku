import React from "react"
export class ScrubberRepeatButtonProps{
    clickHander:Function
    repeat:boolean
    constructor(clickHander:Function, repeat:boolean){
        this.clickHander = clickHander
        this.repeat = repeat
    }
}
export class ScrubberRepeatButton extends React.PureComponent{
    props!:ScrubberRepeatButtonProps
    constructor(props:ScrubberRepeatButtonProps){
        super(props)
    }
    clickHandler = () => {
        this.props.clickHander()
    }
    getIconClassName = () => {
        let className:string = "scrubber-repeat-icon"
        if(this.props.repeat){ className = className + " repeat"}
        return className
    }
    render(){
        return  <g className="scrubber-repeat" onClick={this.clickHandler}>
                    <svg className={this.getIconClassName()} viewBox="0 0 24 24" height="240" width="240">
                        <g className="repeat-icon">
                            <g data-name="repeat">
                                <rect width="24" height="24" opacity="0"/>
                                <path d="M17.91 5h-12l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.91 7h12a1.56 1.56 0 0 1 1.59 1.53V11a1 1 0 0 0 2 0V8.53A3.56 3.56 0 0 0 17.91 5z"/>
                                <path d="M18.21 14.29a1 1 0 0 0-1.42 1.42l1.3 1.29h-12a1.56 1.56 0 0 1-1.59-1.53V13a1 1 0 0 0-2 0v2.47A3.56 3.56 0 0 0 6.09 19h12l-1.3 1.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42z"/>
                            </g>
                        </g>
                    </svg>
                </g>
    }
}
export default ScrubberRepeatButton