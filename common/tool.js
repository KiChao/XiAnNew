/* 封装uniapp的网络请求api */
export const port = async function(location, params = null) {
	return await new Promise((resolve, reject) => {
		let that = this;
		uni.request({
			url: `https://m.vxyz.cn/api/${location}`,
			data: params,
			method: `POST`,
			header: {
				'token': uni.getStorageSync('token'),
				'content-type': 'application/x-www-form-urlencoded',
				'city': that.$store.state.login.cityId
			},
			success: (res) => {
				if (res.data.status == 10001) {
					uni.navigateTo({
						url: '../../pages/public/login'
					})
				} else {
					
					resolve(res.data)
				}

			},
			fail: reject
		})
	})
}

/* 封装toast显示 */
export const showToast = function(title, icon = 'none', duration = 1500) {
	uni.showToast({
		title: title,
		duration: duration,
		icon: icon
	})
}

/* 封装showModal显示 */
export const showModal = function(content, fncConfirm = () => {}, fncCancel = () => {}) {
	uni.showModal({
		title: '提示',
		content: content,
		success: function(res) {
			if (res.confirm) {
				fncConfirm()
			} else if (res.cancel) {
				fncCancel()
			}
		}
	})
}

/* 封装Loading显示 */
export const showLoading = function(title = '') {
	uni.showLoading({
		title: title
	})
}

/* 封装hide隐藏 */
export const showHide = function() {
	uni.hideLoading()
	uni.hideToast()
}

/* 微信支付 */
export const pay = async function(response) {
	return await new Promise((resolve, reject) => {

		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: response.timeStamp,
			nonceStr: response.nonceStr,
			package: response.package,
			signType: 'MD5',
			paySign: response.sign,
			success: function(res) {
				resolve(res);
			},
			fail: function(err) {
				reject(err);
			}
		});
	})
}