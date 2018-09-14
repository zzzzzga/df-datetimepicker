# df-datetimepicker

基于vue开发的日期时间选择组件

## 二次开发

```
git clone https://github.com/zzzzzga/df-datetimepicker.git
cd df-datetimepicker
npm i
npm run dev
```

## 快速使用

### 安装

```
npm i -S df_datetimepicker
```

### 引用

```vue
<template>
  <div>
    ...
    <dfDatetimepicker />
    ...
  </div>
</template>
<script>
import dfDatetimepicker from 'df_datetimepicker'
export default {
  ...
  components: {
    dfDatetimepicker
  },
  ...
}
</script>
```

## 功能介绍

+ 实现简单的日期时间选择

#### 属性值
| 参数 | 类型 | 默认值 | 描述
| -----|------|-----| ---------
|value | String | '' | 初始值
| placeholder    |  String    | '选择日期时间' | 占位内容
| monthTip  | Array | ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] | 各个月份显示格式
| weekTip | Array | ['一', '二', '三', '四', '五', '六', '日'] | 各个星期显示格式
| defaultSelectNow | Boolean | true | 默认是否选中当前日期
| minuteStep | Number | 15 | 分钟的间隔
| readonly | Boolean | false | 输入框只读，只可选择，不能输入
|canSelectRange | Array | null | 定义可以选择的范围，如['2018-9-10', '2018-9-20']
|dateFormatStr | String | yyyy年MM月dd日 hh:mm | 日期在输入框中的格式

#### 事件
|名称|参数|描述
|---|---|---
|change|String类型 选择的日期通过dateFormatStr格式化后 | 当选择日期后会触发该事件


## 效果图

![df-datetimepicker](./1.png)

## 关于作者

如果你感觉有收获，欢迎给我打赏 ———— 以激励我更多输出优质开源内容

<img src="./2.jpg" width="200">

