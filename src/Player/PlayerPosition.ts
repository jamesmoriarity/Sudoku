import Position from "../Position";

export class PlayerPosition extends Position{
    isRoot:boolean
    intro:string
    outro:string
    tone:string
    description:string
    slideOrigin:any | null
    constructor(stringIndex:number, fretIndex:number, isRoot:boolean, intro:string, outro:string, tone:string, description:string, slideOrigin:any){
        super(stringIndex, fretIndex)
        this.isRoot = isRoot
        this.intro = intro
        this.outro = outro
        this.tone = tone
        this.description = description
        this.slideOrigin = slideOrigin
    }
    static fromJSON(jsonObj:any){
        return new PlayerPosition(jsonObj.stringIndex, jsonObj.fretIndex, jsonObj.isroot, jsonObj.intro, jsonObj.outro, jsonObj.tone, jsonObj.description, jsonObj.slideOrigin)
    }
}