import { CellProps } from "./Cells/Cell"

export class SolverUtils{
    contructor(){}
	static translateKeyValue = (val:string) => { return (val == "Backspace" || val == "Enter") ? "0" : val }
    static isValidEntry = (s:string) =>{
		let a:Array<string> = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]
		return a.includes(s)
	}
    static getEmptyPuzzleValues():string[]{
        return SolverUtils.getValuesArrayFromString(SolverUtils.getEmptyPuzzleString())
    }
    static getValuesArrayFromString(s:string):string[] {
        return String(s).split(",")
    }
    static getEmptyPuzzleString():string{
        let s:string = ""
        for(let i = 0; i < 81; i++){
            s += (i < 80) ? "0," : "0"
        }
        return s
    }
    static getCells(values:string[], clickHandler:Function){
        let cellPropsArray:CellProps[] = []
        values.forEach( (value:string, index:number) => {
            let isGiven:boolean = (value != "0")
            let cellProps:CellProps = new CellProps(index, value, clickHandler, isGiven)
            cellPropsArray.push(cellProps)
        })
        return cellPropsArray
    }
    static getEmptyCells(clickHandler:Function):CellProps[]{
        return SolverUtils.getCells(SolverUtils.getEmptyPuzzleValues(), clickHandler)
    }
}
export default SolverUtils