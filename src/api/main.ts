import { fetchApi, DataRes } from "./postData"
import { SESSION } from "../global"
const obj = {
    getMyAllMenu ():Promise<DataRes> {
        return fetchApi.get("power/getMyAllMenu", {
           userCode: SESSION.code,
           appCode: "user"
         })
    }
}
export default obj
