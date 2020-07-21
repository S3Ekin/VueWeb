import Vue from 'vue'
new Vue({
  // el:"#app",
  data: {
    message: 'Hello 4Vue!',
    t: 'ee'
  },
  template: '<p>{{t}}</p>'
}).$mount('#app')
