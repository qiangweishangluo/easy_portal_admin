import axios from '@/libs/api.request'

// function password() {
//     return hex_md5('123456' + new Date().getTime)
// }


export function getBanners() {
    // 首页轮播
    return axios.request({
        url: "/api/banners",
        method: "get",
    });
}
export function postBanners(data) {
    // 首页轮播
    return axios.request({
        url: "/api/banners",
        method: "post",
        // data: { password: password(), ...data },
        data: data,
    });
}
export function getAnnouncement(data) {
    // 公告
    return axios.request({
        url: "/api/announcements",
        method: "get",
        params: data
    });
}
export function postAnnouncement(data) {
    // 公告
    return axios.request({
        url: "/api/announcement",
        method: "post",
        data: data,
    });
}
// 新增报名后门
export function getIdentification() {
    // 获取密码
    return axios.request({
        url: "/api/identification",
        method: "get",
    });
}
export function postApplication(data) {
    // 报名接口
    return axios.request({
        url: "/api/application",
        method: "post",
        data
    });
}

export function getApplications() {
    // 获取报名信息
    return axios.request({
        url: "/api/applications",
        method: "get",
    });
}

export function postApprove(data) {
    // 报名通过
    return axios.request({
        url: "/api/application/approve",
        method: "post",
        data: data,
    });
}

export function postReject(data) {
    // 报名拒绝
    return axios.request({
        url: "/api/application/reject",
        method: "post",
        data: data,
    });
}

export function getBids() {
    // 获取投标列表
    return axios.request({
        url: "/api/allBids",
        method: "get",
    });
}