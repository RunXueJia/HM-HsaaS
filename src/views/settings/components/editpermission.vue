<template>
	<el-dialog destroy-on-close title="分配权限" :visible.sync="dialogVisible" width="30%" @close="close">
		<el-tree
			ref="tree"
			check-strictly
			:data="list"
			node-key="id"
			:props="{label :'name'}"
			show-checkbox
			:default-checked-keys="checkList"
		></el-tree>

		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="submit">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import { toTree } from "@/utils/myfunction";
	import { GetpermissionListApi } from "@/api/permisson";
	import { setPermissionApi } from "@/api/setting";
	export default {
		name: "HRSaasEditpermission",

		data() {
			return {
				dialogVisible: false,
				checkList: [],
				list: [],
				userId: "",
			};
		},

		mounted() {},
		created() {
			this.initData();
		},
		methods: {
			async initData() {
				const res = await GetpermissionListApi();
				this.list = toTree(res, "0");
			},
			close() {
				this.checkList = [];
			},
			async submit() {
				const list = this.$refs.tree.getCheckedKeys();
				// console.log(this.userId);
				// console.log(list);
				// return;
				if (!list.length) return this.$message.warning("未选择");
				await setPermissionApi({
					id: this.userId,
					permIds: list,
				});
				this.$message.success("授权成功");
				this.dialogVisible = false;
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>