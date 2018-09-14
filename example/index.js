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
  template: '<DateTimePicker :value="value" @change="change" />'
})
