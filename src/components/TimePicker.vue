<script setup>
import { ref, watch, onMounted, nextTick } from "vue";

const props = defineProps({
  isOpen: Boolean,
  position: Object,
  initialTime: String,
});
// const
const emit = defineEmits(["select", "close"]);

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 6 }, (_, i) => i * 10); // 10분 간격으로 변경
const selectedHour = ref(null);
const selectedMinute = ref(null);

const hourScrollRef = ref(null);
const minuteScrollRef = ref(null);

// 현재 시간을 가져와서 10분 단위로 반올림하는 함수
const getCurrentRoundedTime = () => {
  const now = new Date();
  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();

  // 10분 단위로 반올림
  currentMinute = Math.round(currentMinute / 10) * 10;

  // 60분이 되면 시간을 1시간 증가
  if (currentMinute === 60) {
    currentHour = (currentHour + 1) % 24;
    currentMinute = 0;
  }

  return { hour: currentHour, minute: currentMinute };
};

// 컴포넌트가 마운트될 때 초기 시간 설정
onMounted(() => {
  if (props.initialTime) {
    const [hours, minutes] = props.initialTime.split(":").map(Number);
    selectedHour.value = hours;
    selectedMinute.value = minutes;
  } else {
    const { hour, minute } = getCurrentRoundedTime();
    selectedHour.value = hour;
    selectedMinute.value = minute;
  }

  // 스크롤 위치 조정
  nextTick(() => {
    if (hourScrollRef.value) {
      const hourElement = hourScrollRef.value.querySelector(
        `[data-value="${selectedHour.value}"]`
      );
      if (hourElement) {
        hourElement.scrollIntoView({ block: "center" });
      }
    }
    if (minuteScrollRef.value) {
      const minuteElement = minuteScrollRef.value.querySelector(
        `[data-value="${selectedMinute.value}"]`
      );
      if (minuteElement) {
        minuteElement.scrollIntoView({ block: "center" });
      }
    }
  });
});

// 스크롤 이벤트 핸들러
const handleScroll = (element, type) => {
  if (!element) return;

  const elementRect = element.getBoundingClientRect();
  const centerY = elementRect.top + elementRect.height / 2;
  const options = element.querySelectorAll(".time-option");

  let closestOption = null;
  let minDistance = Infinity;

  options.forEach((option) => {
    const rect = option.getBoundingClientRect();
    const optionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(optionCenter - centerY);

    if (distance < minDistance) {
      minDistance = distance;
      closestOption = option;
    }
  });

  if (closestOption) {
    const value = parseInt(closestOption.getAttribute("data-value"));
    if (type === "hour") {
      selectedHour.value = value;
    } else {
      selectedMinute.value = value;
    }
  }
};

// 시간이 변경될 때마다 즉시 반영
watch([selectedHour, selectedMinute], () => {
  if (selectedHour.value !== null && selectedMinute.value !== null) {
    const time = `${selectedHour.value
      .toString()
      .padStart(2, "0")}:${selectedMinute.value.toString().padStart(2, "0")}`;
    emit("select", time);
  }
});

const handleSet = () => {
  emit("close");
};

// 시간 옵션 클릭 핸들러 추가
const handleOptionClick = (element, type, value) => {
  if (type === "hour") {
    selectedHour.value = value;
  } else {
    selectedMinute.value = value;
  }

  // 클릭된 옵션을 스크롤의 센터에 위치시키기
  nextTick(() => {
    element.scrollIntoView({ block: "center", behavior: "smooth" });
  });
};
</script>

<template>
  <div class="time-picker" @click.stop>
    <div class="time-picker-content">
      <div class="line"></div>
      <div class="time-selector">
        <div class="time-column">
          <div class="time-scroll">
            <div class="time-scroll-wheel">
              <div class="time-scroll-wheel-cont">
                <div
                  class="time-scroll-wheel-items"
                  ref="hourScrollRef"
                  @scroll="handleScroll($event.target, 'hour')">
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    class="time-option"
                    :class="{ selected: selectedHour === hour }"
                    :data-value="hour"
                    @click="handleOptionClick($event.target, 'hour', hour)">
                    {{ hour.toString().padStart(2, "0") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="time-column">
          <div class="time-scroll">
            <div class="time-scroll-wheel">
              <div class="time-scroll-wheel-cont">
                <div
                  class="time-scroll-wheel-items"
                  ref="minuteScrollRef"
                  @scroll="handleScroll($event.target, 'minute')">
                  <div
                    v-for="minute in minutes"
                    :key="minute"
                    class="time-option"
                    :class="{ selected: selectedMinute === minute }"
                    :data-value="minute"
                    @click="handleOptionClick($event.target, 'minute', minute)">
                    {{ minute.toString().padStart(2, "0") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="time-picker-buttons">
      <button class="set-button" @click="handleSet">SET</button>
    </div>
  </div>
</template>

<style scoped>
.time-picker {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 192px;
  overflow: hidden;
  z-index: 1000;
}

.time-picker-content {
  padding: 16px;
  position: relative;
}

.time-picker-content::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 34px;
  background: #ff6f00;
  opacity: 0.1;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
  border-radius: 10px;
  width: 90%;
  margin: auto;
}

.time-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  height: 200px;
}

.time-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-scroll {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.time-scroll::before {
  display: none;
}

.time-scroll::after {
  display: none;
}

.time-scroll-wheel {
  height: 100%;
  position: relative;
  perspective: 1000px;
}

.time-scroll-wheel-cont {
  height: 100%;
  transform-style: preserve-3d;
  position: relative;
}

.time-scroll-wheel-items {
  position: relative;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 83px 0;
  touch-action: none;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;
}

.time-scroll-wheel-items::-webkit-scrollbar {
  display: none;
}

.time-option {
  height: 34px;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 16px;
  color: #111;
  scroll-snap-align: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 34px;
  max-height: 34px;
  border-radius: 4px;
}

.time-option:hover {
  background: #f5f5f5;
}

.time-option.selected {
  /* background: #FF6F00; */
  color: #ff6f00;
  font-weight: 500;
}

.time-picker-buttons {
  display: none;
  /* display: flex; */
  justify-content: center;
  padding: 8px;
  border-top: 1px solid #eee;
}

.set-button {
  background: none;
  border: none;
  color: #ff6f00;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.set-button:hover {
  background: #f5f5f5;
  border-radius: 4px;
}
@media screen and (max-width: 768px) {
  .time-picker-buttons {
    display: flex;
  }
  .time-picker-buttons {
    padding: 4px;
  }
}
</style>
