<template>
  <Bar
    :data="chartData"
    :options="chartOptions"
    :plugins="[DataLabelsPlugin]" />
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

// ✅ Chart.js 핵심 요소 등록 (plugin은 글로벌 등록 ❌)
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const labels = ["활동 중 기사", "배차 완료", "배차 대기", "취소/지연 예약"];
const values = [524, 308, 360, 440];
const colors = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DC55F7"];

const chartData = {
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: colors,
      borderRadius: 50,
      barThickness: 15,
    },
  ],
};

const chartOptions = {
  indexAxis: "y", // 수평 막대
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
    // ✅ 여기서 datalabels 개별 등록
    datalabels: {
      display: true, // 반드시 있어야 보임!
      anchor: "end",
      align: "end",
      offset: 6,
      color: "#505050", // 진회색 텍스트
      font: {
        size: 12,
        weight: "medium",
      },
      formatter: (value) => `${value}건`,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 600,
      ticks: {
        stepSize: 100,
        color: "#999999",
        font: { size: 12 },
      },
      grid: {
        drawBorder: false,
        color: (ctx) => (Number(ctx.tick.value) === 0 ? "#767676" : "#E5E5EC"),
        lineWidth: (ctx) => (Number(ctx.tick.value) === 0 ? 2 : 1),
        borderDash: (ctx) => (Number(ctx.tick.value) === 0 ? [] : [4, 4]),
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: { display: false },
    },
  },
};
</script>
