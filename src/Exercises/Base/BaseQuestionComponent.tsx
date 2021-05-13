import React from "react";
import { Position } from "../../Guitar/Guitar";

export class BaseQuestion{
    autoPlay:boolean
    positions:Position[]
    answer:string
    constructor(positions:Position[], answer:string, autoPlay:boolean = true){
        this.positions = positions
        this.answer = answer
        this.autoPlay = autoPlay
    }
}

class BaseQuestionComponent extends React.Component{
    propTypes:any
    constructor(props:BaseQuestion){
        super(props)
    }
    render(){ return <></> }
}

export default BaseQuestionComponent