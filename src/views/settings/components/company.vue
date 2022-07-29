<template>
	<el-form disabled ref="form" :model="fromData" label-width="80px">
		<el-form-item label="公司名称">
			<el-input style="width: 280px" v-model="fromData.name"></el-input>
		</el-form-item>
		<el-form-item label="公司地址">
			<el-input style="width: 280px" v-model="fromData.companyAddress"></el-input>
		</el-form-item>
		<el-form-item label="公司邮箱">
			<el-input style="width: 280px" v-model="fromData.mailbox"></el-input>
		</el-form-item>
		<el-form-item label="备注">
			<el-input style="width: 280px" type="textarea" v-model="fromData.remarks"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	import { getCompanyInfoApi } from "@/api/setting";

	export default {
		name: "HRSaasCompany",

		data() {
			return {
				fromData: {},
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				const res = await getCompanyInfoApi(this.$store.getters.companyId);
				// console.log(res);
				this.fromData = res;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>