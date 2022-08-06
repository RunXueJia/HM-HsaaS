<template>
	<el-dialog @close="close" title="分配角色" :visible.sync="showRoleDialog">
		<!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
		<el-checkbox-group v-model="checkList">
			<el-checkbox v-for="role in roleList" :key="role.id" :label="role.id">{{role.name}}</el-checkbox>
		</el-checkbox-group>
		<el-row slot="footer" type="flex" justify="center">
			<el-col :span="6">
				<el-button @click="submit" type="primary" size="small">确定</el-button>
				<el-button @click="close" size="small">取消</el-button>
			</el-col>
		</el-row>
	</el-dialog>
</template>

<script>
	import { GetRoleListApi } from "@/api/setting";
	import { assignRoles } from "@/api/employees";
	export default {
		data() {
			return {
				showRoleDialog: false,
				checkList: [],
				roleList: [],
				userId: "",
			};
		},
		created() {
			this.initData();
		},
		methods: {
			close() {
				this.checkList = [];
				this.showRoleDialog = false;
			},
			async initData() {
				const { rows } = await GetRoleListApi();
				// console.log(rows);
				this.roleList = rows;
			},
			async submit() {
				await assignRoles({
					id: this.userId,
					roleIds: this.checkList,
				});
				this.$message.success("设置成功");
				this.close();
			},
		},
	};
</script>