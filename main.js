import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);

/*
	引入封装的uniapp原生api
*/
import {
	port, //网络请求接口
	port2, //网络请求接口2
	showToast, //轻提示接口
	showModal, //提示框接口
	showLoading, //显示loading
	showHide, //隐藏loading和toast
	pay, //支付
} from 'common/tool.js'

Vue.prototype.$api = port
Vue.prototype.$api2 = port2
Vue.prototype.$showToast = showToast
Vue.prototype.$showModal = showModal
Vue.prototype.$showLoading = showLoading
Vue.prototype.$showHide = showHide
Vue.prototype.$pay = pay;

//引入vuex
import store from './store'
Vue.prototype.$store = store



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
