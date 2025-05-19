<template>
  <Line :data="chartData" :options="chartOptions" :key="isDark" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,computed  } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  Title
} from 'chart.js'

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  Title
)
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

// 📥 부모에서 받은 모드 ('daily' | 'monthly')
const props = defineProps({
  mode: {
    type: String,
    default: 'daily',
  },
})

const dailyLabels = Array.from({ length: 10 }, (_, i) => `${i + 1}일`)
const dailyData = [15, 11, 26, 15, 30, 26, 35, 40, 20, 29 ]

const monthlyLabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월','9월','10월','11월','12월']
const monthlyData = [180, 120, 210, 320, 420, 360,300,430,320,180,200,270]

const chartData = computed(() => ({
  labels: props.mode === 'daily' ? dailyLabels : monthlyLabels,
  datasets: [
    {
      label: '매출',
      data: props.mode === 'daily' ? dailyData : monthlyData,
      borderColor: '#24C76F',
      pointBackgroundColor:isDark.value ?'#2A2C41': '#ffffff',
      pointRadius: 4,
      borderWidth: 1.5,
      tension: 0,
      fill: true,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx
        const gradient = ctx.createLinearGradient(0, 0, 0, 235)
        gradient.addColorStop(0, 'rgba(36, 199, 111, 0.8)')
        gradient.addColorStop(1, 'rgba(36, 199, 111, 0)')
        return gradient
      }
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.raw}k`,
      },
    }
  },
  scales: {
    x: {
       grid: { display: true,
        color: isDark.value ? "#3F415A" : "#E5E7EB",
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: true,
        tickLength: 5,
       },
      border: {
        display: false,
      },
      ticks: {
        color: isDark.value ? "#c0c3d1" : "#767676",
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
        color: isDark.value ? "#3f415a" : "#E5E7EB",
      },
      border: {
        display: false,
      },
      min: 0,
      max: props.mode === 'monthly' ? 500 : 50, //  monthly일 때 500k
      ticks: {
        stepSize: props.mode === 'monthly' ? 100 : 10, //  눈금 단위 변경
        callback: (value) => `${value}k`,
        color: isDark.value ? "#c0c3d1" : "#767676",
      },
    }
  }
}))

</script>
