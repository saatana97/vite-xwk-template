import { createApp } from 'vue';

import App from './App.vue';
import plugin from './plugins';
import router from './router';
import pinia from './stores';

import './styles/main.less';
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(plugin);

app.mount('#app');
