<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  departureDate: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["select", "close"]);

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const selectedDate = ref(null);

// 달력 초기화 시 맡길 날짜를 기준으로 설정
if (props.type === "arrival" && props.departureDate) {
  const departureDate = new Date(props.departureDate);
  currentYear.value = departureDate.getFullYear();
  currentMonth.value = departureDate.getMonth();
}

// 이전 날짜 비활성화를 위한 함수
const isDateDisabled = (date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0); // 비교할 날짜도 시간을 00:00:00으로 설정

  // 찾을 날짜 선택 시 맡길 날짜를 기준으로 이전 날짜 비활성화
  if (props.type === "arrival" && props.departureDate) {
    const departureDate = new Date(props.departureDate);
    departureDate.setHours(0, 0, 0, 0);
    return targetDate <= departureDate;
  }

  // 맡길 날짜 선택 시 당일 포함 이전 날짜 비활성화
  return targetDate < currentDate;
};

// 현재 월의 날짜 배열 생성
const daysInMonth = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];
  const firstDayOfWeek = firstDay.getDay();

  // 이전 달의 날짜들
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate,
      isCurrentMonth: false,
    });
  }

  // 현재 달의 날짜들
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
    });
  }

  // 다음 달의 날짜들
  const remainingDays = 42 - days.length; // 6주 * 7일 = 42
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      isCurrentMonth: false,
    });
  }

  return days;
});

// 월 이동
const changeMonth = (offset) => {
  currentMonth.value = (currentMonth.value + offset + 12) % 12;
  currentYear.value =
    currentMonth.value === 11 ? currentYear.value + 1 : currentYear.value;
};

// 날짜 선택 핸들러 수정
const handleDateSelect = (date) => {
  if (!isDateDisabled(date)) {
    selectedDate.value = date;
    emit("select", formatDate(date));
    emit("close");
  }
};

// 날짜 포맷팅
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 현재 월 표시
const currentMonthDisplay = computed(() => {
  return `${currentYear.value}년 ${currentMonth.value + 1}월`;
});
</script>

<template>
  <div class="date-picker-overlay" @click="emit('close')">
    <div class="date-picker" @click.stop>
      <div class="date-picker-header">
        <button @click="changeMonth(-1)">&lt;</button>
        <span>{{ currentMonthDisplay }}</span>
        <button @click="changeMonth(1)">&gt;</button>
      </div>
      <div class="date-picker-grid">
        <div
          class="weekday"
          v-for="day in ['일', '월', '화', '수', '목', '금', '토']"
          :key="day">
          {{ day }}
        </div>
        <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          class="day"
          :class="{
            'current-month': day.isCurrentMonth,
            selected:
              selectedDate && formatDate(day.date) === formatDate(selectedDate),
            disabled: isDateDisabled(day.date),
          }"
          @click="handleDateSelect(day.date)">
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";

.date-picker {
  background-color: white;
  border-radius: 10px;
  padding: 20px 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
}

.date-picker-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
  button {
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
    padding: 5px 10px;

    &:hover {
      color: $primary-color;
    }
  }
}

.date-picker-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;

  .day {
    &:nth-child(7n + 1) {
      // 일요일
      color: #ff6b6b;
      &.current-month {
        color: #ff6b6b;
      }
    }

    &:nth-child(7n) {
      // 토요일
      color: #5b8cff;
      &.current-month {
        color: #5b8cff;
      }
    }
  }
}

.weekday {
  text-align: center;
  padding: 5px;
  color: $font-gray;

  &:nth-child(1) {
    color: #ff6b6b; // 일요일 빨간색
  }

  &:nth-child(7) {
    color: #5b8cff; // 토요일 파란색
  }
}

.day {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: rgba($primary-color, 0.1);
    &.current-month {
      color: $font-primary;
      font-weight: 500;
    }
  }

  &.current-month {
    color: $font-gray;
  }

  &:not(.current-month) {
    color: $disabled-color;
    font-weight: 100;
    opacity: 0;
  }

  &.selected {
    background-color: $primary-color;
    color: white;
  }

  &.disabled {
    color: #111;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.15;
  }
}
</style>
