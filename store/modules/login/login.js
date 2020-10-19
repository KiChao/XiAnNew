const state = {
	ref_sn: '',
}
const mutations = {
	//设置sn
	setSn(state, payload) {
		state.ref_sn = payload.ref_sn;
	}
}


export default {
	state,
	mutations
}
