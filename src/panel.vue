<template>
  <div ref="dropdownMenu" class="df-dropdown-menu" v-show="isShow" :style="{top: top + 'px', left: left + 'px'}">
    <div style="position: relative;">
      <div class="df-dropdown-header">
        <span @click="clickLeft" :class="[canPreDate?'shadow':'disabled']" class="dropdown-header_left"></span>
        <span @click="clickCenter" class="dropdown-header_center shadow">{{showTitle}}</span>
        <span @click="clickRight" :class="[canNextDate?'shadow':'disabled']" class="dropdown-header_right"></span>
      </div>
      <div class="dropdown-context">
        <div v-if="status === 'date'">
          <div v-for="(val, index) in new Array(7)" :key="val">
            <div v-if="index == 0">
              <div class="date font-blod" v-for="week in weeks" :key="week">
                {{week}}
              </div>
            </div>
            <div v-else>
              <div @click="chooseDate(day)"
                :style="day.active ? '':'border-radius: 0px'"
                :class="[dateYear === now.getFullYear() && dateMonth === now.getMonth() 
                && day.getDate() === now.getDate() ? 'today':'',
                day.getFullYear() === _dateYear && day.getMonth() === _dateMonth 
                && day.getDate() === _dateDate ? 'active':'', day.active ? 'shadow' : 'disabled',
                isCurrentMonth(day) && day.active ? '' : 'font-color_hui', 'date']"
                  v-for="day in getCurrentLineDate(index)" :key="day.getDate()">
                  {{day.getDate()}}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-container" v-if="status === 'month'">
          <div @click="chooseMonth(index)" class="flex-part shadow" 
            :class="[dateYear === _dateYear && index === _dateMonth ? 'active':'']" 
            v-for="(val, index) in months" :key="val">{{val}}</div>
        </div>

        <div class="flex-container" v-if="status === 'year'">
          <div @click="chooseYear(val.year)" class="flex-part shadow" :class="[val.classHui ? 'font-color_hui' : '', val.year === now.getFullYear() ? 'active':'']" v-for="(val) in showYear" :key="val.year">
            {{val.year}}
          </div>
        </div>

        <div class="flex-container" v-if="status === 'hour'">
          <div @click="chooseHour(val.hourNum)" class="flex-part flex-part-2 shadow" :class="[val.active ? 'active' : '']" v-for="(val) in showHour" :key="val.hour">
            {{val.hour}}
          </div>
        </div>

        <div class="flex-container" v-if="status === 'minute'">
          <div @click="chooseMinute(val.minuteNum)" class="flex-part flex-part-2 shadow" :class="[val.active ? 'active' : '']" v-for="(val) in showMinute" :key="val.minute">
            {{val.minute}}
          </div>
        </div>
      </div>
      <div class="dropdown-footer">
        <div @click="toToday" :class="[canToday?'shadow':'disabled font-color_hui']" class="dropdown-today">今日</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dateTimePicker',
  props: {
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
    canSelectRange: {
      type: Array,
      default: () => undefined
    },
    dateFormatStr: {
      type: String,
      default: 'yyyy年MM月dd日 hh:mm'
    }
  },
  data () {
    return {
      top: 0,
      left: 0,
      isShow: false,
      dateStr: '',
      date: new Date(),
      now: new Date(),
      date_: new Date(),
      // 视图状态
      status: 'date'  // date/month/year/hour/minute
    }
  },
  methods: {
    // 获得当前行的日期
    getCurrentLineDate (index) {
      return this.showDate.slice((index - 1) * 7, index * 7)
    },
    isCurrentMonth (day) {
      return this.date.getMonth() === day.getMonth() && this.date.getFullYear() && day.getFullYear()
    },
    dateFormat (d, fmt) {
      var o = {   
        "M+" : d.getMonth()+1,                 //月份   
        "d+" : d.getDate(),                    //日   
        "h+" : d.getHours(),                   //小时   
        "m+" : d.getMinutes(),                 //分   
        "s+" : d.getSeconds(),                 //秒   
        "q+" : Math.floor((d.getMonth()+3)/3), //季度   
        "S"  : d.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;
    },
    clickLeft () {
      switch (this.status) {
        case 'date':
          // this.date.setDate(this.dateDate - 1)
          this.date = new Date(this.dateYear, this.dateMonth - 1, 1)
          break;
        case 'month':
          this.date = new Date(this.dateYear - 1, 0, 1)
          break;
        case 'year':
          this.date = new Date(this.dateYear - 10, 0, 1)
          break;
        case 'hour':
          if (!this.canPreDate) return
          // this.date.setHours(this.dateHour - 1)
          this.date = new Date(this.date.setDate(this.dateDate - 1))
          break;
        case 'minute':
          if (!this.canPreDate) return
          // this.date.setMinutes(this.dateMinute - 1)
          this.date = new Date(this.date.setDate(this.dateDate - 1))
          break;
        default:
          break;
      }
    },
    clickRight () {
      switch (this.status) {
        case 'date':
          this.date = new Date(this.dateYear, this.dateMonth + 1, 1)
          break;
        case 'month':
          this.date = new Date(this.dateYear + 1, 0, 1)
          break;
        case 'year':
          this.date = new Date(this.dateYear + 10, 0, 1)
          break;
        case 'hour':
          if (!this.canNextDate) return
          this.date = new Date(this.date.setDate(this.dateDate + 1))
          break;
        case 'minute':
          if (!this.canNextDate) return
          this.date = new Date(this.date.setDate(this.dateDate + 1))
          break;
        default:
          break;
      }
    },
    clickCenter () {
      switch (this.status) {
        case 'date':
          this.status = 'month'
          break;
        case 'month':
          this.status = 'year'
          break;
        case 'year':
          break;
        case 'hour':
          this.status = 'date'
          break
        case 'minute':
          this.status = 'hour'
          break;
        default:
          break;
      }
    },
    chooseYear (year) {
      this.date = new Date(this.date.setYear(year))
      this.status = 'month'
    },
    chooseMonth (m) {
      this.date = new Date(this.date.setMonth(m))
      this.status = 'date'
    },
    chooseDate (day) {
      if (!this.isRange(day)) return
      this.date = new Date(day)
      if (this.date_) {
        this.date_ = new Date(this.date_.setDate(this.dateDate))
      } else {
        this.date_ = new Date(this.date)
      }
      this.status = 'hour'
    },
    chooseHour (h) {
      this.date = new Date(this.date.setHours(h))
      if (this.date_) {
        this.date_ = new Date(this.date_.setHours(this.dateHour))
      } else {
        this.date_ = new Date(this.date)
      }
      this.status = 'minute'
    },
    chooseMinute(m) {
      this.date = new Date(this.date.setMinutes(m))
      if (this.date_) {
        this.date_ = new Date(this.date_.setMinutes(this.dateMinute))
      } else {
        this.date_ = new Date(this.date)
      }
      this.dateStr = this.dateFormat(this.date, this.dateFormatStr)
      this.$emit('change', this.dateStr)
      this.isShow = false
    },
    toToday () {
      if (!this.canToday) return
      this.date = new Date()
      this.date_ = new Date()
      this.dateStr = this.dateFormat(this.date, this.dateFormatStr)
      this.$emit('change', this.dateStr)
      this.isShow = false
    },
    setDate_ () {
      if (this.defaultSelectNow) {
        this.date_ = new Date()
      } else {
        this.date_ = null
      }
    },
    openCalandar () {
      if (!this.dateStr) {
        this.date = new Date()
        this.setDate_()
      } else {
        this.date = new Date(this.dateStr.replace('年','-').replace('月','-').replace('日',''))
        if ('Invalid Date' === this.date.toString()) {
          this.date = new Date()
          this.setDate_()
        } else {
            this.date_ = new Date(this.date)
        }
      }
      this.isShow = true
      this.status = 'date'
    },
    isRange (day) {
      if (this.rangeBeginTime) {
        if (day < this.rangeBeginTime) {
          return false
        }
      }
      if (this.rangeEndTime) {
        if (day > this.rangeEndTime) {
          return false
        }
      }
      return true
    }
  },
  computed: {
    canPreDate () {
      if (!this.canSelectRange) return true
      return this.isRange(new Date(this.dateYear, this.dateMonth, this.dateDate - 1))
    },
    canNextDate () {
      if (!this.canSelectRange) return true
      return this.isRange(new Date(this.dateYear, this.dateMonth, this.dateDate + 1))
    },
    canToday () {
      if (!this.canSelectRange) return true
      return this.isRange(new Date())
    },
    rangeBeginTime () {
      if (this.canSelectRange && this.canSelectRange[0]) {
        let begin = new Date(this.canSelectRange[0])
        begin = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate())
        return begin
      }
      return null
    },
    rangeEndTime () {
      if (this.canSelectRange && this.canSelectRange[1]) {
        let end = new Date(this.canSelectRange[1])
        end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)
        return end
      }
      return null
    },
    weeks () {
      return this.weekTip;
    },
    months () {
      return this.monthTip;
    },
    // date视图日历显示
    showDate () {
      // 长度 42
      const arr = []
      // 找开始日期
      let d = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      for (let i = 0; i < 7; i++) {
        d.setDate(d.getDate() - 1)
        if (d.getDay() === 1) break
      }
      for (let j = 0; j < 42; j++) {
        let temT = new Date(d)
        temT.setDate(temT.getDate() + j)
        temT.active = this.isRange(temT)
        arr.push(temT)
      }
      return arr
    },
    showYear () {
      const year = (this.dateYear - this.dateYear % 10)
      const arr = []
      for (let i = -1; i < 11; i++) {
        if (i < 0 || i >= 10) {
          arr.push({
            classHui: true,
            year: year + i
          })
        } else {
          arr.push({
            classHui: false,
            year: year + i
          })
        }
      }
      return arr
    },
    showHour () {
      const arr = []
      for(let i = 0; i < 24; i++) {
        arr.push({
          active: i === this._dateHour,
          hour: i + ':00',
          hourNum: i
        })
      }
      return arr
    },
    showMinute () {
      const hour = this.date.getHours()
      const arr = []
      for (let i = 0; i < 60; i += this.minuteStep) {
        arr.push({
          active: (this._dateMinute - this._dateMinute % this.minuteStep) === i,
          minute: hour + ':' + ('00' + i).slice(-2),
          minuteNum: i
        })
      }
      return arr
    },
    // 头部显示
    showTitle () {
      let title = ''
      switch (this.status) {
        case 'date':
          title = this.months[this.dateMonth] + ' ' + this.dateYear
          break;
        case 'month':
          title = this.dateYear
          break;
        case 'year':
          title = this.showYear[1].year + '-' + this.showYear[this.showYear.length - 2].year
          break;
        case 'hour':
        case 'minute':
          title = this.dateDate + ' ' + this.months[this.dateMonth] + ' ' + this.dateYear
          break;
        default:
          break;
      }
      return title;
    },
    // date 年份
    dateYear () {
      return this.date.getFullYear()
    },
    // date的月份
    dateMonth () {
      return this.date.getMonth()
    },
    dateDate () {
      return this.date.getDate()
    },
    dateHour () {
      return this.date.getHours()
    },
    dateMinute () {
      return this.date.getMinutes()
    },
    // date 年份
    _dateYear () {
      return this.date_ ? this.date_.getFullYear() : -1
    },
    // date的月份
    _dateMonth () {
      return this.date_ ? this.date_.getMonth() : -1
    },
    _dateDate () {
      return this.date_ ? this.date_.getDate() : -1
    },
    _dateHour () {
      return this.date_ ? this.date_.getHours() : -1
    },
    _dateMinute () {
      return this.date_ ? this.date_.getMinutes() : -1
    }
  }
}
</script>

<style scoped>
  .disabled {
    cursor:not-allowed;
    background-color: #eee;
  }
  .font-blod {
    font-weight: bold;
  }
  .shadow {
    cursor: pointer;
  }
  .shadow:hover {
    background-color: #eee;
  }
  .df-dropdown-menu {
    position: absolute;
    min-width: 160px;
    border: 1px solid rgba(0,0,0,.2);
    margin: 1px;
    width: 192px;
    border-radius: 3px;
    background-color: #fff;
  }
  .df-dropdown-menu::before {
    top: -7px;
    left: 6px;
    position: absolute;
    display: inline-block;
    content: '';
    border-right: 7px solid transparent;
    border-bottom: 7px solid #ccc;
    border-bottom-color: rgba(0,0,0,.2);
    border-left: 7px solid transparent;
  }
  .df-dropdown-menu::after {
    top: -6px;
    left: 7px;
    position: absolute;
    display: inline-block;
    content: '';
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
  }
  .df-dropdown-header {
    margin: 5px;
    height: 20px;
    font-size: 13px;
    font-weight: bold;
    line-height: 20px;
  }
  .dropdown-header_left, .dropdown-header_right {
    width: 26px;
    height: 20px;
    float: left;
    background: url('./assets/tiaozhuanjiantou.png') no-repeat center;
    background-size: 39% 50%;
    border-radius: 3px;
  }
  .dropdown-header_center {
    float: left;
    width: 128px;
    height: 20px;
    text-align: center;
    border-radius: 3px;
  }
  .dropdown-header_left {
    transform: rotate(180deg)
  }
  .dropdown-context {
    padding: 3px;
  }
  .date {
    width: 26px;
    height: 26px;
    line-height: 26px;
    color: #353535;
    font-size: 13px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
  }
  .flex-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 13px;
    color:#353535;
  }
  .flex-part {
    width: 42px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    border-radius: 5px;
    margin: 2px;
  }
  .flex-part-2 {
    height: 26px;
    line-height: 26px;
  }
  .dropdown-footer {
    width: 100%;
  }
  .dropdown-today {
    margin: 5px;
    border-radius: 3px;
    text-align: center;
    height: 26px;
    font-size: 13px;
    font-weight: bold;
    line-height: 26px;
  }
  /*灰色字体*/
  .font-color_hui {
    color: #999;
  }
  .today {
    background-color:#f1a325;
  }
  .active {
    background-color: #3280fc;
    color: #fff;
  }
  .active:hover {
    background-color: #3280fc;
  }
  .today:hover {
    background-color:#f1a325;
  }
</style>


