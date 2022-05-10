import request from "./request"
export function LoginApi(data) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}

export function HomeApi() {
    return request({
        url: "menus",
        methhod: 'GET',

    })
}

export function UsersApi(params) {
    return request({
        url: "users",
        methhod: 'GET',
        params

    })
}
