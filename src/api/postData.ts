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
const fetchApi = {
    baseUrl: "/user/",
    get (url:string, pramas?:{[k:string]:string}):Promise<Response> {
        const str = pramas ? "?" + paramsForm(pramas) : ""
        return fetch(this.baseUrl + url + str, {
        }).then(res => {
            return res.json()
        })
    },
    post (url:string, body?:{[k:string]:string}):Promise<Response> {
        return fetch(this.baseUrl + url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
            body: body ? paramsForm(body) : undefined
        }).then(res => {
            return res.json()
        })
    },
    postJson (url:string, body?:{[k:string]:string}):Promise<Response> {
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
            console.log(err)
        })
    }
}

export { fetchApi }
