import { fetchApi, DataRes } from "./postData"

const control = "application/"
const obj = {
    getList ():Promise<DataRes> {
        return fetchApi.get(`${control}list`)
    }
}
export default obj
