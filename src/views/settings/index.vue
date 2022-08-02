<template>
	<div id="setting">
		<el-card>
			<el-tabs v-model="activeName">
				<el-tab-pane label="角色管理" name="first">
					<el-button @click="$refs.addRolesVue.dialogVisible =true" size="small" type="primary">新增</el-button>
					<br />
					<br />
					<!-- 表格 -->
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column type="expand">
							<template slot-scope="{row}">{{row}}</template>
						</el-table-column>
						<el-table-column prop="name" label="角色" width="280"></el-table-column>
						<el-table-column prop="description" label="描述" width="380"></el-table-column>

						<el-table-column label="操作">
							<template slot-scope="{row}">
								<el-button size="small" type="success">分配权限</el-button>
								<el-button size="small" @click="edit(row)" type="info">编辑</el-button>
								<el-button size="small" @click="del(row)" type="warning">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- /表格 -->
					<!-- 分页 -->
					<div class="block">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="pagData.page"
							:page-sizes="[10, 12, 16, 20]"
							:page-size="8"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
						></el-pagination>
					</div>
				</el-tab-pane>
				<!-- //////////////公司信息//////////////// -->
				<el-tab-pane label="公司信息" name="second">
					<el-form disabled ref="form" label-width="80px">
						<el-form-item label="公司名称">
							<el-input style="width:400px" v-model="companyInfo.name"></el-input>
						</el-form-item>
						<el-form-item label="公司地址">
							<el-input style="width:400px" v-model="companyInfo.companyAddress"></el-input>
						</el-form-item>
						<el-form-item label="公司邮箱">
							<el-input style="width:400px" v-model="companyInfo.mailbox"></el-input>
						</el-form-item>
						<el-form-item label="备注">
							<el-input style="width:400px" type="textarea" v-model="companyInfo.remarks"></el-input>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</el-card>
		<!-- 新增/修改 -->
		<addRoles @updateList="initData" ref="addRolesVue"></addRoles>
		<!--/ 新增/修改 -->
	</div>
</template>

<script>
	import addRoles from "./components/addRoles.vue";
	import {
		GetRoleListApi,
		GetRoleInfoApi,
		DelRoleApi,
		getCompanyApi,
	} from "@/api/setting";
	export default {
		name: "setting",
		components: { addRoles },
		data() {
			return {
				total: 0,
				activeName: "first",
				tableData: [],
				pagData: {
					page: 1,
					pagesize: 10,
				},
				companyInfo: {},
			};
		},
		created() {
			this.initData();
			this.getCompanyFn();
		},
		methods: {
			async del(row) {
				//删除
				try {
					await this.$confirm("真要删吗");
				} catch (error) {
					return;
				}
				try {
					await DelRoleApi(row.id);
				} catch (error) {
					return this.$message.error("删除失败");
				}
				this.$message.success("删除成功");
				if (this.pagData.page > 1 && this.tableData.length === 1) {
					this.pagData.page--;
				}
				this.initData();
			},
			async edit(row) {
				//修改
				const res = await GetRoleInfoApi(row.id);
				// console.log(res);
				this.$refs.addRolesVue.formData = res;
				this.$refs.addRolesVue.dialogVisible = true;
			},

			async initData() {
				const { rows, total } = await GetRoleListApi(this.pagData);
				// console.log();
				this.tableData = rows;
				this.total = total;
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pagData.pagesize = val;
				this.initData();
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pagData.page = val;
				this.initData();
			},
			async getCompanyFn() {
				const res = await getCompanyApi(this.$store.getters.companyId);
				// console.log(res);
				this.companyInfo = res;
			},
		},
	};
</script>

<style>
</style>