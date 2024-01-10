import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { store } from '@/store/store';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@mdi/font/css/materialdesignicons.css';
import * as directives from 'vuetify/directives';
import { aliases, md } from 'vuetify/iconsets/md';

const app = createApp(App);
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
            md,
        },
    },
});
  
app.use(store).use(router).use(ElementPlus).use(vuetify).mount('#app');
