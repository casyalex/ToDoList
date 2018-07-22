import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDEV = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDEV, // 不要在正式环境使用,警告直接在$store修改值
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true, // 控制module作用域，mutation不是全局
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state', state)
            state.text = text
          }
        },
        getters: {
          textPlus (state, getters, rootState) {
            return state.text + rootState.count.num + rootState.b.text
          }
        },
        actions: {
          add ({state, commit, rootState}) {
            commit('updateCount', {num: 5879}, {root: true})
          }
        }
      },
      b: {
        state: {
          text: 2
        },
        actions: {
          textAction ({ commit }) {
            commit('a/updateText', 'test text', {root: true})
          }
        }
      }
    }
  })

  if (module.hot) { // 为Vuex加上热更替
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }

  return store
}
