import model from '../../model/client-model'

const handleError = () => {
  // handle error
}

export default {
  updateCountAsync (store, data) {
    setTimeout(() => { // 只有action支持异步，mutation支持同步修改
      store.commit('updateCount', data.num)
    }, data.time)
  },
  fetchTodos ({ commit }) {
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  }
}
