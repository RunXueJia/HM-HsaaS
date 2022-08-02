<template>
	<el-row type="flex" justify="space-between" style="width:100%">
		<div>{{treeNode.name}}</div>
		<el-col :span="6">
			<el-row type="flex" justify="end">
				<el-col :span="12">{{treeNode.manager }}</el-col>
				<el-col :span="12">
					<el-dropdown @command="clickHandler">
						<span class="el-dropdown-link">
							操作
							<i class="el-icon-arrow-down" />
						</span>
						<!-- 下拉菜单 -->
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="add">添加子部门</el-dropdown-item>
							<el-dropdown-item command="del" v-if="!isRoot">删除部门</el-dropdown-item>
							<el-dropdown-item command="edit" v-if="!isRoot">修改部门</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-row>
		</el-col>
	</el-row>
</template>

<script>
	import { DelDepartmentApi } from "@/api/department";
	export default {
		name: "treeTool",
		props: {
			treeNode: {
				type: Object,
				required: true,
			},
			isRoot: {
				type: Boolean,
				default: false,
			},
		},
		methods: {
			async clickHandler(val) {
				// console.log("ok");
				if (val === "add") {
					this.$emit("addDept", this.treeNode);
				}
				if (val === "del") {
					await this.$confirm("确认删除吗");
					await DelDepartmentApi(this.treeNode.id);
					this.$message.success("删除成功");
					this.$emit("updatelist");
				}
				if (val === "edit") {
					this.$emit("EditDept", this.treeNode.id);
				}
			},
		},
	};
</script>

<style>
</style>