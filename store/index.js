import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters.js"
Vue.use(Vuex)

const state = {
	takeout: []
}

export default new Vuex.Store({
	state,
	mutations: {
		takeoutMuta(state, takeout) {
			state.takeout = takeout
		}
	},
	getters,
	// actions,
})
