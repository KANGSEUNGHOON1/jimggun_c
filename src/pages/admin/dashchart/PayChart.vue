<template>
  <Line
    :data="chartData"
    :options="chartOptions"
    :plugins="[revenueUnitPlugin]"
    :key="isDark" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  Title,
} from "chart.js";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
  Title,
  Legend
);
// 단위: 원
const revenueUnitPlugin = {
  id: "revenueUnitPlugin",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    const currentMode = mode.value;
    const offsetX =
      currentMode === "yearly"
        ? -35.5
        : currentMode === "monthly"
        ? -39.5
        : -36;
    const offsetY =
      currentMode === "yearly" ? -25 : currentMode === "monthly" ? -25 : -25;
    ctx.save();
    ctx.fillStyle = isDark.value ? "#6E7284" : "#999999";
    ctx.font = "11px Pretendard, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("단위: 만원", chartArea.left + offsetX, chartArea.top + offsetY);
    ctx.restore();
  },
};
const isDark = ref(document.documentElement.classList.contains("dark"));

const observer = new MutationObserver(() => {
  isDark.value = document.documentElement.classList.contains("dark");
});

onMounted(() => {
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});

// PayChart.vue, ResChart.vue 공통
const props = defineProps({
  mode: String,
  year: [String, Number],
  month: [String, Number],
  week: [String, Number],
});

const mode = computed(() => props.mode);
const dailyLabels = Array.from({ length: 10 }, (_, i) => `${i + 1}일`);
const dailyData = [15, 11, 26, 15, 30, 26, 35, 40, 20, 29];

const weeklyLabels = ["월", "화", "수", "목", "금", "토", "일"];
const weeklyData = [
  2600000, 1100000, 3500000, 3700000, 4500000, 3100000, 2700000,
];

const monthlyLabels = ["1주차", "2주차", "3주차", "4주차", "5주차"];
const monthlyData = [15000000, 25000000, 28000000, 38000000, 31500000];

const yearlyLabels = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];
const yearlyData = [
  280560000, 248000000, 262000000, 272000000, 300000000, 280000000, 340000000, 316000000, 350000000, 320000000, 340000000,
  410000000,
];

const chartData = computed(() => {
  const isWeekly = props.mode === "weekly";
  const isMonthly = props.mode === "monthly";
  const isYearly = props.mode === "yearly";
  const labels = isWeekly
    ? weeklyLabels
    : isMonthly
    ? monthlyLabels
    : yearlyLabels;
  const data = isWeekly ? weeklyData : isMonthly ? monthlyData : yearlyData;

  return {
    labels,
    datasets: [
      {
        label: "매출",
        data: data,
        borderColor: "#24C76F",
        pointBackgroundColor: isDark.value ? "#2A2C41" : "#ffffff",
        pointRadius: 4,
        borderWidth: 1.5,
        tension: 0,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 235);
          gradient.addColorStop(0, "rgba(36, 199, 111, 0.8)");
          gradient.addColorStop(1, "rgba(36, 199, 111, 0)");
          return gradient;
        },
      },
    ],
  };
});

const chartOptions = computed(() => {
  const isWeekly = props.mode === "weekly";
  const isMonthly = props.mode === "monthly";
  const isYearly = props.mode === "yearly";
  const stepSize = isWeekly ? 1000000 : isMonthly ? 10000000 : 100000000;
  const max = stepSize * 5; // 항상 6줄

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 35, // ← 그래프 내부 상단 공간 확보
      },
    },
    plugins: {
      revenueUnitPlugin: {}, // 단위표기
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `${value.toLocaleString()}원`; // 쉼표 추가된 금액 표기
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: true,
          color: isDark.value ? "#3F415A" : "#E5E7EB",
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: true,
          tickLength: 10,
        },
        border: {
          display: false,
        },
        ticks: {
          color: isDark.value ? "#9FA3B5" : "#767676",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          tickLength: 10,
          color: isDark.value ? "#3f415a" : "#E5E7EB",
        },
        border: {
          display: false,
        },
        max,
        ticks: {
          stepSize,
          callback: (value) => {
            if (isWeekly)
              return `${(value / 10000).toFixed(0)}`.padStart(4, " ");
            if (isMonthly)
              return `${(value / 10000).toFixed(0)}`.padStart(4, " ");
            if (isYearly)
              return `${(value / 10000000).toFixed(0)}k`.padStart(4, " ");
            return value.toString().padStart(4, " "); // 숫자도 4자까지 확보
          },
          color: isDark.value ? "#9FA3B5" : "#767676",
        },
      },
    },
  };
});
</script>
