export const fnUtil = {
    throttle: function<k> (fn:(e: k) => void, time = 170): (e:k)=>void {
        let recoder = new Date().getTime()
        let timer = 0
        return function (e:k):void {
            timer && window.clearTimeout(timer)
            const now = new Date().getTime()
            if (now - recoder > time) {
                fn(e)
                recoder = now
            } else {
                 timer = window.setTimeout(function () {
                    fn(e)
                }, time)
            }
        }
    }
}
