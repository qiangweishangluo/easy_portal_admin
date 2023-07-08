import axios from '@/libs/api.request'

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
        data: data,
    });
}
export function getAnnouncement() {
    // 公告
    return axios.request({
        url: "/api/announcements",
        method: "get",
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