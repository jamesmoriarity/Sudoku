import { NameIt } from "./NameIt/NameIt"
// import Player from "./Player/Player"

export class ExerciseComponents{

  static getAllComponents():Map<string, Function>{
      let map:Map<string, Function> = new Map()
      // map.set("Player", Player)
      map.set("Name It", NameIt)
      return map
  }
  static getNames():string[]{
    return [...ExerciseComponents.getAllComponents().keys()]
  }
  static getValues():Function[]{
    return [...ExerciseComponents.getAllComponents().values()]
  }
}

export default ExerciseComponents

