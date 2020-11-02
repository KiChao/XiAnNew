const state = {
	product: {},
	num: '',
	sku: {},
	skuId: '',
}
const mutations = {
	chooseProduct(state, payload) {
		state.product = payload.product;
		state.num = payload.num;
		state.sku = payload.sku;
		state.skuId = payload.skuId;
	}
}


export default {
	state,
	mutations
}
