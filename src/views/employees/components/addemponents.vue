<template>
	<el-dialog @close="close" title="新增员工" :visible.sync="outerVisible">
		<!--  -->
		<el-form v-if="outerVisible" ref="form" :rules="formRules" :model="formData" label-width="80px">
			<el-form-item prop="username" label="姓名">
				<el-input style="width: 70%" v-model="formData.username"></el-input>
			</el-form-item>
			<el-form-item prop="mobile" label="手机号">
				<el-input style="width: 70%" v-model="formData.mobile"></el-input>
			</el-form-item>
			<el-form-item prop="timeOfEntry" label="入职时间">
				<el-date-picker v-model="formData.timeOfEntry" type="date" placeholder="选择日期"></el-date-picker>
			</el-form-item>
			<el-form-item prop="formOfEmployment" label="聘用形式">
				<el-select v-model="formData.formOfEmployment" placeholder="请选择">
					<el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="workNumber" label="工号">
				<el-input style="width: 70%" v-model="formData.workNumber"></el-input>
			</el-form-item>
			<el-form-item prop="departmentName" label="部门">
				<el-cascader
					:props="{value : 'name' ,label : 'name'}"
					@focus="getDepartmentList"
					:options="depts"
					:show-all-levels="false"
					v-model="formData.departmentName"
				></el-cascader>
			</el-form-item>
			<el-form-item prop="correctionTime" label="转正时间">
				<el-date-picker v-model="formData.correctionTime" type="date" placeholder="选择日期"></el-date-picker>
			</el-form-item>
		</el-form>
		<!--  -->
		<div slot="footer" class="dialog-footer">
			<el-button @click="outerVisible = false">取 消</el-button>
			<el-button type="primary" @click="submit">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { getDepartmentListApi } from "@/api/department";
	import { AddUserApi } from "@/api/employees";
	import { ToTreeObj } from "@/utils/MyFunction";
	import employees from "@/api/constant/employees";
	export default {
		name: "HRSaasAddemponents",

		data() {
			return {
				depts: [],
				outerVisible: false,
				hireType: employees.hireType,
				formData: {
					correctionTime: "",
					departmentName: "",
					formOfEmployment: "",
					mobile: "",
					timeOfEntry: "",
					username: "",
					workNumber: "",
				},
				formRules: {
					correctionTime: [
						{ required: true, message: "请输入", trigger: "blur" },
					],
					departmentName: [
						{ required: true, message: "请输入", trigger: "blur" },
					],
					formOfEmployment: [
						{ required: true, message: "请输入", trigger: "blur" },
					],
					mobile: [
						{ required: true, message: "请输入", trigger: "blur" },
						{
							validator: (rules, val, cb) =>
								/^1[3-9]\d{9}$/.test(val)
									? cb()
									: cb(new Error("手机号格式不正确")),

							trigger: "blur",
						},
					],
					timeOfEntry: [{ required: true, message: "请输入", trigger: "blur" }],
					username: [
						{ required: true, message: "请输入", trigger: "blur" },
						{ min: 2, max: 4, message: "2-4位", trigger: "blur" },
					],
					workNumber: [{ required: true, message: "请输入", trigger: "blur" }],
				},
			};
		},

		mounted() {},

		methods: {
			//提交
			async submit() {
				try {
					this.$refs.form.validate();
				} catch (error) {
					return;
				}
				try {
					// console.log(this.formData);
					const SendForm = JSON.parse(JSON.stringify(this.formData));
					const len = SendForm.departmentName.length - 1;
					SendForm.departmentName = SendForm.departmentName[len];
					await AddUserApi(SendForm);
				} catch (error) {
					return;
				}
				this.$message.success("添加成功");
				this.$emit("update");
				this.outerVisible = false;
			},
			async getDepartmentList() {
				try {
					const { depts } = await getDepartmentListApi();
					// console.log(depts);
					this.depts = ToTreeObj(depts, "");
				} catch (error) {
					return;
				}
			},
			//清空数据
			close() {
				this.formData = {
					correctionTime: "",
					departmentName: "",
					formOfEmployment: "",
					mobile: "",
					timeOfEntry: "",
					username: "",
					workNumber: "",
				};
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dialog-footer {
		display: flex;
		justify-content: center;
	}
</style>