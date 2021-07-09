import { throws } from "assert";
import { immerable } from "immer";
import React from "react";
import { CellCoordinates } from "./CellCoordinates";

export class CellProps{
    [immerable] = true
    index:number
    coordinates:CellCoordinates
    value:string
    clickHandler:Function
    isGiven:boolean = false
    backgroundColorClass:string
    patternClass:string
    isSelected:boolean
    static Dimension:number = 50
    constructor(index:number, value:string, clickHandler:Function, isGiven:boolean = false){
        this.index = index
        this.coordinates = new CellCoordinates(index)
        this.value = value
        this.clickHandler = clickHandler
        this.isGiven = isGiven
        this.backgroundColorClass = ""
        this.patternClass = ""
        this.isSelected = false
    }
}
export class Cell extends React.Component{
    props!:CellProps
    constructor(props:CellProps){
        super(props)
    }
    getClassName = () => {
        let addOns:string = (this.props.isSelected) ? "selected" : ""
        return "cell " + addOns
    }
    onClick = (e:React.MouseEvent) => {
        this.props.clickHandler(e, this.props.index)
    }
    getDisplayValue = () => {
        let val:string = this.props.value
        return (val == "0") ? "" : val
    }
    render(){
        let x:number = this.props.coordinates.columnIndex * CellProps.Dimension
        let y:number = this.props.coordinates.rowIndex * CellProps.Dimension
        return <g>
                    <rect onClick={this.onClick} className={this.getClassName()} x={x} y={y}/>
                    <text x={x + 22} y={y + 22}>{this.getDisplayValue()}</text>
                </g>
    }
}