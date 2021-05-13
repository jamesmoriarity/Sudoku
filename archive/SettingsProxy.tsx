import ExerciseSettings from "./Exercises/Settings/ExerciseSettings"

class SettingsProxy{
    getter:Function
    constructor(getter:Function){
        this.getter = getter
    }
    get = ():ExerciseSettings => {
        return this.getter()
    }
}
export default SettingsProxy