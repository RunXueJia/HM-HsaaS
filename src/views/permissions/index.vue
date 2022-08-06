<template>
	<div class="dashboard-container">
		<div class="app-container">
			<!-- 靠右的按钮 -->
			<PageTools :text="'权限管理'">
				<template>
					<el-button @click="AddPermissionFn('0',1)" type="primary" size="small">添加权限</el-button>
				</template>
			</PageTools>
			<!-- 表格 -->
			<el-table :data="list" row-key="id" border>
				<el-table-column prop="name" align="center" label="名称" />
				<el-table-column prop="code" align="center" label="标识" />
				<el-table-column prop="description" align="center" label="描述" />
				<el-table-column align="center" label="操作">
					<template slot-scope="{row}">
						<el-button @click="AddPermissionFn(row.id,1)" type="text">添加</el-button>
						<el-button @click="EidtPermissionFn(row.id)" type="text">编辑</el-button>
						<el-button @click="del(row.id)" type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<AddPermission @update="initData" ref="AddPermission" />
	</div>
</template>

<script>
	import AddPermission from "./conponents/AddPermission.vue";
	import { toTree } from "@/utils/myfunction";
	import {
		GetpermissionListApi,
		GetpermissionInfoApi,
		DelpermissionApi,
	} from "@/api/permisson";
	export default {
		name: "HRSaasIndex",
		components: { AddPermission },
		data() {
			return {
				list: [],
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				const res = await GetpermissionListApi();
				// console.log(res);
				this.list = toTree(res, "0");
			},
			//
			AddPermissionFn(id, type) {
				this.$refs.AddPermission.showDialog = true;
				this.$refs.AddPermission.formData.type = type;
				this.$refs.AddPermission.formData.pid = id;
			},
			async EidtPermissionFn(id) {
				const res = await GetpermissionInfoApi(id);
				this.$refs.AddPermission.formData = res;
				this.$refs.AddPermission.showDialog = true;
			},
			async del(id) {
				try {
					await this.$confirm("确定删除吗");
				} catch (error) {
					return;
				}
				await DelpermissionApi(id);
				this.$message.success("删除成功");
				this.initData();
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>