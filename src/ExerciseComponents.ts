import Exercise from "./Exercise"
import ExerciseTwo from "./ExerciseTwo"

export class ExerciseComponents{
  static components:Map<string, any> | undefined = undefined
  static getComponents(){
    if(!ExerciseComponents.components){
      let map:Map<string, any> = new Map()
      map.set("Exercise", Exercise)
      map.set("ExerciseTwo", ExerciseTwo)
      ExerciseComponents.components = map
    }
    return ExerciseComponents.components
  }
  static getNames():string[]{
    return [...ExerciseComponents.getComponents().keys()]
  }
}

export default ExerciseComponents
