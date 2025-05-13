<template>
  <div class="chart-card">
    <v-chart :option="pieOption" autoresize style="width: 100%; height: 100%; min-height: 300px;" />
  </div>
</template>

<script setup>
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([PieChart, TitleComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const pieOption = {
  title: {
    text: '지역별 예약 분포',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    bottom: '0%',
    left: 'center'
  },
  series: [
    {
      name: '예약 수',
      type: 'pie',
      radius: ['40%', '60%'],
      data: [
        { value: 4000, name: '서울' },
        { value: 3000, name: '경기' },
        { value: 1500, name: '부산' },
        { value: 1000, name: '대전' },
        { value: 500, name: '기타' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
</script>

<style scoped>
.chart-card {
  width: 100%;
  min-height: 300px;
  height: 100%;
}
</style>
