export const Tween = {
    linear: function (curTime:number, begin:number, change:number, duration:number):number {
        return (curTime / duration) * change + begin
    }
}
