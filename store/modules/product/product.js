const state = {
	product: {},
	num: '',
	sku: {},
	skuId: '',
	
	cartArray: [],
	cartProduct: [],
}
const mutations = {
	chooseProduct(state, payload) {
		state.product = payload.product;
		state.num = payload.num;
		state.sku = payload.sku;
		state.skuId = payload.skuId;
	},
	chooseCart(state, payload) {
		state.cartArray = payload.cartArray;
		state.cartProduct = payload.cartProduct;
	},
}


export default {
	state,
	mutations
}
