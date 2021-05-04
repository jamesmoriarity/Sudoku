import Position from "../Position";
import { PlayerPosition } from "./PlayerPosition";

export class PlayerPattern{
    positions:PlayerPosition[]
    description:string
    time:number
    static fromJSON(jsonObj:any):PlayerPattern{
        let pp:PlayerPattern = new PlayerPattern(jsonObj.description, [], jsonObj.time)
        if(jsonObj.positions.position.length){
            jsonObj.positions.position.forEach( (position:any) => {
                pp.positions.push( PlayerPosition.fromJSON(position) )
            })
        }
        else{
            pp.positions.push( PlayerPosition.fromJSON(jsonObj.positions.position) )
        }
        return pp
    }
    constructor(description:string = "", positions:PlayerPosition[] = [], time:number = 0){
        this.description = description
        this.positions = positions
        this.time = time
    }
    clone = () => {
        let copy:PlayerPattern = new PlayerPattern(this.description, this.positions.concat())
        return copy
    }
}