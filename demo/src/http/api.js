import { method } from "lodash"
import request from "./request"
// 登录接口
export function LoginApi(data) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}
// 管理接口
export function HomeApi() {
    return request({
        url: "menus",
        method: 'GET',

    })
}
// 用户列表接口
export function UsersApi(params) {
    return request({
        url: "users",
        method: 'GET',
        params

    })
}
// 添加用户接口
export function AddApi(data) {
    return request({
        url: "users",
        method: 'POST',
        data

    })
}
// 编辑用户接口
export function EdilApi(data) {
    return request({
        url: `users/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除用户接口
export function DetailApi(data) {
    console.log(data);
    return request({
        url: `users/${data}`,
        method: 'DELETE',

    })
}
//  角色列表接口
export function Roles() {
    return request({
        url: 'roles',
        method: 'GET',

    })
}
// 添加角色列表接口
export function RolesApi(data) {
    return request({
        url: 'roles',
        method: 'POST',
        data
    })
}
// 修改角色状态接口
export function EditRolesApi(id, mg_state) {
    return request({
        url: `users/${id}/state/${mg_state}`,
        method: 'PUT',

    })
}
// 分配角色权限接口
export function JurisdictionApi(id, rid) {
    return request({
        url: `users/${id}/role`,
        method: 'PUT',
        data: { rid }
    })
}
//编辑角色接口
export function EditRolesAPi(data) {
    return request({
        url: `roles/${data.id}`,
        method: 'PUT',
        data
    })
}
// 删除角色接口
export function DetailRolesAPI(data) {
    return request({
        url: `roles/${data}`,
        method: 'DELETE',

    })
}
// 获取权限列表接口
export function RolesListAPI(type = "list") {
    return request({
        url: `rights/${type}`,
        method: 'GET',
    })
}
// 获取角色授权接口
export function RolesPoosApi(roleId, rids) {
    return request({
        url: `roles/${roleId}/rights`,
        method: 'POST',
        data: { rids }
    })
}
// 删除权限管理接口
export function Delroles(roleId, rightId) {
    return request({
        url: `roles/${roleId}/rights/${rightId}`,
        method: "DELETE",
    })
}
// 商品列表
export function GoodsAPI(params) {
    return request({
        url: 'goods',
        method: 'GET',
        params
    })
}
// 删除商品列表
export function GoodsDelAPI(data) {
    return request({
        url: `goods/${data}`,
        method: 'DELETE',
    })
}
// 商品分类数据列表
export function GoodsListAPI(params) {
    return request({
        url: 'categories',
        method: 'GET',
        params
    })
}

// 分类参数列表
export function goodsAPI(cat_id, sel = 'many') {
    return request({
        url: `categories/${cat_id}/attributes`,
        method: 'GET',
        params: { sel }
    })

}
// 添加商品
export function GoodsAddAPI(data) {
    return request({
        url: 'goods',
        method: 'POST',
        data
    })
}

// 编辑商品接口
export function getEditApi(id, data) {
    return request({
        url: `goods/${id}`,
        method: 'put',
        data
    })
}
// 根据id查询商品
export function getGoodsAPIs(data) {
    return request({
        url: `goods/${data}`,
        method: 'GET',
    })
}

// 商品分类接口
export function categoriesAPI(params) {
    return request({
        url: '/categories',
        method: 'GET',
        params
    })
}
// 商品分类删除接口
export function delcategoriesAPI(data) {
    return request({
        url: `categories/ ${data}`,
        method: 'DELETE',
    })
}
// 商品添加接口
export function addcategoriesAPI(data) {
    return request({
        url: 'categories',
        method: 'POST',
        data
    })
}
// 编辑商品接口
export function EditcategoriesAPI(id, data) {
    return request({
        url: `categories / ${id}`,
        method: 'PUT',
        data

    })
}
// 编辑分类参数接口
export function editcategoriesApi(cateId, attrId, data) {
    return request({
        url: `categories / ${cateId} / attributes / ${attrId}`,
        method: 'PUT',
        data
    })
}
// 编辑分类参数接口
export const editcateApi = (data) => request({
    url: `categories / ${data.id} / attributes / ${data.attrId}`,
    method: 'put',
    data
})
// 删除分类参数接口
export function delcateAPI(id, attrid) {
    return request({
        url: `categories / ${id} / attributes / ${attrid}`,
        method: 'DELETE',

    })
}
//添加动态参数
export function addcateAPI(catid, data) {

    return request({
        url: `categories / ${catid} / attributes`,
        method: 'post',
        data
    })
}
// 订单列表接口
export function getOrdersAPI(params) {
    return request({
        url: 'orders',
        method: 'GET',
        params
    })
}
// 数据统计接口
export function getreportsAPI(params) {
    return request({
        url: "reports/type/1",
        method: 'GET',
        params
    })
}