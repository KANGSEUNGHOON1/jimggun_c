<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from "vue";
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

// 👇 모드 props ('weekly' | 'monthly')
const props = defineProps({
  mode: {
    type: String,
    default: "weekly",
  },
});

const weeklyLabels = ["월", "화", "수", "목", "금", "토", "일"];
const weeklyMember = [180, 90, 160, 100, 330, 250, 120];
const weeklyGuest = [80, 20, 190, 270, 120, 60, 150];

const monthlyLabels = ["1주차", "2주차", "3주차", "4주차"];
const monthlyMember = [580, 760, 640, 720];
const monthlyGuest = [340, 280, 420, 390];

const chartData = computed(() => {
  const isWeekly = props.mode === "weekly";
  const labels = isWeekly ? weeklyLabels : monthlyLabels;
  const member = isWeekly ? weeklyMember : monthlyMember;
  const guest = isWeekly ? weeklyGuest : monthlyGuest;
  const total = member.map((m, i) => m + guest[i]);

  return {
    labels,
    datasets: [
      {
        type: "line",
        label: "총 예약",
        data: total,
        borderColor: "#BFDBFE",
        backgroundColor: "#ffffff",
        borderWidth: 1.5,
        tension: 0,
        yAxisID: "y",
        pointRadius: 4,
        fill: false,
        order: 0,
      },
      {
        type: "bar",
        label: "회원 예약",
        data: member,
        backgroundColor: "#3B82F6",
        borderRadius: 1,
        barThickness: 20,
        yAxisID: "y",
        order: 1,
      },
      {
        type: "bar",
        label: "비회원 예약",
        data: guest,
        backgroundColor: "#93C5FD",
        borderRadius: 1,
        barThickness: 20,
        yAxisID: "y",
        order: 1,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        usePointStyle: false,
        boxWidth: 15,
        boxHeight: 5,
        borderRadius: 4,
        font: {
          size: 11,
        },
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
        color: "#E5E7EB",
        drawBorder: false,
        drawOnChartArea: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false, // 👈 이 줄 추가: y축 왼쪽 보더 제거
      },
      border: {
        display: false,
      },
      ticks: {
        stepSize: 100,
        callback: (value) => `${value}`,
        font: { size: 12 },
      },
    },
  },
};
</script>
<style scoped></style>
