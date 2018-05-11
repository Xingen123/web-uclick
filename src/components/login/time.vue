<template>
<div class="wrapper">
				<vueCropper
					ref="cropper2"
					:img="example2.img"
					:full="example2.full"
					:outputSize="example2.size"
					:outputType="example2.outputType"
					:info="example2.info"
					:canScale="example2.canScale"
					:autoCrop="example2.autoCrop"
					:autoCropWidth="example2.autoCropWidth"
					:autoCropHeight="example2.autoCropHeight"
					:fixed="example2.fixed"
					:fixedNumber="example2.fixedNumber"
				></vueCropper>
		<input type="file"  @change="uploadImg($event, 1)"/>
		<button @click="finish('blob')" class="btn">preview(base64)</button>
		<img :src="urlimg" alt="">
</div>
</template>
<script>
import vueCropper from '@/components/login/vue-cropper'

export default {
	data() {
		return {
			urlimg:"",
			example2: {
				img: 'http://101.200.156.70/video/3.png',
				info: true,
				size: 1,
				outputType: 'jpeg',
				canScale: false,
				autoCrop: true,
				// 只有自动截图开启 宽度高度才生效
				autoCropWidth: 300,
				autoCropHeight: 250,
				// 开启宽度和高度比例
				fixed: true,
				fixedNumber: [4, 3]
			}
		}
	},
	methods: {
		uploadImg (e, num) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				if (num === 1) {
					this.example2.img = data
				}
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
		},
		finish (type) {
			var _this=this
			if (type === 'blob') {
				this.$refs.cropper2.getCropBlob((data) => {
					_this.urlimg= window.URL.createObjectURL(data)
				})
			} else {
				this.$refs.cropper.getCropData((data) => {
					test.location.href = data
				})
			}
		}
	},
	components: {
		vueCropper
	},
	beforeCreate() {
			console.log('beforeCreate')
		},
		created () {
			console.log('created')
		},
		mounted () {
			console.log('mounted')
		},
	  	destroyed () {}
}
</script>
<style>
	.wrapper{
		width: 500px;
		height: 500px;
	}
</style>
