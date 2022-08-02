<template>
	<div class="dashboard-container">
		<div class="dashboard-text">name: {{ name }}</div>
		<UploadExcle :on-success="success" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: "Dashboard",
		computed: {
			...mapGetters(["name"]),
		},
		methods: {
			success(data) {
				console.log(data);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.dashboard {
		&-container {
			margin: 30px;
		}
		&-text {
			font-size: 30px;
			line-height: 46px;
		}
	}
</style>
