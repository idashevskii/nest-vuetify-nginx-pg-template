import 'reflect-metadata';

import { createApp } from 'vue';
import { registerPlugins } from '@core/utils/plugins';
import { createPinia } from 'pinia';
import { createInjector } from '@/utils/di';

import App from './App.vue';
// import router from './router';
import { AppConfig } from '@/services/AppConfig';
import { ApiService } from '@/services/ApiService';

// import 'vuetify/styles';

// Styles
import '@core/scss/template/index.scss';
import '@layouts/styles/index.scss';

const injector = createInjector({
  services: [AppConfig, ApiService],
});

(async () => {
  try {
    const config = injector.get(AppConfig);
    await config.init();

    const app = createApp(App);

    app.use(createPinia());
    // app.use(router);
    app.use(injector);

    // Register plugins
    registerPlugins(app);

    app.mount('#app');
  } catch (e) {
    alert('Error: ' + e);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
})();
