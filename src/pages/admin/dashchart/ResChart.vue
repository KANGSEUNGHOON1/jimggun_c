<template>
  <Bar
    :data="chartData"
    :options="chartOptions"
    :plugins="[reservationUnitPlugin]"
    :key="isDark" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from "vue";
import { useReservationData } from "@/composables/useReservationdata";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// Props
const props = defineProps({
  mode: String,
  year: [String, Number],
  month: [String, Number],
  week: [String, Number],
});

const mode = computed(() => props.mode);

// 다크모드
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

//  단위:건 표기
const reservationUnitPlugin = {
  id: "reservationUnitPlugin",
  beforeDraw(chart) {
    const { ctx, chartArea } = chart;
    const offsetX =
      mode.value === "yearly" ? -46.5 : mode.value === "monthly" ? -40 : -36.5;
    const offsetY = -25;
    ctx.save();
    ctx.fillStyle = isDark.value ? "#6E7284" : "#999999";
    ctx.font = "11px Pretendard, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("단위: 건", chartArea.left + offsetX, chartArea.top + offsetY);
    ctx.restore();
  },
};

// 데이터 상태값
const aggregated = ref({
  labels: [],
  member: [],
  guest: [],
});
watchEffect(async () => {
  const result = await useReservationData(
    props.mode,
    props.year,
    props.month,
    props.week
  );
  aggregated.value = result.aggregated.value;
});

// 차트 데이터
const chartData = computed(() => {
  const a = aggregated.value;
  if (!a.labels.length || !a.member.length || !a.guest.length) {
    return { labels: [], datasets: [] };
  }

  const total = a.member.map((m, i) => m + a.guest[i]);

  return {
    labels: a.labels,
    datasets: [
      {
        type: "line",
        label: "총 예약",
        data: total.map((v) => (v === 0 ? null : v)), // ✅ 해당 지점만 제외
        borderColor: isDark.value ? "#93C5FD" : "#BFDBFE",
        backgroundColor: isDark.value ? "#2A2C41" : "#ffffff",
        pointRadius: total.map((v) => (v === 0 ? 0 : 4)),
        borderWidth: 1.5,
        tension: 0,
        yAxisID: "y",
        fill: false,
        order: 0,
      },
      {
        type: "bar",
        label: "회원 예약",
        data: a.member.map((v) => (v === 0 ? NaN : v)), // 🔥 핵심
        backgroundColor: "#3B82F6",
        borderRadius: 1,
        barThickness: 20,
        yAxisID: "y",
        order: 1,
      },
      {
        type: "bar",
        label: "비회원 예약",
        data: a.guest.map((v) => (v === 0 ? NaN : v)),
        backgroundColor: "#93C5FD",
        borderRadius: 1,
        barThickness: 20,
        yAxisID: "y",
        order: 1,
      },
    ],
  };
});

// 차트 옵션
const chartOptions = computed(() => {
  const isWeekly = props.mode === "weekly";
  const isMonthly = props.mode === "monthly";
  const isYearly = props.mode === "yearly";
  const stepSize = isWeekly ? 100 : isMonthly ? 1000 : 3000;
  const max = stepSize * 5;

  return {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 35 },
    },
    plugins: {
      reservationUnitPlugin: {},
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          boxWidth: 15,
          boxHeight: 5,
          borderRadius: 4,
          font: { size: 11 },
          color: isDark.value ? "#9FA3B5" : "#767676",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}건`,
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
          tickLength: 10,
        },
        border: { display: false },
        ticks: {
          color: isDark.value ? "#9FA3B5" : "#767676",
        },
      },
      y: {
        beginAtZero: true,
        max,
        grid: {
          drawBorder: false,
          tickLength: 10,
          color: isDark.value ? "#3F415A" : "#E5E7EB",
        },
        border: { display: false },
        ticks: {
          stepSize,
          callback: (value) => {
            if (isMonthly) return `${value}`.padStart(4, " ");
            if (isYearly) return `${(value / 1).toFixed(0)}`.padStart(4, " ");
            return `${value}`.padStart(4, " ");
          },
          font: { size: 12 },
          color: isDark.value ? "#9FA3B5" : "#767676",
        },
      },
    },
  };
});
</script>

<style scoped></style>
