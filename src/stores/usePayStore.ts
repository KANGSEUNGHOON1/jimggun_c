import { ref, computed } from "vue";

const currentPage = ref({ year: 2025, month: 5 });

const workData = ref({
  // 4월 데이터
  '2025-04-03': { shift: '오전', pay: 22050 },
  '2025-04-04': { shift: '오전', pay: 21170 },
  '2025-04-05': { shift: '오전', pay: 28550 },
  '2025-04-06': { shift: '오전', pay: 25000 },
  '2025-04-10': { shift: '오전', pay: 22250 },
  '2025-04-11': { shift: '오전', pay: 21700 },
  '2025-04-12': { shift: '오전', pay: 30050 },
  '2025-04-13': { shift: '오전', pay: 25850 },
  '2025-04-17': { shift: '오전', pay: 19050 },
  '2025-04-18': { shift: '오전', pay: 21950 },
  '2025-04-19': { shift: '오전', pay: 29400 },
  '2025-04-20': { shift: '오전', pay: 23750 },
  '2025-04-24': { shift: '오후', pay: 20600 },
  '2025-04-25': { shift: '오후', pay: 21050 },
  '2025-04-26': { shift: '오후', pay: 30150 },
  '2025-04-27': { shift: '오후', pay: 25150 },

  // 5월 데이터
  '2025-05-01': { shift: '오후', pay: 34200 },
  '2025-05-02': { shift: '오후', pay: 36720 },
  '2025-05-03': { shift: '오후', pay: 34350 },
  '2025-05-04': { shift: '오후', pay: 33850 },
  '2025-05-08': { shift: '오후', pay: 21850 },
  '2025-05-09': { shift: '오후', pay: 22850 },
  '2025-05-10': { shift: '오후', pay: 30850 },
  '2025-05-11': { shift: '오후', pay: 20850 },
  '2025-05-15': { shift: '오전', pay: 20350 },
  '2025-05-16': { shift: '오전', pay: 21250 },
  '2025-05-17': { shift: '오전', pay: 30100 },
  '2025-05-18': { shift: '오전', pay: 20200 },
  '2025-05-22': { shift: '오전', pay: 21400 },
  '2025-05-23': { shift: '오전', pay: 20150 },
  '2025-05-24': { shift: '오전', pay: 30800 },
  '2025-05-25': { shift: '오전', pay: 22150 },
  '2025-05-29': { shift: '오전', pay: 20150 },
  '2025-05-30': { shift: '오전', pay: 21350 },

  //3월 데이터
  '2025-03-01': { shift: '오전', pay: 28500 },
  '2025-03-02': { shift: '오전', pay: 29500 },
  '2025-03-06': { shift: '오전', pay: 20200 },
  '2025-03-07': { shift: '오전', pay: 20800 },
  '2025-03-08': { shift: '오전', pay: 30500 },
  '2025-03-09': { shift: '오전', pay: 20600 },
  '2025-03-13': { shift: '오후', pay: 22100 },
  '2025-03-14': { shift: '오후', pay: 24400 },
  '2025-03-15': { shift: '오후', pay: 31200 },
  '2025-03-16': { shift: '오후', pay: 20800 },
  '2025-03-20': { shift: '오후', pay: 21800 },
  '2025-03-21': { shift: '오후', pay: 20800 },
  '2025-03-22': { shift: '오후', pay: 30800 },
  '2025-03-23': { shift: '오후', pay: 23800 },
  '2025-03-27': { shift: '오후', pay: 22900 },
  '2025-03-28': { shift: '오후', pay: 21900 },
  '2025-03-29': { shift: '오후', pay: 31750 },
  '2025-03-30': { shift: '오후', pay: 24600 },
});

export const totalMonthlyPay = computed(() => {
  const year = currentPage.value.year;
  const month = String(currentPage.value.month).padStart(2, "0");

  return Object.entries(workData.value)
    .filter(([date]) => date.startsWith(`${year}-${month}`))
    .reduce((sum, [_, info]) => sum + info.pay, 0);
});