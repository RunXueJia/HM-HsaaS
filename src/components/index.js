
import PageTools from '@/components/PageTools'
import UploadExcle from './UpLoadExcel'
import uploadImage from './uploadImage'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import TagsView from './TagsView'
import lang from './lang'
export default {
    install(Vue) {
        Vue.component('TagsView', TagsView)
        Vue.component('PageTools', PageTools)
        Vue.component('UploadExcle', UploadExcle)
        Vue.component('uploadImage', uploadImage)
        Vue.component('ScreenFull', ScreenFull)
        Vue.component('ThemePicker', ThemePicker)
        Vue.component('lang', lang)
        Vue.use(Print)
    }
}