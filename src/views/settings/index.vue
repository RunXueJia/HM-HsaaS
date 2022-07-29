<template>
	<el-card>
		<el-tabs v-model="activeName">
			<el-button @click="$refs.AddRolesVue.centerDialogVisible=true" type="primary">新增员工</el-button>
			<br />
			<br />
			<!-- 表格 -->
			<el-tab-pane label="用户管理" name="first">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column type="index" width="150"></el-table-column>
					<el-table-column prop="name" label="人员" width="280"></el-table-column>
					<el-table-column prop="description" label="描述" width="480"></el-table-column>
					<el-table-column label="地址">
						<template slot-scope="{row}">
							<el-button size="mini" type="success">分配权限</el-button>
							<el-button size="mini" @click="handleEdit(row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 分页 -->
				<div class="block">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="pageDate.page"
						:page-sizes="[10, 16, 20]"
						:page-size="10"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total"
					></el-pagination>
				</div>
				<!-- /分页 -->
			</el-tab-pane>
			<el-tab-pane label="配置管理" name="second">
				<CompanyVue />
			</el-tab-pane>
		</el-tabs>
		<!-- /表格 -->

		<!-- 弹窗 -->
		<AddRoles @update="initData" ref="AddRolesVue" />
		<!-- /弹窗 -->
	</el-card>
</template>

<script>
	import CompanyVue from "./components/company.vue";
	import AddRoles from "./components/addRoles.vue";
	import { getRoleListApi, DelRoleApi, getRoleInfoApi } from "@/api/setting";
	export default {
		name: "HRSaasSetting",
		components: { AddRoles, CompanyVue },
		data() {
			return {
				total: 0,
				activeName: "first",
				tableData: [],
				pageDate: {
					page: 1,
					pagesize: 10,
				},
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			//修改
			async handleEdit(val) {
				try {
					const res = await getRoleInfoApi(val.id);
					// console.log(res);
					this.$refs.AddRolesVue.formData = res;
					this.$refs.AddRolesVue.centerDialogVisible = true;
				} catch (error) {}
			},
			//删除
			async handleDelete(val) {
				try {
					await this.$confirm("确定删除吗");
				} catch (error) {
					return;
				}
				try {
					await DelRoleApi(val.id);
				} catch (error) {
					return;
				}
				this.$message.success("删除成功");
				this.initData();
			},
			//修改每页数量
			handleSizeChange(val) {
				this.pageDate.pagesize = val;
				this.initData();
			},
			//翻页
			handleCurrentChange(val) {
				this.pageDate.page = val;
				this.initData();
			},
			//获取数据
			async initData() {
				const { rows, total } = await getRoleListApi(this.pageDate);
				// console.log(res);
				this.total = total;
				this.tableData = rows;
			},
		},
	};
</script>

<style lang="less" scoped>
</style>