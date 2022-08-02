<template>
	<el-dialog
		@close="closehandler"
		:title="formData.id ? '修改':'新增'"
		:visible.sync="dialogVisible"
		width="30%"
	>
		<el-form
			v-if="dialogVisible"
			:model="formData"
			status-icon
			:rules="rules"
			ref="ruleForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item prop="name" label="用户名">
				<el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input type="text" v-model="formData.description" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="submit ">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import { AddRoleInfoApi, EditRoleInfoApi } from "@/api/setting";
	export default {
		name: "HrsaasAddRoles",

		data() {
			return {
				dialogVisible: false,

				formData: {
					name: "",
					description: "",
				},
				rules: {
					name: [{ required: true, message: "必填", trigger: "blur" }],
				},
			};
		},

		mounted() {},

		methods: {
			async submit() {
				try {
					await this.$refs.ruleForm.validate();
				} catch (error) {
					return;
				}
				try {
					if (this.formData.id) {
						await EditRoleInfoApi(this.formData);
					} else {
						await AddRoleInfoApi(this.formData);
					}
				} catch (error) {
					return;
				}
				this.$message.success(this.formData.id ? "修改成功" : "添加成功");
				this.$emit("updateList");
				this.dialogVisible = false;
			},
			closehandler() {
				this.formData = {
					name: "",
					description: "",
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>