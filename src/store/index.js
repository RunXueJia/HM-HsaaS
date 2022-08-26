import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView
  },
  getters: getters
})

export default store
