import DateTimePicker from '../src/index.js'
import Vue from 'vue'

new Vue({
  el: '#app',
  components: {
    DateTimePicker
  },
  data: {
    value: '2018-09-11'
  },
  methods: {
    change (value) {
      console.log('++++++++++++++++++++++++++' + value)
    }
  },
  template: '<div style="margin: 100px; padding: 200px;height:20px;overflow: y"><DateTimePicker :value="value" @change="change" /></div>'
})
