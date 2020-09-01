import { fetchApi, DataRes } from "./postData"
const Api = {
    getLimitBtn (userCode:string):Promise<DataRes> {
        return fetchApi.get("power/getMyAllMenu", {
           userCode,
           appCode: "user"
         })
    },
    // 请求列表
    list ():Promise<DataRes> {
        return fetchApi.get("user/list")
    },
    // 请求部门列表
    departmentList ():Promise<DataRes> {
        return fetchApi.get("department/list")
    },
    // 新增、修改用户
    dealUser (url:string, obj: { [k: string]: string } | undefined):Promise<DataRes> {
        return fetchApi.postJson(`user/${url}`, obj)
    },
    // 删除用户
    deleteUser (obj: { [k: string]: string } | undefined):Promise<DataRes> {
        return fetchApi.get(`user/delete`, obj)
    },
    // 角色树
    rolesList ():Promise<DataRes> {
        return fetchApi.get("role/getApplicationRole")
    }
}
export default Api
