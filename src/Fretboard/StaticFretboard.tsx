import React from "react";

export class StaticFretboard extends React.Component{
    constructor(props:any){
        super(props)
    }
    render(){
        return <>{this.props.children}</>
    }

}