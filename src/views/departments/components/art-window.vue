<template>
	<el-dialog center title="新增部门" :visible.sync="dialogVisible">
		<el-form :model="formData" :rules="fromRules" label-width="140px">
			<el-form-item prop="name" label="部门名称">
				<el-input v-model="formData.name" style="width : 75%"></el-input>
			</el-form-item>
			<el-form-item prop="manager" label="部门负责人">
				<el-input v-model="formData.manager" style="width : 75%"></el-input>
			</el-form-item>
			<el-form-item prop="code" label="部门编码">
				<el-input v-model="formData.code" style="width : 75%"></el-input>
			</el-form-item>
			<el-form-item prop="introduce" label="部门介绍">
				<el-input v-model="formData.introduce" rows="4" type="textarea" style="width : 75%"></el-input>
			</el-form-item>
			<el-row type="flex" justify="center">
				<el-button type>取消</el-button>
				<el-button type="primary">确定</el-button>
			</el-row>
		</el-form>
	</el-dialog>
</template>

<script>
	export default {
		name: "ArtWindow",

		data() {
			return {
				dialogVisible: false,
				formData: {
					code: "",
					introduce: "",
					manager: "",
					name: "",
					pid: "",
				},
				fromRules: {
					code: [{ required: true, message: "请输入", trigger: "blur" }],
					introduce: [{ required: true, message: "请输入", trigger: "blur" }],
					manager: [{ required: true, message: "请输入", trigger: "blur" }],
					name: [{ required: true, message: "请输入", trigger: "blur" }],
				},
			};
		},

		mounted() {},

		methods: {},
	};
</script>

<style lang="scss" scoped>
</style>