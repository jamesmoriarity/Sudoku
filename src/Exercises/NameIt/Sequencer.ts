import { Position } from "../../Guitar/Guitar"
import { NameItQuestion } from "./NameItQuestionComponent"

export class Sequencer{
    questionsAsked:number = 0
    questionLimit:number = 50
    constructor(){

    }
    getQuestion = ():NameItQuestion => {
        let pos:Position = new Position(0,0)
        let answer:string = pos.getNoteName()
        let autoPlay:boolean = (this.questionsAsked == 0)
        let q:NameItQuestion = new NameItQuestion([pos], answer, autoPlay)
        this.questionsAsked++
        return q  
    }
    getFirstQuestion = ():NameItQuestion => {
        this.reset()
        return this.getQuestion()
    }
    getNextQuestion = ():NameItQuestion | undefined => {
        if(this.hasNext()){
            return this.getQuestion()
        }
        return undefined
    }
    hasNext = ():boolean => {
        return (this.questionsAsked < this.questionsAsked)
    }
    reset = () => {
        this.questionsAsked = 0
    }
}