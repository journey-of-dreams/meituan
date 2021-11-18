import {
	errData
} from "api/errData.js"

// GET
export function get(url) {
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			timeout: 5000
		}).then(res => {
			resolve(res)
		}).catch(err => {
			let errTip = "服务器错误，请稍后再试"
			errData.errList(errTip)
			reject(err);
		})
	})
}

// POST
export function post(url, params) {
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method: "POST",
			data: params,
			timeout: 5000
		}).then(res => {
			resolve(res)
		}).catch(err => {
			let errTip = "服务器错误，请稍后再试"
			errData.errList(errTip)
			reject(err);
		})
	})
}
