import React from "react";
import gsap from "gsap"
import {TimelineLite} from "gsap"
import {Draggable} from "gsap/Draggable"
import {ScrubberRepeatButton, ScrubberRepeatButtonProps} from "./ScrubberRepeatButton"
gsap.registerPlugin(Draggable)

export class ScrubberProps{
    timelineGetter:Function
    toggleRepeat:Function
    repeat:boolean
    constructor(timelineGetter:Function, toggleRepeat:Function, repeat:boolean){
        this.timelineGetter = timelineGetter
        this.toggleRepeat = toggleRepeat
        this.repeat = repeat
    }
    getTimeline = ():TimelineLite => {
        return this.timelineGetter()
    }
}

export class Scrubber extends React.Component{
    props!:ScrubberProps
    draggable!:Draggable
    constructor(props:ScrubberProps){
        super(props)
    }
    onDragPress = () => {
        this.props.getTimeline().pause()
    }
    onDrag = () => {
        let drag:Draggable = this.draggable
        if(drag.deltaX != 0){
            let newX:number = drag.endX
            let pct:number = Math.floor( (newX/3200) * 100 ) / 100
            let timeline:TimelineLite = this.props.getTimeline()
            timeline.progress(pct)
        }
    }
    onTimelineUpdate = () => {
        let progress:number = this.props.getTimeline().progress()
        progress = Math.round(progress * 100)/100
        var tl = new TimelineLite();
        tl.set(this.draggable.target, {x:progress * 3200})
        let width:number = (progress * 3200) + 10
        if(width > 3200){width = 3200}
        tl.set(".scrubber-progress", {width: width})
    }
    componentDidMount(){
        let vars:any = {
            autoScroll: 1,
            type:"x",
            bounds:{minX:0, maxX:3200},
            onDrag:this.onDrag,
            onPress:this.onDragPress
        }
       this.draggable = Draggable.create(".scrubber-head", vars)[0]
    }
    render(){
        return  <g className="scrubber">
                    <rect className="scrubber-track" width="3200" height="50" y="1000" fill="white" rx="40"/>
                    <rect className="scrubber-progress" width="0" height="50" y="1000" fill="grey" rx="40"/>
                    <circle className="scrubber-head" r="100" cy="1025" fill="orange"/>
                    <ScrubberRepeatButton {...new ScrubberRepeatButtonProps(this.props.toggleRepeat, this.props.repeat)}></ScrubberRepeatButton>
                </g>
    }
}
export default Scrubber

// register/connect with the timeline inside the player session