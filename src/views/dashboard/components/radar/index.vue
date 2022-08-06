<template>
	<div ref="myDiv" class="radar-echart" />
</template>

<script>
	import * as echarts from "echarts";
	import radarData from "./radar";
	export default {
		name: "HRSaasIndex",

		data() {
			return {
				myChart: null,
			};
		},

		mounted() {
			this.myChart = echarts.init(this.$refs.myDiv);
			this.myChart.setOption(radarData);
			this.initData();
		},

		methods: {
			initData() {
				setTimeout(() => {
					const data = [
						{
							value: [10, 1, 100, 5, 100, 0],
							name: "张三",
						},
						{
							value: [50, 50, 50, 50, 50, 10],
							name: "李四",
						},
					];
					radarData.series[0].data = data;
					this.myChart.setOption(radarData);
				}, 3000);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.radar-echart {
		width: 600px;
		height: 400px;
	}
</style>