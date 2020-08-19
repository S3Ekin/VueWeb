/**
 * @author: SEKin ;
 * @Date: 2020-08-06 14:04:48 ;
 * @description: 封装fetch ;
 * @Last Modified time: 2020-08-06 14:04:48;
 */
const paramsForm = (obj:{[key:string]:string}) => {
    const strArr = []
    for (const key in obj) {
        strArr.push(`${key}=${obj[key]}`)
    }
    return strArr.join("&")
}

type DataRes = {
    code: 100 | 200 | 300;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    msg: string;
}

const checkTimeOut = function (res:Response) {
    return res.redirected ? Promise.reject(new Error("session过期")) : res.json()
}

const fetchApi = {
    baseUrl: "/user/",
    get (url:string, pramas?:{[k:string]:string}):Promise<DataRes> {
        const str = pramas ? "?" + paramsForm(pramas) : ""
        return fetch(this.baseUrl + url + str, {
        }).then((res) => {
           return checkTimeOut(res)
        }).catch(err => {
            return Promise.reject(err)
        })
    },
    post (url:string, body?:{[k:string]:string}):Promise<DataRes> {
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
    postJson (url:string, body?:{[k:string]:string}):Promise<DataRes> {
        return fetch(this.baseUrl + url, {
            method: "post",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        }).then(res => {
            return res.json()
        }).catch(err => {
            return Promise.reject(err)
        })
    }
}

export { fetchApi }
