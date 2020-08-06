/**
 * @author: SEKin ;
 * @Date: 2020-08-06 14:04:48 ;
 * @description: 封装fetch ;
 * @Last Modified time: 2020-08-06 14:04:48;
 */
const fetchApi = {
    baseUrl: "/user/",
    get (url:string, pramas?:{[k:string]:string}):Promise<Response> {
        return fetch(this.baseUrl + url, {
            body: JSON.stringify(pramas)
        })
    },
    post (url:string, body:{[k:string]:string}):Promise<Response> {
        const strArr = []
        for (const key in body) {
            strArr.push(`${key}=${body[key]}`)
        }
        return fetch(this.baseUrl + url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
            body: strArr.join("&")
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
            body: JSON.stringify(body)
        }).then(res => {
            return res.json()
        }).catch(err => {
            console.log(err)
        })
    }
}

export { fetchApi }
