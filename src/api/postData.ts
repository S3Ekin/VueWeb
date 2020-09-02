/**
 * @author: SEKin ;
 * @Date: 2020-08-06 14:04:48 ;
 * @description: 封装fetch ;
 * @Last Modified time: 2020-08-06 14:04:48;
 */
import noticeFn from "@component/Toast/index"
import loadFn from "@component/loading/index"
const paramsForm = (obj:{[key:string]:string}) => {
    const strArr = []
    for (const key in obj) {
        strArr.push(`${key}=${obj[key]}`)
    }
    return strArr.join("&")
}

 type DataRes = {
    code: 100 | 200 | 300 | 999;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    msg: string;
}

const resAlertTip = function (data:DataRes) {
    noticeFn.add(data.msg || "操作失败", "error")
}

const checkTimeOut = function (res:Response) {
    if (!res.ok) {
        return Promise.reject(new Error("请求出错"))
    }
    if (res.redirected) {
        window.location.href = "/login.html"
        return Promise.reject(new Error("session过期"))
    } else {
        fetchCommon.after()
        return res.json().then((data:DataRes) => {
            if (data.code === 100) {
                return data
            } else if (data.code === 200) {
                resAlertTip(data)
                return Promise.reject(data)
            } else {
                resAlertTip(data)
                return Promise.reject(data)
            }
        })
    }
}

const fetchCommon = {
    before: function () {
        loadFn.open()
    },
    after: function () {
         loadFn.close()
    }
}

const fetchApi = {
    baseUrl: "/user/",
    get (url:string, pramas?:{[k:string]:string}):Promise<DataRes> {
        fetchCommon.before()
        const str = pramas ? "?" + paramsForm(pramas) : ""
        return fetch(this.baseUrl + url + str, {
        }).then((res) => {
           return checkTimeOut(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    post (url:string, body?:{[k:string]:string}):Promise<DataRes> {
        fetchCommon.before()
        return fetch(this.baseUrl + url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
            body: body ? paramsForm(body) : undefined
        }).then(res => {
           return checkTimeOut(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    postFile (url:string, body:{[k:string]:string}):Promise<DataRes> {
        fetchCommon.before()
        return fetch(this.baseUrl + url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
            body: body ? paramsForm(body) : undefined
        }).then(res => {
           return checkTimeOut(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    postJson (url:string, body:{[k:string]:string}):Promise<DataRes> {
        fetchCommon.before()
        return fetch(this.baseUrl + url, {
            method: "post",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
            return checkTimeOut(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}

export { fetchApi, DataRes }
