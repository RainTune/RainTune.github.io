import WujieVue from "wujie-vue2";
import hostMap from "./hostMap";
import credentialsFetch from "./fetch";
import lifecycles from "./lifecycles";

export const registerApp = (Vue, router) => {
  const isProduction = process.env.NODE_ENV === "production";
  const { setupApp } = WujieVue;
  Vue.use(WujieVue)
  const props = {
    jump: (name) => {
      router.push({ name });
    },
  };
  /**
   * 大部分业务无需设置 attrs
   * 此处修正 iframe 的 src，是防止github pages csp报错
   * 因为默认是只有 host+port，没有携带路径
   */
  // const attrs = isProduction ? { src: hostMap("//localhost:5173/") } : {};
  setupApp({
    name: "vite",
    url: hostMap("//localhost:5173/"),
    // attrs,
    exec: true,
    props,
    fetch: credentialsFetch,
    ...lifecycles,
  });
}
