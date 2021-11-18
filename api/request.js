// 公用地址
const url = "https://meituan.thexxdd.cn/api"

// 为你优选
const preferUrl = `${url}/forshop/getprefer`

// 附近商家
const nearBusiUrl = `${url}/forshop/wxshop`

// 综合排序
const synSortUrl = `${url}/forshop/starting`

// 筛选
const multipleUrl = `${url}/forshop/multiple`

// 搜索
const searchUrl = `${url}/forshop/search`

// 评论
const commentUrl = `${url}/message/discuss`

// 商家介绍
const shopUrl = `${url}/forshop/shop`

// 商品数据
const dishesUrl = `${url}/forshop/getdishes`

// Ai分类评论
const classiCommentUrl = `${url}/message/discuss`

// wx登录
const wxLoginUrl = `${url}/wxuser/wxlogin`

// wx支付
const wxPayUrl = `${url}/wxpay/fictpay`

// 我的订单
const orderUrl = `${url}/wxpay/wxpaying`

// 提交评论
const pushCommentUrl = `${url}/message/comment`



export {
	preferUrl,
	nearBusiUrl,
	synSortUrl,
	multipleUrl,
	searchUrl,
	commentUrl,
	shopUrl,
	dishesUrl,
	classiCommentUrl,
	wxLoginUrl,
	wxPayUrl,
	orderUrl,
	pushCommentUrl
}
