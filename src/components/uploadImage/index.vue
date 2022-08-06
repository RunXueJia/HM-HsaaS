<template>
	<div>
		<el-upload
			:file-list="fileList"
			action="#"
			list-type="picture-card"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:on-change="onChange"
			:http-request="httprequest"
			:before-upload="before"
			:class="{'hidden' :fileList.length>=limit}"
		>
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-progress v-if="percent" style="width : 180px" :percentage="percent"></el-progress>
		<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt />
		</el-dialog>
	</div>
</template>
<script>
	import COS from "cos-js-sdk-v5";
	const cos = new COS({
		SecretId: "AKID87rKYU9XeU3LM6ZlhNlstoUu51h6F8mA",
		SecretKey: "B7oGSN4UgcIjupUu4ze4D6j6E5h3A1bv",
	});

	export default {
		name: "UpImg",
		props: {
			limit: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				dialogImageUrl: "",
				dialogVisible: false,
				fileList: [],
				currtUid: "",
				percent: 0,
			};
		},
		methods: {
			handleRemove(file, fileList) {
				// console.log(file, fileList);
				this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			onChange(file, fileList) {
				this.fileList = fileList.map((item) => item);
			},
			httprequest({ file }) {
				cos.putObject(
					{
						Bucket: "shenpengcheng-1313178987" /* 填入您自己的存储桶，必须字段 */,
						Region: "ap-nanjing" /* 存储桶所在地域，例如ap-beijing，必须字段 */,
						Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
						StorageClass: "STANDARD",
						Body: file, // 上传文件对象
						onProgress: (progressData) => {
							// console.log(JSON.stringify(progressData));
							this.percent = parseInt(progressData.percent * 100);
						},
					},
					(err, data) => {
						// console.log(err || data);
						if (err) {
							this.$message.warning("上传失败");
							return;
						}
						// console.log(data);
						this.fileList.map((item) => {
							if (item.uid === this.currtUid) {
								item.url = "http://" + data.Location;
								item.upload = true;
							}
							return item;
						});
						setTimeout(() => {
							this.percent = 0;
						}, 500);
					}
				);
			},
			before(file) {
				const typeList = ["image/jpg", "image/jpeg", "image/png"];
				if (!typeList.includes(file.type)) {
					this.$message.warning("不支持的类型");
					return false;
				}
				const maxsize = 1024 * 1024 * 10;
				if (file.size > maxsize) {
					this.$message.warning("图片大小超过限制");
					return false;
				}
				this.currtUid = file.uid;
				return true;
			},
		},
	};
</script>
<style lang='scss'>
	.hidden {
		div.el-upload {
			display: none;
		}
	}
</style>