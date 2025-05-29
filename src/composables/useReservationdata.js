import { ref, watchEffect } from "vue";

const rawData = ref(null);

export async function useReservationData(mode, year, month, week) {
  const aggregated = ref({
    labels: [],
    member: [],
    guest: [],
  });

  if (!rawData.value) {
    const res = await fetch("/data/reservationData_2022_2025.json");
    rawData.value = await res.json();
  }

  if (rawData.value) {
    watchEffect(() => {
      const yearData = rawData.value[year];
      if (!yearData) {
        return;
      }

      const fullList = Object.entries(yearData).map(([md, val]) => {
        const [mm, dd] = md.split("-");
        const date = new Date(`${year}-${mm}-${dd}`);
        return {
          date,
          month: +mm,
          day: +dd,
          ...val,
        };
      });

      const result = {
        labels: [],
        member: [],
        guest: [],
      };

      if (mode === "weekly") {
        const filtered = fullList.filter(
          (d) => d.month === +month && getWeekOfMonth(d.date) === +week
        );

        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const weekly = Array(7)
          .fill(0)
          .map(() => ({ member: 0, guest: 0 }));

        filtered.forEach((d) => {
          const dayIndex = d.date.getDay(); // 0=일, 6=토
          weekly[dayIndex].member += d.member;
          weekly[dayIndex].guest += d.guest;
        });

        result.labels = days;
        result.member = weekly.map((d) => d.member);
        result.guest = weekly.map((d) => d.guest);
      }

      if (mode === "monthly") {
        const filtered = fullList.filter((d) => d.month === +month);
        const monthly = Array(5)
          .fill(0)
          .map(() => ({ member: 0, guest: 0 }));

        filtered.forEach((d) => {
          const week = getWeekOfMonth(d.date) - 1;
          if (monthly[week]) {
            monthly[week].member += d.member;
            monthly[week].guest += d.guest;
          }
        });

        result.labels = ["1주차", "2주차", "3주차", "4주차", "5주차"];
        result.member = monthly.map((d) => d.member);
        result.guest = monthly.map((d) => d.guest);
      }

      if (mode === "yearly") {
        const yearly = Array(12)
          .fill(0)
          .map(() => ({ member: 0, guest: 0 }));

        fullList.forEach((d) => {
          const m = d.date.getMonth(); // 0~11
          yearly[m].member += d.member;
          yearly[m].guest += d.guest;
        });

        result.labels = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
        result.member = yearly.map((d) => d.member);
        result.guest = yearly.map((d) => d.guest);
      }

      aggregated.value = result;
    });
  }

  return { aggregated };
}

function getWeekOfMonth(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const day = date.getDate();
  return Math.ceil((day + start) / 7);
}
