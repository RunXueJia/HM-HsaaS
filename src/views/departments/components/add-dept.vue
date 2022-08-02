<template>
	<el-dialog @close="closeHandler" :title="fromData.id?'修改当前部门':'新增部门'" :visible.sync="dialogShow">
		<el-form v-if="dialogShow" ref="form" :model="fromData" :rules="fromRules" label-width="140px">
			<el-form-item label="部门名称" prop="name">
				<el-input style="width:80%" v-model="fromData.name"></el-input>
			</el-form-item>
			<el-form-item label="部门编码" prop="code">
				<el-input style="width:80%" v-model="fromData.code"></el-input>
			</el-form-item>
			<el-form-item label="部门负责人" prop="manager">
				<el-select @focus="getManagerList" v-model="fromData.manager" placeholder="请选择">
					<el-option
						v-for="item in managerList"
						:key="item.value"
						:label="item.username"
						:value="item.username"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="部门介绍" prop="introduce">
				<el-input style="width:80%" rows="4" type="textarea" v-model="fromData.introduce"></el-input>
			</el-form-item>
			<el-row type="flex" justify="center">
				<el-button @click="dialogShow =false">取消</el-button>
				<el-button type="primary" @click="submit">确定</el-button>
			</el-row>
		</el-form>
	</el-dialog>
</template>

<script>
	import { getEmployeesListApi } from "@/api/employees";
	import {
		GetDepartmentListApi,
		AddDepartmentInfoApi,
		EditDepartmentInfoApi,
	} from "@/api/department";
	export default {
		name: "AddDept",
		data() {
			const CheckNameRepeat = async (rule, val, cb) => {
				const { depts } = await GetDepartmentListApi();
				const isrepeat = depts
					.filter(
						(item) =>
							item.pid === this.fromData.pid &&
							item.id !== (this.fromData.id || null)
					)
					.some((item) => item.name === val);
				isrepeat ? cb(new Error("同级部门已经有" + val + "这个部门了")) : cb();
			};
			const CheckCodeRepeat = async (rule, val, cb) => {
				const { depts } = await GetDepartmentListApi();
				const isrepeat = depts.some(
					(item) => item.code === val && item.id !== (this.fromData.id || null)
				);
				isrepeat ? cb(new Error("已经有" + val + "这个部门了")) : cb();
			};
			return {
				dialogShow: false,
				fromData: {
					code: "",
					introduce: "",
					manager: "",
					name: "",
					pid: "",
				},
				managerList: [],
				fromRules: {
					code: [
						{
							required: true,
							message: "请输入",
							trigger: "blur",
						},
						{
							validator: CheckCodeRepeat,
							trigger: "blur",
						},
					],
					introduce: [{ required: true, message: "请输入", trigger: "blur" }],
					manager: [{ required: true, message: "请输入", trigger: "blur" }],
					name: [
						{
							validator: CheckNameRepeat,
							trigger: "blur",
						},
						{ required: true, message: "请输入", trigger: "blur" },
					],
				},
			};
		},
		methods: {
			async getManagerList() {
				const res = await getEmployeesListApi();
				// console.log(res);
				this.managerList = res;
			},

			//提交
			async submit() {
				try {
					await this.$refs.form.validate();
				} catch (error) {
					return console.log("校验不通过");
				}

				// console.log(this.fromData);
				try {
					if (this.fromData.id) {
						await EditDepartmentInfoApi(this.fromData);
					} else {
						await AddDepartmentInfoApi(this.fromData);
					}
					this.$message.success(this.fromData.id ? "修改成功" : "添加成功");
					this.$emit("updata");
					this.dialogShow = false;
				} catch (error) {}
			},
			//关闭清除
			closeHandler() {
				this.fromData = {
					code: "",
					introduce: "",
					manager: "",
					name: "",
					pid: "",
				};
			},
		},
	};
</script>

<style>
</style>