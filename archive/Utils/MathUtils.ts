export default class MathUtils{
    static getPointOnCircle(originX:number, originY:number , radius:number, angleDegrees:number){
        let angleRadians = angleDegrees / (180/Math.PI)
        var newX = radius * Math.cos(angleRadians) + originX
        var newY = radius * Math.sin(angleRadians) + originY
        return {"x" : newX, "y" : newY}
    }
}