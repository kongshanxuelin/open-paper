import SLCheckbox from './sl-checkbox'
import SLRadio from './sl-radio'
import SLSwitches from './sl-switches';
import SLDatePicker from './sl-datepicker';
import SLCollapse from './sl-collapse';
import SLUploader from './sl-upload'
import Promise from 'promise-polyfill'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
if (!window.Promise) {
	window.Promise = Promise
}

export default {
  install (Vue) {
    Vue.component('sl-checkbox', SLCheckbox)
    Vue.component('sl-radio', SLRadio)
    Vue.component('sl-switcher', SLSwitches)
    Vue.component('sl-datepicker', SLDatePicker)
    Vue.component('sl-collapse',SLCollapse);  
    Vue.component('sl-swiper', swiper);
    Vue.component('sl-swiper-slide', swiperSlide);
    Vue.component('sl-uploader', SLUploader);
  }
}

export { 
   SLCollapse, SLCheckbox, SLRadio, 
  SLSwitches, SLDatePicker
}
