export class CellCoordinates{
    index:number
    rowIndex:number
    columnIndex:number
    constructor(index:number){
        this.index = index
        this.rowIndex = Math.floor(index / 9)
        this.columnIndex = index % 9
    }
}