import {
	wxLoginUrl
} from "@/api/request.js"
import {
	post
} from "@/api/index.js"

export function wxlogin() {
	uni.getUserProfile({
		desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
		success: (res) => {
			getCode(res.userInfo.avatarUrl, res.userInfo.nickName)
		}
	})
}
// 获取code
function getCode(avatarUrl, nickName) {
	uni.login({
		success: (res) => {
			let code = res.code
			getLogin(avatarUrl, nickName, code)
		}
	})
}
// 调用登录接口
function getLogin(avatarUrl, nickName, code) {
	const accountInfo = wx.getAccountInfoSync();
	let appid = accountInfo.miniProgram.appId
	let secret = "b09591e444f717a27520e6a7659bd6dd"
	post(wxLoginUrl, {
		nickName,
		avatarUrl,
		code,
		appid,
		secret

	}).then(res => {
		uni.setStorageSync("userInfo", res[1].data.datas)
		uni.showToast({
			title: "登陆成功！",
			duration: 2000,
			icon: "none"
		})
	})

}
