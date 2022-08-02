
import PageTools from '@/components/PageTools'
import UploadExcle from './UpLoadExcel'
import uploadImage from './uploadImage'
export default {
    install(Vue) {
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcle', UploadExcle)
        Vue.component('uploadImage', uploadImage)
    }
}