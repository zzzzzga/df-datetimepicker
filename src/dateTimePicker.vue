<template>
  <div :class="[disabled ? 'disabled' : '']" class="df-calandar">
    <input ref="dropdownInput" :class="[disabled ? 'disabled' : '']" class="df-input" :disabled="disabled" :readonly="readonly" @focus="openCalandar" type="text"  v-model="dateStr" :placeholder="placeholder" />
  </div>
</template>
<script>
import panel from './panel.vue'
import Vue from 'vue'
export default {
  name: 'dateTimePicker',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '选择日期时间'
    },
    monthTip: {
      type: Array,
      default: () => ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    weekTip: {
      type: Array,
      default: () => ['一', '二', '三', '四', '五', '六', '日']
    },
    defaultSelectNow: {
      type: Boolean,
      default: true
    },
    minuteStep: {
      type: Number,
      default: 15
    },
    readonly: false,
    canSelectRange: {
      type: Array,
      default: () => undefined
    },
    dateFormatStr: {
      type: String,
      default: 'yyyy年MM月dd日 hh:mm'
    },
    disabled: false
  },
  data () {
    return {
      panel: undefined,
      dateStr: ''
    }
  },
  mounted () {
    const dropmenu = document.createElement('div')
    dropmenu.id = 'dropmenu'
    document.body.appendChild(dropmenu);
    this.panel = new Vue({
      el: '#dropmenu',
      components: {
        panel
      },
      render: (h) =>
        h('panel',{
          props: {
            monthTip: this.monthTip,
            weekTip: this.weekTip,
            defaultSelectNow: this.defaultSelectNow,
            minuteStep: this.minuteStep,
            canSelectRange: this.canSelectRange,
            dateFormatStr: this.dateFormatStr
          },
          on: {
            'change': (str) => {
              this.dateStr = str
              this.$emit('change', this.dateStr)
              this.$emit('input', this.dateStr)
            }
          }
        })
    }).$children[0]
    document.addEventListener('click', this.handleClose)
    this.panel.setDate_()
    this.dateStr = this.value
  },
  destroyed () {
    document.removeEventListener('click', this.handleClose)
  },
  methods: {
    handleClose (e) {
      var path = e.path
      for (let i = 0; i < path.length; i++) {
        if (this.panel.$el === path[i] || this.$refs['dropdownInput'] === path[i]) return
      }
      this.panel.isShow = false
    },
    openCalandar (e) {
      const input = e.path[0]
      this.panel.top = input.offsetHeight + input.offsetTop + 7
      this.panel.left = input.offsetLeft - 8
      if (!this.panel.dateStr) {
        this.panel.date = new Date()
        this.panel.setDate_()
      } else {
        this.date = new Date(this.panel.dateStr.replace('年','-').replace('月','-').replace('日',''))
        if ('Invalid Date' === this.panel.date.toString()) {
          this.panel.date = new Date()
          this.panel.setDate_()
        } else {
            this.panel.date_ = new Date(this.panel.date)
        }
      }
      this.panel.isShow = true
      this.panel.status = 'date'
    }
  }
}
</script>

<style scoped>
  .df-calandar{
    /* position: relative; */
    border: 1px solid #DBDBDB;
    border-radius: 4px;
    padding: 5px 8px;
  }
  .disabled {
    cursor:not-allowed;
    background-color: #eee;
  }
  .df-input {
    height: 20px;
    font-size: 13px;
    outline:none;
    border: none;
    width: 100%;
  }
  .df-calandar:focus {
    border: 1px solid #145ccd;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(20,92,205,.6);
  }
</style>


