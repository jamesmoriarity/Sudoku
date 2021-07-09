export class SolverHistoryEntry{
    next:any
    previous:any
    constructor(next:any, previous:any){
        this.next = next
        this.previous = previous
    }
}

export class SolverHistory{
    changes:SolverHistoryEntry[]
    cursor:number
    constructor(){
        this.changes = []
        this.cursor = -1
    }
    add = (next:any, previous:any) => {
        this.cursor++
        this.changes.splice(this.cursor)
        this.changes.push(new SolverHistoryEntry(next, previous))
    }
    getPreviousPatch = ():any => {
        if(!this.hasPrevious()){return null}
        return this.changes[this.cursor--].previous
    }
    getNextPatch = ():any => {
        if(!this.hasNext()){return null}
        return this.changes[++this.cursor].next
    }
    hasPrevious = () => {
        return (this.changes.length > 0 && this.cursor > -1)
    }
    hasNext = () => {
        return (this.changes.length > 0 && this.cursor < this.changes.length - 1)
    }
}