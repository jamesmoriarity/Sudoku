import { produce, immerable, enablePatches, applyPatches} from "immer"
import React from "react"
import { Cell, CellProps } from "./Cells/Cell"
import { SolverHistory } from "./SolverHistory"
import SolverUtils from "./SolverUtils"
enablePatches()

export class SudokuSolverState{
  [immerable] = true
  cells:CellProps[]
  a:boolean
  clickHandler:Function
  constructor(clickHandler:Function){
    this.a = false
    this.clickHandler = clickHandler
    this.cells = SolverUtils.getEmptyCells(this.clickHandler)
    let a:any = {}
  }
}

export class SudokuSolver extends React.Component {
  props:any
  state:SudokuSolverState
  history:SolverHistory
 	constructor(props:any){
 		super(props)
    this.state = new SudokuSolverState(this.onCellClick)
    this.history = new SolverHistory()
    window.addEventListener("keydown", this.onKeyPress);
 	} 
    
  onKeyPress = (keyboardEvent:KeyboardEvent) => {
    let val = SolverUtils.translateKeyValue(keyboardEvent.key)
    if(SolverUtils.isValidEntry(val)){
      this.setSelectedCellValues(val)
    }
  }
  setSelectedCellValues = (val:string) => {
    let newState:SudokuSolverState = produce(this.state, (draft:SudokuSolverState) => {
      draft.cells.forEach( (cell:CellProps) =>{
        if(cell.isSelected){ cell.value = val}
      })
    }, this.capturePatches)
    this.setState(newState)
  }
  onCellClick = (event:React.MouseEvent, index:number) => {
    let newState:SudokuSolverState = produce(this.state, (draft:SudokuSolverState) => {
      if(!event.metaKey){
        draft.cells.forEach( (cellProps:CellProps)=>{
          if(cellProps.index != index){ cellProps.isSelected = false }
        })
      }
      draft.cells[index].isSelected = !draft.cells[index].isSelected
    }, this.capturePatches)
    this.setState(newState)
  }
  capturePatches = (patches:any, inversePatches:any) => {
    this.history.add(patches, inversePatches)
  }
  onPrevious = (e:React.MouseEvent) => {
    let patches:any = this.history.getPreviousPatch()
    if(patches)
      this.setState(applyPatches(this.state, patches))
  }
  onNext = (e:React.MouseEvent) => {
    let patches:any = this.history.getNextPatch()
    if(patches)
      this.setState(applyPatches(this.state, patches))
  }
  getPreviousButton = ():JSX.Element | null =>{
    if(this.history.hasPrevious()){
      return <button onClick={this.onPrevious}>Previous</button>
    }
    return <button disabled={true}>Previous</button>
  }
  getNextButton = ():JSX.Element => {
    if(this.history.hasNext()){
      return <button onClick={this.onNext}>Next</button>
    }
    return <button disabled={true}>Next</button>
  }
  getCells = () => {
    let cells:JSX.Element[] = []
    this.state.cells.forEach( (cellProps:CellProps) => {
      cells.push( <Cell {...cellProps} key={cellProps.index}/> )
    })
    return cells
  }
  getSuperCells = () => {
    let lines:JSX.Element[] = []
    lines.push(<rect className="superv one" key="v1"/>)
    lines.push(<rect className="superv two" key="v2"/>)
    lines.push(<rect className="superv three" key="v3"/>)
    lines.push(<rect className="superv four" key="v4"/>)
    lines.push(<rect className="superh one" key="h1"/>)
    lines.push(<rect className="superh two" key="h2"/>)
    lines.push(<rect className="superh three" key="h3"/>)
    lines.push(<rect className="superh four" key="h4"/>)
    return lines
  }
  render(){
    return  <>
              <div>
                {this.getPreviousButton()}
                {this.getNextButton()}
              </div>
              <svg width="500" height="500" viewBox="0 0 500 500">
                  {this.getCells()}
                  {this.getSuperCells()}
              </svg>
            </>
  }
}
export default SudokuSolver
