<template>
	<!-- 放置表格和分页 -->
	<el-card>
		<!-- 消息栏 -->
		<PageTools :text="`一共${total}条记录`">
			<template>
				<el-button size="small" type="success">导入</el-button>
				<el-button size="small" type="info">导出</el-button>
				<el-button @click="$refs.AddEmployeesVue.outerVisible=true" size="small" type="warning">新增员工</el-button>
			</template>
		</PageTools>
		<!--/ 消息栏 -->
		<el-table border :data="list">
			<el-table-column type="index" label="序号" sortable />
			<el-table-column prop="username" label="姓名" sortable />
			<el-table-column prop="workNumber" label="工号" sortable />
			<el-table-column prop="formOfEmployment" :formatter="formOfEmployment" label="聘用形式" sortable />
			<el-table-column prop="departmentName" label="部门" sortable />
			<el-table-column label="入职时间" sortable>
				<template slot-scope="{row}">{{row.timeOfEntry | formatDate}}</template>
			</el-table-column>

			<el-table-column prop="list" label="操作" sortable fixed="right" width="280">
				<template slot-scope="{row}">
					<el-button type="text" size="small">查看</el-button>
					<el-button type="text" size="small">转正</el-button>
					<el-button type="text" size="small">调岗</el-button>
					<el-button type="text" size="small">离职</el-button>
					<el-button type="text" size="small">角色</el-button>
					<el-button @click="del(row.id)" type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页组件 -->
		<el-row type="flex" justify="center" align="middle" style="height: 60px">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="pageData.page"
				:page-sizes="[10, 14, 20, 30]"
				:page-size="pageData.size"
				layout="sizes, prev, pager, next"
				:total="total"
			></el-pagination>
		</el-row>
		<!-- 弹窗 -->
		<AddEmployees @update="initData" ref="AddEmployeesVue" />
	</el-card>
</template>

<script>
	import AddEmployees from "./components/addemponents.vue";
	import employees from "@/api/constant/employees";
	import { getUserListApi, DelUserApi } from "@/api/employees";
	export default {
		name: "HRSaasEmployees",
		components: { AddEmployees },
		data() {
			return {
				list: [],
				pageData: {
					page: 1,
					size: 10,
				},
				total: 0,
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			//删除
			async del(id) {
				try {
					await this.$confirm("确定删除吗");
				} catch (error) {
					return;
				}
				try {
					await DelUserApi(id);
				} catch (error) {
					return;
				}
				this.$message.success("删除成功");
				if (this.pageData.page > 1 && this.list.length === 1) {
					this.pageData.page--;
				}
				this.initData();
			},
			//获取数据
			async initData() {
				const { total, rows } = await getUserListApi(this.pageData);
				// console.log(rows);
				this.list = rows;
				this.total = total;
			},
			//聘用形式格式化
			formOfEmployment(row) {
				const res = employees.hireType.find(
					(item) => item.id === row.formOfEmployment * 1
				);
				return res ? res.value : "未知";
			},
			//分页相关
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pageData.size = val;
				this.initData();
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.pageData.page = val;
				this.initData();
			},
		},
	};
</script>

<style lang="scss" scoped>
	.page-tools {
		margin: 10px 0;
		.before {
			line-height: 24px;
			i {
				font-size: 14px;
				font-style: normal;
				margin-right: 5px;
				color: #409eff;
			}
			display: inline-block;
			padding: 0px 10px;
			border-radius: 3px;
			border: 1px solid rgba(145, 213, 255, 1);
			background: rgba(230, 247, 255, 1);
		}
		.right {
			display: flex;
			justify-content: end;
		}
	}
</style>