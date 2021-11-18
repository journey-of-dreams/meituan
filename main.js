import Vue from 'vue'
import App from './App'
import store from "store/index.js"

Vue.config.productionTip = false
Vue.prototype.$store = store
// 引入loading全局组件
import loading from "@/components/loading.vue"
Vue.component("loading", loading)

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
