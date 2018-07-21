export default {
  updateCountAsync (store, data) {
    setTimeout(() => { // 只有action支持异步，mutation支持同步修改
      store.commit('updateCount', data.num)
    }, data.time)
  }
}
