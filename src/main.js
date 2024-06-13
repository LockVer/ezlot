import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import router from './router'
import i18n from './locales/i18n'
import 'buefy/dist/buefy.css'
import { EventBus } from './eventBus'

Vue.config.productionTip = false
// 全局日期格式化方法
// 全局 UTC 日期格式化方法
Vue.filter('formatDate', function(date, showTime = true) {
  if (!date) return '';

  const d = new Date(date);
  const yyyy = d.getUTCFullYear();
  const MM = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');

  let formattedDate = `${yyyy}-${MM}-${dd}`;
  if (showTime) {
    formattedDate += ` ${hh}:${mm}:${ss}`;
  }

  return formattedDate;
});

Vue.use(Buefy,{
  defaultIconPack:'fas'
});


new Vue({
  router,
  i18n,
  render: h => h(App),
  data(){
    return {
      loadingComponent: null
    }
  },
  created() {
    EventBus.$on('showloading', () => {
      this.loadingComponent=this.$buefy.loading.open();
    });
    EventBus.$on('closeloading', () => {
      this.loadingComponent.close();
    });
  }
}).$mount('#app')
