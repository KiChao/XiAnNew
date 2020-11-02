<template>
	<view>
		<view class="white">
			<u-field v-model="formData.name" class="white" label="姓名" placeholder="收货人姓名"></u-field>
			<u-field v-model="formData.phone" class="white" type="number" label="手机" placeholder="收货人手机号码"></u-field>
			<u-field :value="formData.province+formData.city+formData.county" class="white" disabled="" @click="showArea=true"
			 label="省/市/县" placeholder="点击选择" disabled right-icon="arrow-down-fill"></u-field>
			<u-field v-model="formData.street" class="white" label="街道" placeholder="详细街道地址,门牌号"></u-field>
		</view>

		<view class="default-window">
			<u-button @click="save" type="success">保存</u-button>
		</view>
		<u-popup v-model="showArea" mode="bottom">
			<view class="default-window u-text-center bold">省市县选择</view>
			<view class="u-border-bottom flex u-text-center bold font-red">
				<view class="default-window" style="flex: 1;">{{formData.province}}</view>
				<view class="default-window" style="flex: 1;">{{formData.city}}</view>
				<view class="default-window" style="flex: 1;">{{formData.county}}</view>
			</view>
			<view class="flex u-text-center">
				<view style="flex: 1;">
					<scroll-view :scroll-y="true" style="height: 800rpx;">
						<view @click="chooseProvince(province.id,province.name)" class="default-window" v-for="province in provinceArray"
						 :key="province.id">
							{{province.name}}
						</view>
					</scroll-view>

				</view>
				<view style="flex: 1;">
					<scroll-view :scroll-y="true" style="height: 800rpx;">
						<view @click="chooseCity(city.id,city.name)" class="default-window" v-for="city in cityArray" :key="city.id">
							{{city.name}}
						</view>
					</scroll-view>
				</view>
				<view style="flex: 1;">
					<scroll-view :scroll-y="true" style="height: 800rpx;">
						<view @click="chooseCounty(county.id,county.name)" class="default-window" v-for="county in countyArray" :key="county.id">
							{{county.name}}
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//编辑类型
				type: 'add',
				//地址信息表单
				formData: {
					name: '',
					phone: '',
					city_id: '',
					province_id: '',
					county_id: '',
					street: '',
					province: '省',
					city: '市',
					county: '县',
				},
				//省份选择面板
				province: '省',
				city: '市',
				county: '县',
				provinceArray: [],
				cityArray: [],
				countyArray: [],
				showArea: false,
			};
		},
		onLoad(data) {
			this.type = data.type || 'add';
		},
		onReady() {
			this.judge();
			this.loadCity(0, 0);
		},
		methods: {
			//保存收货地址
			save() {
				this.$showModal('是否保存收货地址？', () => {
					this.$api('Address/save', this.formData).then(data => {
						if (data.status == 1) {
							this.$showToast(data.msg);
							setTimeout(() => {
								uni.navigateBack({
									
								})
							}, 500);
						} else {
							this.btnStatus = false;
							this.$showToast(data.msg);
						}
					});
				})
			},
			//判断是新增地址还是编辑地址
			judge() {
				if (this.type == 'edit') {
					let params = {
						address_id: this.loadId,
					};
					this.$api('Address/detail', params).then(data => {
						if (data.status == 1) {
							this.formData = data.data.address;
						} else {
							this.$showToast(data.msg);
						}
					})
				}
			},
			//加载省市县
			loadCity(parent, level) {
				let params = {
					parent_id: parent
				};
				this.$api('City/load', params).then(data => {
					let list = data.data.lists;
					switch (level) {
						case 0:
							this.provinceArray = list;
							break;
						case 1:
							this.cityArray = list;
							break;
						case 2:
							this.countyArray = list;
							break;
					}
				});
			},
			//选择省份
			chooseProvince(provinceId, provinceName) {
				this.formData.province_id = provinceId;
				this.loadCity(provinceId, 1);
				this.countyArray = [];
				this.formData.province = provinceName;
				this.formData.city = '市';
				this.formData.county = '县';
			},
			//选择城市
			chooseCity(cityId, cityName) {
				this.formData.city_id = cityId;
				this.loadCity(cityId, 2);
				this.formData.city = cityName;
			},
			//选择县区
			chooseCounty(CountyId, countyName) {
				this.formData.county_id = CountyId;
				this.showArea = false;
				this.formData.county = countyName;
			},
		}
	}
</script>

<style lang="scss">

</style>
