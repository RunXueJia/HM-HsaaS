<template>
	<el-dialog
		@close="close"
		:title="formData.id? '修改员工信息':'新增员工'"
		:visible.sync="centerDialogVisible"
		width="30%"
		center
	>
		<!-- 表单 -->
		<el-form ref="form" :rules="rules" :model="formData" label-width="80px">
			<el-form-item prop="name" label="员工姓名">
				<el-input v-model="formData.name"></el-input>
			</el-form-item>

			<el-form-item label="员工描述">
				<el-input type="textarea" v-model="formData.description"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="centerDialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="submit">确 定</el-button>
		</span>
	</el-dialog>
</template>
<script>
	import { AddRoleApi, EditRoleApi } from "@/api/setting";
	export default {
		name: "HRSaasAddRoles",
		data() {
			return {
				centerDialogVisible: false,
				formData: {
					name: "",
					description: "",
				},
				rules: {
					name: [{ required: true, message: "这是必填项", trigger: "blur" }],
				},
			};
		},

		mounted() {},

		methods: {
			//取消重置
			close() {
				this.formData = {
					name: "",
					description: "",
				};
			},
			//提交
			async submit() {
				try {
					this.$refs.form.validate();
				} catch (error) {
					return;
				}
				try {
					if (this.formData.id) {
						await EditRoleApi(this.formData);
					} else {
						await AddRoleApi(this.formData);
					}
				} catch (error) {
					return;
				}
				this.$message.success(this.formData.id ? "修改成功" : "添加成功");
				this.$emit("update");
				this.centerDialogVisible = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>