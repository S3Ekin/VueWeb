import Vue from 'vue'
import App from "./App"

new Vue(App).$mount("#app")
if (module.hot) {
  module.hot.accept("./App.ts", () => {
    import("./App").then(res => {
      const config = res.default
      new Vue(config).$mount("#app")
    })
  })
}
