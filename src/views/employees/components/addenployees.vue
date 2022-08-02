<template>
	<el-dialog @close="reset" title="外层 Dialog" :visible.sync="outerVisible">
		<!--  -->
		<el-form v-if="outerVisible" ref="form" :model="formData" :rules="formRules" label-width="80px">
			<el-form-item prop="username" label="员工名称">
				<el-input style="width :500px" v-model="formData.username"></el-input>
			</el-form-item>
			<el-form-item prop="mobile" label="手机号">
				<el-input style="width :500px" v-model="formData.mobile"></el-input>
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
				<el-input style="width :500px" v-model="formData.workNumber"></el-input>
			</el-form-item>
			<el-form-item prop="departmentName" label="部门">
				<el-cascader
					@focus="getDepartment"
					v-model="formData.departmentName"
					:options="departs"
					:props="{value:'name',label : 'name'}"
				></el-cascader>
			</el-form-item>
			<el-form-item prop="correctionTime" label="转正时间">
				<el-date-picker v-model="formData.correctionTime" type="date" placeholder="选择日期"></el-date-picker>
			</el-form-item>
		</el-form>
		<!-- / -->
		<div slot="footer" class="dialog-footer">
			<el-button @click="outerVisible = false">取 消</el-button>
			<el-button type="primary" @click="SubMit">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	import { AddUserInfoApi } from "@/api/employees";

	import enployeesConst from "@/api/constant/employees";
	import { toTree } from "@/utils/myfunction";
	import { GetDepartmentListApi } from "@/api/department";
	export default {
		name: "HrsaasAddenployees",

		data() {
			return {
				departs: [],
				outerVisible: false,
				formData: {
					username: "",
					mobile: "",
					formOfEmployment: "",
					workNumber: "",
					departmentName: [],
					timeOfEntry: "",
					correctionTime: "",
				},
				formRules: {
					username: [
						{ required: true, message: "请输入", trigger: "blur" },
						{ min: 2, max: 4, message: "2-4个字", trigger: "blur" },
					],
					mobile: [
						{ required: true, message: "请输入", trigger: "blur" },
						{
							pattern: /^1[3-9]\d{9}$/,
							message: "手机格式不正确",
							trigger: "blur",
						},
					],
					formOfEmployment: [
						{ required: true, message: "请输入", trigger: "blur" },
					],
					workNumber: [{ required: true, message: "请输入", trigger: "blur" }],
					departmentName: [
						{
							validator: (rules, val, cb) => {
								if (val.length) return cb();
								cb(new Error("请选择部门"));
							},
							trigger: "blur",
						},
					],
					timeOfEntry: [{ required: true, message: "请输入", trigger: "blur" }],
					correctionTime: [
						{ required: true, message: "请输入", trigger: "blur" },
					],
				},
				hireType: enployeesConst.hireType,
			};
		},

		mounted() {},
		created() {},
		methods: {
			//提交
			async SubMit() {
				try {
					await this.$refs.form.validate();
				} catch (error) {
					return;
				}
				try {
					const CloneformData = JSON.parse(JSON.stringify(this.formData));
					const len = CloneformData.departmentName.length - 1;
					CloneformData.departmentName = CloneformData.departmentName[len];
					await AddUserInfoApi(CloneformData);
				} catch (error) {
					return;
				}
				this.$message.success("添加成功");
				this.$emit("updata");
				this.outerVisible = false;
			},
			//充值数据
			reset() {
				this.formData = {
					username: "",
					mobile: "",
					formOfEmployment: "",
					workNumber: "",
					departmentName: [],
					timeOfEntry: "",
					correctionTime: "",
				};
			},
			//获取部门列表
			async getDepartment() {
				try {
					let { depts } = await GetDepartmentListApi();
					this.departs = toTree(depts, "");
				} catch (error) {
					return console.log(error);
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>