import { NameItQuestion } from "./NameItQuestionComponent";

export class SessionHistory{
    questions:NameItQuestion[]
    constructor(){
        this.questions = []
    }
    add = (question:NameItQuestion) => {
        this.questions.push(question)
    }
    reset = () => {
        this.questions = []
    }
}