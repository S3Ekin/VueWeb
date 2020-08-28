/**
 * @author: SEKin ;
 * @Date: 2020-08-28 16:27:31 ;
 * @description:  ;
 * @Last Modified time: 2020-08-28 16:27:31 ;
 */
// class-component-hooks.js
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
