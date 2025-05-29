<script setup>
// 📁 composables/useDummyReservationData.js
import { computed } from 'vue'

// 날짜별로 고정된 데이터 생성 (4월 1일 ~ 30일 + 5월 1일 ~ 31일)
const dummyData = [
  // 4월 데이터 (고정)
  ...Array.from({ length: 30 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0')
    return {
      date: `2025-04-${day}`,
      member: 100 + i % 10 * 5, // 100~145
      guest: 80 + i % 8 * 5,   // 80~115
      revenue: 200 + i % 6 * 10 // 200~250
    }
  }),
  // 5월 데이터 (고정)
  { date: '2025-05-01', member: 120, guest: 80, revenue: 210 },
  { date: '2025-05-02', member: 95, guest: 60, revenue: 180 },
  { date: '2025-05-03', member: 130, guest: 70, revenue: 230 },
  { date: '2025-05-04', member: 110, guest: 90, revenue: 220 },
  { date: '2025-05-05', member: 140, guest: 85, revenue: 250 },
  { date: '2025-05-06', member: 150, guest: 60, revenue: 270 },
  { date: '2025-05-07', member: 160, guest: 50, revenue: 280 },
  { date: '2025-05-08', member: 170, guest: 65, revenue: 290 },
  { date: '2025-05-09', member: 180, guest: 70, revenue: 300 },
  { date: '2025-05-10', member: 175, guest: 75, revenue: 295 },
  { date: '2025-05-11', member: 165, guest: 80, revenue: 280 },
  { date: '2025-05-12', member: 155, guest: 85, revenue: 270 },
  { date: '2025-05-13', member: 150, guest: 90, revenue: 260 },
  { date: '2025-05-14', member: 145, guest: 95, revenue: 255 },
  { date: '2025-05-15', member: 140, guest: 100, revenue: 250 },
  { date: '2025-05-16', member: 135, guest: 105, revenue: 245 },
  { date: '2025-05-17', member: 130, guest: 110, revenue: 240 },
  { date: '2025-05-18', member: 125, guest: 115, revenue: 235 },
  { date: '2025-05-19', member: 120, guest: 120, revenue: 230 },
  { date: '2025-05-20', member: 115, guest: 125, revenue: 225 },
  { date: '2025-05-21', member: 110, guest: 130, revenue: 220 },
  { date: '2025-05-22', member: 105, guest: 135, revenue: 215 },
  { date: '2025-05-23', member: 100, guest: 140, revenue: 210 },
  { date: '2025-05-24', member: 95, guest: 145, revenue: 205 },
  { date: '2025-05-25', member: 90, guest: 150, revenue: 200 },
  { date: '2025-05-26', member: 85, guest: 155, revenue: 195 },
  { date: '2025-05-27', member: 80, guest: 160, revenue: 190 },
  { date: '2025-05-28', member: 75, guest: 165, revenue: 185 },
  { date: '2025-05-29', member: 70, guest: 170, revenue: 180 },
  { date: '2025-05-30', member: 65, guest: 175, revenue: 175 },
  { date: '2025-05-31', member: 60, guest: 180, revenue: 170 },
]

export function useDummyReservationData() {
  const dailyData = computed(() => dummyData)

  const weeklyData = computed(() => {
    const currentMonthData = dummyData.filter(d => d.date.startsWith('2025-05'))
    const weeks = [[], [], [], [], []]
    currentMonthData.forEach((item, index) => {
      const weekIndex = Math.floor(index / 7)
      if (weeks[weekIndex]) weeks[weekIndex].push(item)
    })
    return weeks.map((week) => ({
      member: week.reduce((sum, d) => sum + d.member, 0),
      guest: week.reduce((sum, d) => sum + d.guest, 0),
      revenue: week.reduce((sum, d) => sum + d.revenue, 0),
    }))
  })

  const monthlyData = computed(() => {
    const currentMonthData = dummyData.filter(d => d.date.startsWith('2025-05'))
    return currentMonthData.reduce(
      (acc, cur) => {
        acc.member += cur.member
        acc.guest += cur.guest
        acc.revenue += cur.revenue
        return acc
      },
      { member: 0, guest: 0, revenue: 0 }
    )
  })

  return {
    dailyData,
    weeklyData,
    monthlyData,
  }
}

</script>
