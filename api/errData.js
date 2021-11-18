// 提示
export const errData = {
	errList(err, icon = "none") {
		uni.showToast({
			title: err,
			duration: 2000,
			icon
		})
	}
}
