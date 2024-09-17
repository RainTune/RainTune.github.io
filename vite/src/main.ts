import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

if ((window as any).__POWERED_BY_WUJIE__) {
  console.log("微前端中展示!")
  let instance: any;
  (window as any).__WUJIE_MOUNT = () => {
    instance = createApp(App)
      .use(createPinia())
      .use(router)
    instance.mount("#app");
  };
  (window as any).__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  // module脚本异步加载，应用主动调用生命周期
  (window as any).__WUJIE.mount();
} else {
  console.log("本地展示!")
  createApp(App)
    .use(createPinia())
    .use(router)
    .mount("#app");
}
