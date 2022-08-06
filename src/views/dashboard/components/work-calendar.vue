<template>
	<div>
		<el-row type="flex" justify="end">
			<el-select @change="changeDate()" size="small" v-model="currentYear" placeholder="请输入年份">
				<el-option v-for="item in yearList" :key="item" :label="item" :value="item">{{item}}</el-option>
			</el-select>
			<el-select @change="changeDate()" size="small" v-model="currentMonth" placeholder="请输入月份">
				<el-option v-for="item in 12" :key="item" :label="item" :value="item">{{item}}</el-option>
			</el-select>
		</el-row>
		<el-calendar v-model="currentDate">
			<!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
			<template slot="dateCell" slot-scope="{date, data}">
				<div class="date-content">
					<span class="text">{{ data.day | getDay }}</span>
					<span v-if="isWeek(date)" class="rest">休</span>
				</div>
			</template>
		</el-calendar>
	</div>
</template>

<script>
	export default {
		name: "HRSaasWorkCalendar",
		props: {
			startDate: {
				type: Date,
				default: () => new Date(),
			},
		},
		data() {
			return {
				yearList: [],
				currentYear: "",
				currentMonth: "",
				currentDate: "",
			};
		},
		filters: {
			getDay(date) {
				const day = date.split("-")[2];
				if (day < 10) {
					return day * 1;
				}
				return day;
			},
		},
		mounted() {},
		created() {
			this.currentYear = this.startDate.getFullYear();
			this.currentMonth = this.startDate.getMonth() + 1;
			this.yearList = Array.from(Array(11), (item, index) => {
				return this.currentYear - 5 + index;
			});
			this.changeDate(this.startDate.getDate());
		},
		methods: {
			isWeek(val) {
				return [0, 6].includes(val.getDay());
			},
			changeDate(val) {
				// console.log(val);
				const YY = this.currentYear;
				const MM = this.currentMonth;
				const DD = val || 1;
				this.currentDate = new Date(YY + "-" + MM + "-" + DD);
			},
		},
	};
</script>

<style lang="scss" scoped>
	::v-deep .el-calendar-day {
		height: auto;
	}
	::v-deep .el-calendar-table__row td,
	::v-deep .el-calendar-table tr td:first-child,
	::v-deep .el-calendar-table__row td.prev {
		border: none;
	}
	.date-content {
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
	}
	.date-content .rest {
		color: #fff;
		border-radius: 50%;
		background: rgb(250, 124, 77);
		width: 20px;
		height: 20px;
		line-height: 20px;
		display: inline-block;
		font-size: 12px;
		margin-left: 10px;
	}
	.date-content .text {
		width: 20px;
		height: 20px;
		line-height: 20px;
		display: inline-block;
	}
	::v-deep .el-calendar-table td.is-selected .text {
		background: #409eff;
		color: #fff;
		border-radius: 50%;
	}
	::v-deep .el-calendar__header {
		display: none;
	}
</style>