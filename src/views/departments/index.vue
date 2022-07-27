<template>
	<el-card class="tree-card">
		<!-- 用了一个行列布局 -->
		<TreeTools @AddDepart="AddDepart" :isRoot="true" :Data="company"></TreeTools>
		<br />
		<hr />
		<br />
		<!-- 下面就是树形控件内容了 -->
		<el-tree :data="departs" :props="{label: 'name',}">
			<TreeTools
				@UpdateList="initData"
				@EditDepart="EditDepart"
				@AddDepart="AddDepart"
				slot-scope="{data}"
				:Data="data"
			></TreeTools>
		</el-tree>
		<!-- 弹出框 -->
		<ArtWindow @UpdateList="initData" ref="window"></ArtWindow>
		<!--/ 弹出框  -->
	</el-card>
</template>

<script>
	import ArtWindow from "./components/art-window.vue";
	import TreeTools from "./components/treetools.vue";
	import { getDepartmentListApi, getDepartmentInfoApi } from "@/api/department";
	import { ToTreeObj } from "@/utils/MyFunction";
	export default {
		name: "HRSaasIndex",
		components: { TreeTools, ArtWindow },
		data() {
			return {
				company: {
					id: "",
					name: "江苏传智播客教育科技股份有限公司",
					manager: "负责人",
				},
				departs: [],
				dialogVisible: true,
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				const { depts, companyName } = await getDepartmentListApi();
				this.company.name = companyName;
				this.departs = ToTreeObj(depts, "");
			},
			AddDepart(item) {
				this.$refs.window.dialogVisible = true;
				this.$refs.window.formData.pid = item.id;
			},
			async EditDepart(id) {
				this.$refs.window.dialogVisible = true;
				const res = await getDepartmentInfoApi(id);
				this.$refs.window.formData = res;
			},
		},
	};
</script>

<style lang="less" scoped>
</style>