const state = {
	name: '',
	describe: '',
	wechat: '',
	phone: '',
	cate_id: '',
	num: 1,
	pick_address: '',
	pick_type: 1,
	img_list:'',
	item_id:'',
}
const mutations = {
	copyGoods(state, payload) {
		state.name = payload.name;
		state.describe = payload.describe;
		state.wechat = payload.wechat;
		state.phone = payload.phone;
		state.num = payload.num;
		state.pick_address = payload.pick_address;
		state.pick_type = payload.pick_type;
		state.cate_id = payload.cate_id;
		state.img_list = payload.img_list;
		state.item_id = payload.item_id;
	}
}


export default {
	state,
	mutations
}
