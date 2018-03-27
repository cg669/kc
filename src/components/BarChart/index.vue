<template>
  <div :class="className" :style="{height:height,width:width}" ></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
const animationDuration = 6000
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    barData: {
        type: Object,
        default: {},
        required : true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        xAxis: [{
          type: 'category',
          data: [''],
          axisTick: {
            alignWithLabel: false
          },
          show:false,  
          splitLine:{  
        　　　show:false  
        　 }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          show:false,  
          splitLine:{  
        　　　show:false  
        　 }
        }],
        series: [{
          name: '付费数',
          type: 'bar',
          barMinHeight: 10,
          barWidth: '20%',
          data: [{value:this.barData.paidNum,name:'付费数'}],
          itemStyle:{
              normal:{
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#ef5663'
                }, {
                    offset: 1,
                    color: '#fe6974'
                }]),
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: '10px',
                shadowOffsetY: '10px',
                shadowBlur: 20
              }
          },
          animationDuration
        },{
          name: '预约人数',
          type: 'bar',
          barMinHeight: 10,
          barWidth: '20%',
          data: [{value:this.barData.appointmentNum,name:'预约人数'}],
          itemStyle:{
              normal:{
                color:'#ffd468',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: '10px',
                shadowOffsetY: '10px',
                shadowBlur: 100
              }
          },
          animationDuration
        },{
          name: '试听人数',
          type: 'bar',
          barMinHeight: 10,
          barWidth: '20%',
          data: [{value:this.barData.auditionNum,name:'试听人数'}],
          itemStyle:{
              normal:{
                color:'#8df596',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowOffsetX: '10px',
                shadowOffsetY: '10px',
                shadowBlur: 100
              }
          },
          animationDuration
        }]
      })
    }
  }
}
</script>