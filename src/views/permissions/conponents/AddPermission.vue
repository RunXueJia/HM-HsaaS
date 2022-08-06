<template>
	<!-- 放置一个弹层 用来编辑新增节点 -->
	<el-dialog
		destroy-on-close
		:title="`${formData.id ?'修改':'新增'}权限点`"
		:visible.sync="showDialog"
		@close="btnCancel"
	>
		<!-- 表单 -->
		<el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
			<el-form-item label="权限名称" prop="name">
				<el-input v-model="formData.name" style="width:90%" />
			</el-form-item>
			<el-form-item label="权限标识" prop="code">
				<el-input v-model="formData.code" style="width:90%" />
			</el-form-item>
			<el-form-item label="权限描述">
				<el-input v-model="formData.description" style="width:90%" />
			</el-form-item>
			<el-form-item label="开启">
				<el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" />
			</el-form-item>
		</el-form>
		<el-row slot="footer" type="flex" justify="center">
			<el-col :span="6">
				<el-button size="small" type="primary" @click="btnOK">确定</el-button>
				<el-button size="small" @click="showDialog=false">取消</el-button>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script>
	import { AddpermissionInfoApi, EditpermissionInfoApi } from "@/api/permisson";
	export default {
		name: "HRSaasAddPermission",

		data() {
			return {
				formData: {
					enVisible: "",
					name: "",
					code: "",
					description: "",
					type: "",
					pid: "",
				},
				rules: {
					name: [
						{ required: true, message: "权限名称不能为空", trigger: "blur" },
					],
					code: [
						{ required: true, message: "权限标识不能为空", trigger: "blur" },
					],
				},
				showDialog: false,
			};
		},

		mounted() {},

		methods: {
			async btnOK() {
				try {
					await this.$refs.perForm.validate();
				} catch (error) {
					return;
				}
				try {
					if (this.formData.id) {
						await EditpermissionInfoApi(this.formData);
					} else {
						await AddpermissionInfoApi(this.formData);
					}
				} catch (error) {
					return;
				}
				this.$message.success(`${this.formData.id ? "修改" : "添加"}成功`);
				this.$emit("update");
				this.showDialog = false;
			},
			btnCancel() {
				this.formData = {
					enVisible: "",
					name: "",
					code: "",
					description: "",
					type: "",
					pid: "",
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>