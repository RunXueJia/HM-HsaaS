<template>
	<div class="department">
		<div class="app-container">
			<el-card class="tree-card">
				<treeTool @EditDept="EditDept" @addDept="AddDeptFn" :isRoot="true" :treeNode="company"></treeTool>
				<hr />
				<br />
				<!--  -->
				<el-tree :data="departs" :props="{label: 'name',}">
					<treeTool
						@updatelist="initData"
						@EditDept="EditDept"
						@addDept="AddDeptFn"
						slot-scope="{data}"
						:treeNode="data"
					></treeTool>
				</el-tree>
			</el-card>
		</div>
		<!-- 弹框组件 -->
		<!-- <el-dialog title="新增部门" :visible.sync="dialogShow"></el-dialog> -->
		<AddDept ref="AddDept" @updata="initData"></AddDept>
		<!-- /弹框组件 -->
	</div>
</template>
<script>
	import { toTree } from "@/utils/myfunction";
	import { GetDepartmentListApi, GetDepartmentInfoApi } from "@/api/department";
	import treeTool from "./components/tree-tools.vue";
	import AddDept from "./components/add-dept.vue";
	export default {
		name: "Department",
		components: { treeTool, AddDept },
		data() {
			return {
				dialogShow: false,
				company: {
					id: "",
					name: "江苏传智播客教育科技股份有限公司",
					manager: "负责人",
				},
				departs: [],
			};
		},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				let { companyName, depts } = await GetDepartmentListApi();
				this.company.name = companyName;
				this.departs = toTree(depts, "");
			},
			AddDeptFn(val) {
				this.$refs.AddDept.dialogShow = true;
				this.$refs.AddDept.fromData.pid = val.id;
			},
			//
			async EditDept(id) {
				const res = await GetDepartmentInfoApi(id);
				this.$refs.AddDept.fromData = res;
				console.log(res);
				this.$refs.AddDept.dialogShow = true;
			},
		},
	};
</script>

<style>
</style>