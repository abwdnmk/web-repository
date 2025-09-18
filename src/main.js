import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'

// createApp(App).mount("#app");

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)

app.use(router)
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app')