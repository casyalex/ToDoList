import Vue from 'vue'

new Vue({
  el: '#root',
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     {{isActive ? 'active' : 'not active'}}
  //     {{arr.join(' ')}}
  //     {{html}}
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
    <div
     :class="{ active: !isActive }"
     :style="[styles, styles2]"
    >
      <p :class="[{ active: isActive }]" v-html="html">{{getJoinedArr(arr)}}</p>
    </div>
  `,
  data: {
    isActive: true,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    styles: {
      color: 'red',
      appearance: 'none',
      fontSize: '50px'
    },
    styles2: {
      color: 'black'
    }
  },
  methods: {
    handleClick () {
      alert('clicked') // eslint-disable-line
    },
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
