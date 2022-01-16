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
	},
	//清除收货地址和自提地址
	cleanAddress(state, payload){
		state.address.addressId = 0;
		state.address.name = null;
		state.address.phone = null;
		state.address.address = null;
		
		state.pickAddress.pickAddressId = 0;
		state.pickAddress.name = null;
		state.pickAddress.phone = null;
		state.pickAddress.address = null;
	}
}


export default {
	state,
	mutations
}
