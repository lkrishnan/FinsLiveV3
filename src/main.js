import "./main.css"
import "./registerServiceWorker"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Vue from "vue"
import vuetify from "./plugins/vuetify"
import VueAnalytics from "vue-analytics"

Vue.config.productionTip = false

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
	id: 'UA-10808705-1'
});

new Vue( {
    router,  
  	store,
    vuetify,
    render: h => h( App )

} ).$mount( "#app" )
