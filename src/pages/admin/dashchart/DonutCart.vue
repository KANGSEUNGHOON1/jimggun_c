<template>
  <div class="chart-card">
    <v-chart
      :option="pieOption"
      autoresize
      style="width: 100%; height: 100%; min-height: 280px; " />
  </div>
</template>

<script setup>
import VChart from "vue-echarts";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  CanvasRenderer,
]);

//  데이터 정의
const pieData = [
  { value: 4000, name: "서울", itemStyle: { color: "#F56565" } },
  { value: 2400, name: "부산", itemStyle: { color: "#ED8936" } },
  { value: 1900, name: "제주", itemStyle: { color: "#ECC94B" } },
  { value: 1500, name: "강릉", itemStyle: { color: "#48BB78" } },
  { value: 1200, name: "경주", itemStyle: { color: "#4299E1" } },
  { value: 1000, name: "기타", itemStyle: { color: "#9F7AEA" } },
];

//  총합 계산
const totalReservation = pieData.reduce((sum, item) => sum + item.value, 0);

//  옵션 정의
const pieOption = {
  tooltip: {
    trigger: "item",
  },

  series: [
    {
   label: {
  show: true,
  position: "outside",
  formatter: (params) => {
    const percent = params.percent;
    const formattedPercent = Number.isInteger(percent)
      ? `${percent}%`
      : `${percent.toFixed(1)}%`;
    return `{name|${params.name}}{percent|(${formattedPercent})}`;
  },
  rich: {
    name: {
      align: "center",
      verticalAlign: "middle",
      fontSize: 12,
      fontWeight: "bold",
      color: "#505050",
      lineHeight: 18
    },
    percent: {
      align: "center",
      verticalAlign: "middle",
      fontSize: 12,
      color: "#505050",
      lineHeight: 18
    }
  }
},

      labelLine: {
        show: true,
        length: 15,
        length2: 10,
      },
      type: "pie",
      // top: "-50",
      radius: ["40%", "65%"],
      data: pieData,
      itemStyle: {
        borderRadius: 10, //  조각의 라운드 처리
        borderColor: "#ffffff", //  구역 간 구분선
        borderWidth: 6, //  구분선 두께
      },
      emphasis: {
        scale: true,
        scaleSize: 10,
        itemStyle: {
          shadowBlur: 15,
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  ],
  // 중앙 텍스트 자동 삽입
 graphic: {
  type: "group",
  left: "center",
  top: "center",
  children: [
    {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: `${totalReservation.toLocaleString()}`,
        textAlign: "center",
         textVerticalAlign: "middle",
        fill: "#111",
        fontSize: 18, //  숫자 크기
        fontWeight: "bold",
      },
      top: -12, // 위쪽으로 조금 이동
      left: 0,
    },
    {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: "총 예약 건",
        textAlign: "center",
         textVerticalAlign: "middle",
        fill: "#111",
        fontSize: 12, // 아래 텍스트 크기
        fontWeight: 500,
      },
      top: 13,
      left: 5,
    },
  ],
},

};
</script>

<style scoped>
.chart-card {
  width: 100%;
  /* min-height: 200px; */
  height: 100%;
  position: absolute;
  top: -25px;
  /* background-color: antiquewhite; */
  left: 0;
}
</style>
