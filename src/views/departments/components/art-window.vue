<template>
	<el-dialog
		@close="ClickHander"
		center
		:title="formData.id?'修改部门':'新增部门'"
		:visible.sync="dialogVisible"
	>
		<el-form ref="from" :model="formData" :rules="fromRules" label-width="140px">
			<el-form-item prop="name" label="部门名称">
				<el-input v-model="formData.name" style="width : 75%"></el-input>
			</el-form-item>

			<el-form-item prop="code" label="部门编码">
				<el-input v-model="formData.code" style="width : 75%"></el-input>
			</el-form-item>
			<el-form-item prop="manager" label="部门负责人">
				<el-select @focus="getSimple" v-model="formData.manager" placeholder="请选择">
					<el-option
						v-for="item in managers"
						:key="item.id"
						:label="item.username"
						:value="item.username"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="introduce" label="部门介绍">
				<el-input v-model="formData.introduce" rows="4" type="textarea" style="width : 75%"></el-input>
			</el-form-item>
			<el-row type="flex" justify="center">
				<el-button @click="dialogVisible =false" type>取消</el-button>
				<el-button @click="AddDepartment" type="primary">确定</el-button>
			</el-row>
		</el-form>
	</el-dialog>
</template>

<script>
	import {
		getDepartmentListApi,
		AddDepartmentApi,
		EditDepartmentApi,
	} from "@/api/department";
	import { getSimpleListApi } from "@/api/simple";

	export default {
		name: "ArtWindow",

		data() {
			const RepeatCode = async (rule, val, cb) => {
				const { depts } = await getDepartmentListApi();
				const isRepeat = depts.some(
					(item) => item.code === val && item.id !== (this.formData.id || null)
				);
				// console.log(isRepeat);
				return isRepeat ? cb(new Error("已存在编号为" + val + "的同级部门")) : cb;
			};
			const RepeatName = async (rule, val, cb) => {
				const { depts } = await getDepartmentListApi();
				const isRepeat = depts
					.filter(
						(item) =>
							item.pid === this.formData.pid &&
							item.id !== (this.formData.id || null)
					)
					.some((item) => item.name === val);
				// console.log(isRepeat);
				return isRepeat ? cb(new Error("已存在名为" + val + "的同级部门")) : cb;
			};
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
					code: [
						{
							required: true,
							message: "请输入",
							trigger: "blur",
						},
						{
							validator: RepeatCode,
							trigger: "blur",
						},
					],
					introduce: [{ required: true, message: "请输入", trigger: "blur" }],
					manager: [{ required: true, message: "请输入", trigger: "blur" }],
					name: [
						{
							validator: RepeatName,
							trigger: "blur",
						},
						{ required: true, message: "请输入", trigger: "blur" },
					],
				},
				managers: [],
			};
		},

		mounted() {},

		methods: {
			//获取负责人列表
			async getSimple() {
				const res = await getSimpleListApi();
				// console.log(res);
				this.managers = res;
			},
			//关闭窗口清楚数据
			ClickHander() {
				this.formData = {
					code: "",
					introduce: "",
					manager: "",
					name: "",
					pid: "",
				};
			},
			//添加部门
			async AddDepartment() {
				try {
					await this.$refs.from.validate();
				} catch (error) {
					return console.log("校验不通过");
				}
				// console.log(this.formData);
				try {
					if (this.formData.id) {
						await EditDepartmentApi(this.formData);
					} else {
						await AddDepartmentApi(this.formData);
					}
				} catch (error) {
					return console.log("添加失败");
				}
				this.$message.success(this.formData.id ? "修改成功" : "添加成功");
				this.$emit("UpdateList");
				this.dialogVisible = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>