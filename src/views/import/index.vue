<template>
	<div>
		<el-card>
			<!-- <h2>type ={{$route.query.type}}</h2> -->
			<PageTools :text="`导入${type}列表`" />
			<UploadExcle :on-success="success" />
		</el-card>
	</div>
</template>

<script>
	import { batchUserApi } from "@/api/employees";
	export default {
		name: "HrsaasImport",

		data() {
			return {
				type: this.$route.query.type,
			};
		},

		mounted() {},

		methods: {
			async success({ herder, results }) {
				// console.log(data);
				const keyList = {
					入职日期: "timeOfEntry",
					手机号: "mobile",
					姓名: "username",
					转正日期: "correctionTime",
					工号: "workNumber",
				};
				let arr = [];
				// console.log(results);
				if (results) {
					results.forEach((item) => {
						let obj = {};
						Object.keys(item).forEach((val) => {
							const timp = ["timeOfEntry", "correctionTime"];
							if (timp.includes(keyList[val])) {
								obj[keyList[val]] = this.formatDate(item[val], "/");
							} else {
								obj[keyList[val]] = item[val];
							}
						});
						arr.push(obj);
					});
					await batchUserApi(arr);
					this.$message.success("导入成功");
					this.$router.back();
					return;
				}
			},
			//
			formatDate(numb, format) {
				const time = new Date((numb - 1) * 24 * 3600000 + 1);
				time.setYear(time.getFullYear() - 70);
				const year = time.getFullYear() + "";
				const month = time.getMonth() + 1 + "";
				const date = time.getDate() - 1 + "";
				if (format && format.length === 1) {
					return year + format + month + format + date;
				}
				return (
					year +
					(month < 10 ? "0" + month : month) +
					(date < 10 ? "0" + date : date)
				);
			},
		},
	};
</script>

<style lang="scss" scoped>
</style>