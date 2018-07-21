import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDEV = process.env.NODE_ENV === 'development'

export default () => {
  return new Vuex.Store({
    strict: isDEV, // 不要在正式环境使用,警告直接在$store修改值
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
