<template>
	<div>
		<PageTools :text="`一共${total}条记录`">
			<template>
				<el-button @click="exportExcle" plain size="small" type="primary">普通excel导出</el-button>
				<el-button
					:disabled="checklist.length === 0"
					@click="fzbt"
					plain
					size="small"
					type="success"
				>复杂excel导出</el-button>
				<el-button @click="$router.push('/import?type=user')" plain size="small" type="info">excel导入</el-button>
				<el-button @click="$refs.artWindow.outerVisible =true" plain size="small" type="warning">新增员工</el-button>
			</template>
		</PageTools>

		<!-- 放置表格和分页 -->
		<el-card>
			<el-table @selection-change="checklist = $event" :data="list" border>
				<el-table-column type="selection" label="序号" sortable />
				<el-table-column type="index" label="序号" sortable />
				<el-table-column prop="username" label="姓名" sortable />
				<el-table-column prop="mobile" label="手机号" sortable />
				<el-table-column prop="workNumber" label="工号" sortable />
				<el-table-column prop="formOfEmployment" :formatter="formOfEmployment" label="聘用形式" sortable>
					<!-- <template slot-scope="{row}">{{row.formOfEmployment*1 ===1 ? '正式' : '非正式' }}</template> -->
				</el-table-column>
				<el-table-column prop="departmentName" label="部门" sortable />
				<el-table-column label="入职时间" sortable>
					<template slot-scope="{row}">{{row.timeOfEntry | formatDate}}</template>
				</el-table-column>

				<el-table-column prop="name" label="操作" sortable fixed="right" width="280">
					<template slot-scope="{row}">
						<el-button @click="$router.push('/employees/detail/' + row.id)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">转正</el-button>
						<el-button type="text" size="small">调岗</el-button>
						<el-button type="text" size="small">离职</el-button>
						<el-button type="text" size="small">角色</el-button>
						<el-button type="text" size="small" @click="del(row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页组件 -->
			<el-row type="flex" justify="center" align="middle" style="height: 60px">
				<div class="block">
					<el-pagination
						:page-sizes="[8,10, 20]"
						:page-size="10"
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="pageData.page"
						layout="sizes,total, prev, pager, next"
						:total="total"
					></el-pagination>
				</div>
			</el-row>
		</el-card>
		<!-- 弹窗 -->
		<Addenployees @updata="initData" ref="artWindow" />
		<!-- /弹窗 -->
	</div>
</template>

<script>
	import Addenployees from "./components/addenployees.vue";
	import enployeesConst from "@/api/constant/employees";
	import { GetUserListApi, DelUserApi } from "@/api/employees";
	import { formatDate } from "@/filters";
	export default {
		name: "employees",
		components: { Addenployees },
		data() {
			return {
				checklist: [],
				list: [],
				pageData: {
					page: 1,
					size: 10,
				},
				total: 0,
			};
		},
		created() {
			this.initData();
		},
		methods: {
			//fuzbiaotou
			fzbt() {
				import("@/vendor/Export2Excel").then(async (excle) => {
					const table = this.clsjData(this.checklist);
					excle.export_json_to_excel({
						header: table.header,
						data: table.body,
						multiHeader: [["姓名", "主要信息", "", "", "", "", "部门"]],
						merges: ["A1:A2", "B1:F1", "G1:G2"],
						filename: "test",
						autoWidth: true,
						bookType: "xlsx",
					});
				});
			},
			//
			exportExcle() {
				import("@/vendor/Export2Excel").then(async (excle) => {
					const { rows } = await GetUserListApi({ page: 1, size: 10000 });
					const table = this.clsjData(rows);
					excle.export_json_to_excel({
						header: table.header,
						data: table.body,

						filename: "test",
						autoWidth: true,
						bookType: "xlsx",
					});
				});
			},
			//
			clsjData(rows) {
				const headers = {
					入职日期: "timeOfEntry",
					手机号: "mobile",
					姓名: "username",
					转正日期: "correctionTime",
					工号: "workNumber",
					部门: "departmentName",
					聘用形式: "formOfEmployment",
				};
				let arr = [];
				rows.forEach((item) => {
					let temp = [];
					Object.keys(headers).forEach((val) => {
						if (headers[val] === "formOfEmployment") {
							const res = enployeesConst.hireType.find(
								(v) => v.id === item[headers[val]] * 1
							);

							temp.push(res ? res.value : "未知");
						} else if (
							headers[val] === "correctionTime" ||
							headers[val] === "timeOfEntry"
						) {
							temp.push(formatDate(item[headers[val]]));
						} else {
							temp.push(item[headers[val]]);
						}
					});
					arr.push(temp);
				});
				return { body: arr, header: Object.keys(headers) };
			},
			async initData() {
				try {
					const { rows, total } = await GetUserListApi(this.pageData);
					// console.log(rows);
					this.list = rows;
					this.total = total;
				} catch (error) {}
			},

			//分页
			handleSizeChange(val) {
				this.pageData.size = val;
				this.initData();
			},
			handleCurrentChange(val) {
				this.pageData.page = val;
				this.initData();
			},
			//招聘形式
			formOfEmployment(row) {
				const res = enployeesConst.hireType.find(
					(item) => item.id === row.formOfEmployment * 1
				);
				return res ? res.value : "未知";
				// return row.formOfEmployment * 1 === 1 ? "正式" : "非正式";
			},
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
		},
	};
</script>

<style>
</style>