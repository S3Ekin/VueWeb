import { fetchApi, DataRes } from "./postData"
import loadFn from "@component/loading/index"
const control = "application/"
const obj = {
    getList ():Promise<DataRes> {
        loadFn.open()
        return fetchApi.get(`${control}list`)
    },
    edit (data:anyObj):Promise<DataRes> {
        loadFn.open()
        return fetchApi.postJson(`${control}edit`, data)
    },
    add: function (obj: anyObj):Promise<DataRes> {
        loadFn.open()
        return fetchApi.postJson(`${control}add`, obj)
    },
    delete: function (code: string):Promise<DataRes> {
        loadFn.open()
        return fetchApi.post(`${control}delete`, {
            code
        }
       )
    }
}
export default obj
