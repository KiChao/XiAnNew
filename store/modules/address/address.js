const state = {
	address: {
		addressId: 0,
		name: null,
		phone: null,
		address: null
	},
	pickAddress:{
		pickAddressId:0,
		name: null,
		phone: null,
		address: null,
	}
	
}
const mutations = {
	//选择中收货地址
	chooseAddress(state, payload) {
		state.address.addressId = payload.addressId;
		state.address.name = payload.name;
		state.address.phone = payload.phone;
		state.address.address = payload.address;
	},
	//选择自提地址
	choosePickAddress(state, payload){
		state.pickAddress.pickAddressId = payload.pickAddressId;
		state.pickAddress.name = payload.name;
		state.pickAddress.phone = payload.phone;
		state.pickAddress.address = payload.address;
	}
}


export default {
	state,
	mutations
}
