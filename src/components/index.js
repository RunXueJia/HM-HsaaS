
import PageTools from '@/components/PageTools'
import UploadExcle from './UpLoadExcel'
import uploadImage from './uploadImage'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
export default {
    install(Vue) {
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcle', UploadExcle)
        Vue.component('uploadImage', uploadImage)
        Vue.component('ScreenFull', ScreenFull)

        Vue.use(Print)
    }
}