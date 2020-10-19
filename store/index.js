import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import login from './modules/login/login'
import address from './modules/address/address'
import goods from './modules/goods/goods'

const store = new Vuex.Store({
	modules: {
		login,
		address,
		goods
	}
})
export default store
