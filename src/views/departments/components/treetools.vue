<template>
	<el-row type="flex" justify="space-between" style="width:100%">
		<el-col :span="6">
			<span>{{Data.name}}</span>
		</el-col>
		<el-col :span="6">
			<el-row type="flex" justify="end" style="width:140px">
				<!-- 两个内容 -->
				<el-col :span="12">{{Data.manager }}</el-col>
				<el-col :span="12">
					<!-- 下拉菜单 element -->
					<el-dropdown @command="ClickHandler">
						<span>
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
		name: "HRSaasTreetools",
		props: {
			Data: {
				type: Object,
				required: true,
			},
			isRoot: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {};
		},

		mounted() {},

		methods: {
			async ClickHandler(val) {
				if (val === "add") {
					this.$emit("AddDepart", this.Data);
				}
				if (val === "edit") {
					this.$emit("EditDepart", this.Data.id);
				}
				if (val === "del") {
					await this.$confirm("确定删除吗");
					await DelDepartmentApi(this.Data.id);
					this.$message.success("删除成功");
					this.$emit("UpdateList");
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>