<template>
  <Bar
  :data="chartData"
  :options="chartOptions"
  :plugins="[DataLabelsPlugin, dashedPlugin]"
  :key="isDark"
/>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,computed  } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
// 다크모드 
const isDark = ref(document.documentElement.classList.contains("dark"));

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

onMounted(() => {
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
});

onBeforeUnmount(() => {
  observer.disconnect();
});

// Chart.js 필수 요소 등록
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// 데이터 정의
const labels = ['활동 중 기사', '배차 완료', '배차 대기', '취소/지연 예약']
const values = [524, 308, 360, 440]
const colors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DC55F7']

const chartData = {
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: colors,
      borderRadius: 50,
      barThickness: 15
    }
  ]
}

//  점선 수동 렌더링 플러그인 정의
// computed로 다크모드 대응되는 dashed plugin 생성
const dashedPlugin = computed(() => ({
  id: 'customDashedGridPlugin',
  beforeDraw(chart) {
    const { ctx, chartArea, scales } = chart
    const xAxis = scales.x

    ctx.save()
    ctx.lineWidth = 1

    xAxis.ticks.forEach((tick, index) => {
      const value = tick.value
      const x = xAxis.getPixelForTick(index)

      if (value === 0) {
        ctx.setLineDash([])
        ctx.strokeStyle = isDark.value ? '#C0C3D1' : '#505050'
      } else {
        ctx.setLineDash([4, 4])
        ctx.strokeStyle = isDark.value ? '#3F415A' : '#E5E7EB'
      }

      ctx.beginPath()
      ctx.moveTo(x, chartArea.top)
      ctx.lineTo(x, chartArea.bottom)
      ctx.stroke()
    })

    ctx.restore()
  }
}))

// chartOptions도 computed로 변경
const chartOptions = computed(() => ({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
    datalabels: {
      display: true,
      anchor: 'end',
      align: 'end',
      offset: 6,
      color: isDark.value ? '#9FA3B5' : '#505050',
      font: {
        size: 12,
        weight: '500'
      },
      formatter: (value) => `${value}건`
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 600,
      ticks: {
        stepSize: 100,
        color: isDark.value ? '#5A5E6D' : '#999999',
        font: { size: 11, weight: '300' }
      },
      grid: {
        display: false,
        drawTicks: false,
        drawBorder: false
      },
      border: {
        display: false
      }
    },
    y: {
      ticks: { display: false },
      grid: { display: false },
      border: { display: false }
    }
  }
}))

</script>

<style scoped>

</style>
