import { fetchApi, DataRes } from "./postData"
const obj = {
    getMyAllMenu (userCode:string):Promise<DataRes> {
        return fetchApi.get("power/getMyAllMenu", {
           userCode,
           appCode: "user"
         })
    }
}
export default obj
