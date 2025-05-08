<script setup>
import { computed, ref, watch, onUnmounted, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ModalInquire from '@/components/ModalInquire.vue'; // 모달 컴포넌트 임포트
import DatePicker from '@/components/DatePicker.vue'; // 날짜 선택 컴포넌트 임포트
import TimePicker from '@/components/TimePicker.vue';

const isModalOpen = ref(false);
const route = useRoute();
// useRouter() 라우트를 변경(이동)할때 사용 (push(), replace(), go())
const router = useRouter();
// console.log(route.params);
const emit = defineEmits(['next', 'prev']);
const props = defineProps({
  resevationData: Object,
  editMode: Boolean,
  reservationDetails: Object,
});
const name = ref('');
const phone = ref('');
const luggageCount = ref(1);
//입력값 저장
const reservationDetails = ref({
  departurePlace: '',
  departureDate: '',
  departureTime: '',
  arrivalPlace: '',
  arrivalDate: '',
  arrivalTime: '',
  luggage: [],
  totalPrice: 0,
});
const prevStep = () => emit('prev');
const nextStep = () => {
  // 현재 선택된 값들을 reservationDetails에 저장
  reservationDetails.value = {
    departurePlace: departurePlace.value,
    departureDate: selectedDepartureDate.value,
    departureTime: departureTime.value,
    arrivalPlace: arrivalPlace.value,
    arrivalDate: selectedArrivalDate.value,
    arrivalTime: arrivalTime.value,
    luggage: products.value.filter((product) => product.quantity > 0),
    totalPrice: totalPrice.value,
  };

  emit('next', {
    name: name.value,
    phone: phone.value,
    luggageCount: luggageCount.value,
    reservationDetails: reservationDetails.value,
  });
};
// 각 섹션별 토글 상태 관리
const toggleStates = ref({
  // 출발지
  departure: {
    isVisible: true,
    awesome: false,
  },
  // 도착지
  arrival: {
    isVisible: false,
    awesome: true,
  },
  // 수하물
  luggage: {
    isVisible: false,
    awesome: true,
  },
});
// 토글 함수
const toggleSection = (section) => {
  // 모든 섹션의 상태를 초기화
  Object.keys(toggleStates.value).forEach((key) => {
    toggleStates.value[key].isVisible = false;
    toggleStates.value[key].awesome = true;
  });

  // 클릭한 섹션만 열기
  toggleStates.value[section].isVisible = true;
  toggleStates.value[section].awesome = false;
};
// 수하물별 금액 책정
const products = ref([
  {
    id: 1,
    name: 'S',
    price: 11000,
    description: '최장변 길이 55cm이하',
    quantity: 0,
  },
  {
    id: 2,
    name: 'M',
    price: 16000,
    description: '최장변 길이 65cm미만',
    quantity: 0,
  },
  {
    id: 3,
    name: 'L',
    price: 21000,
    description: '최장변 길이 65cm이상',
    quantity: 0,
  },
]);
// 현재 선택된 상품 가져오기
// const product = computed(() => {
//   return products.value.find((p) => p.id === Number(route.params.id)) || {};
// });
const id = Number(route.params.id);
const product = computed(() => {
  return products.value.find((p) => p.id === id) || {};
});

// 가격 포맷 함수 ,
const formatPrice = (price) => {
  if (!price) return '0';
  return `${price.toLocaleString()}`;
};
// 수량 상태 변수
// const quantity = ref(0);
const changeQuantity = (productId, amount) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) {
    const newQuantity = product.quantity + amount;
    if (newQuantity >= 0 && newQuantity <= 5) {
      product.quantity = newQuantity;
    }
  }
};
// 총금액 계산
const totalPrice = computed(() => {
  return products.value.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
});

// 날짜 선택 관련 상태
const isDatePickerOpen = ref(false);
const selectedDepartureDate = ref('');
const selectedArrivalDate = ref('');
const datePickerType = ref(''); // 'departure' 또는 'arrival'
//위치잡기
const datePickerPosition = ref({ top: 0, left: 0 });
//팝업 열기
const openDatePicker = (type, event) => {
  datePickerType.value = type;
  const inputElement = event.target;
  const rect = inputElement.getBoundingClientRect();
  // 입력 필드 아래에 위치하도록 설정
  datePickerPosition.value = {
    top: rect.bottom + window.scrollY + 5, // 5px 간격
    left: rect.left + window.scrollX,
  };
  isDatePickerOpen.value = true;
};

// 날짜 선택 완료
const handleDateSelect = (date) => {
  if (datePickerType.value === 'departure') {
    selectedDepartureDate.value = date;
  } else if (datePickerType.value === 'arrival') {
    selectedArrivalDate.value = date;
  }
  isDatePickerOpen.value = false;
};

// 외부 클릭 감지 함수
const handleClickOutside = (event) => {
  const datePicker = document.querySelector('.date-picker');
  const dateInput = document.querySelector('.date_input');

  if (datePicker && !datePicker.contains(event.target) && !dateInput.contains(event.target)) {
    isDatePickerOpen.value = false;
  }
};

// 외부 클릭 이벤트 리스너 추가/제거
watch(isDatePickerOpen, (newValue) => {
  if (newValue) {
    // setTimeout을 사용하여 이벤트 버블링을 피함
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});
// 시간 선택 팝업
const isTimePickerOpen = ref(false);
const departureTime = ref('');
const arrivalTime = ref('');
const timePickerType = ref(''); // 'departure' 또는 'arrival'
const timePickerPosition = ref({ top: 0, left: 0 });

const openTimePicker = (type, event) => {
  timePickerType.value = type;
  const inputElement = event.target;
  const rect = inputElement.getBoundingClientRect();
  timePickerPosition.value = {
    top: rect.bottom + window.scrollY + 5,
    left: rect.left + window.scrollX,
  };

  // departure_time 클릭 시 현재 시간 기준으로, arrival_time 클릭 시 departure_time 값 기준으로 설정
  if (type === 'departure') {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = Math.round(now.getMinutes() / 10) * 10;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    departureTime.value = `${hours}:${formattedMinutes}`;
  } else if (type === 'arrival') {
    if (!departureTime.value) {
      openModal('출발 시간을 먼저 선택해주세요.');
      return;
    }
    arrivalTime.value = departureTime.value;
  }

  isTimePickerOpen.value = true;
};

const handleTimeSelect = (time) => {
  if (timePickerType.value === 'departure') {
    departureTime.value = time;
  } else if (timePickerType.value === 'arrival') {
    arrivalTime.value = time;
  }
  // isTimePickerOpen.value = false;
};

// 시간 팝업 닫기
const handleTimeClickOutside = (event) => {
  const timePicker = document.querySelector('.time-picker');
  const timeInput = document.querySelector('.time_input');

  if (timePicker && !timePicker.contains(event.target) && !timeInput.contains(event.target)) {
    isTimePickerOpen.value = false;
  }
};

// 외부 클릭 이벤트 리스너 추가/제거
watch(isTimePickerOpen, (newValue) => {
  if (newValue) {
    // setTimeout을 사용하여 이벤트 버블링을 피함
    setTimeout(() => {
      document.addEventListener('click', handleTimeClickOutside);
    }, 0);
  } else {
    document.removeEventListener('click', handleTimeClickOutside);
  }
});

const isDepartureModalOpen = ref(false);
const isArrivalModalOpen = ref(false);
const departurePlace = ref('');
const arrivalPlace = ref('');

const handleDepartureSelect = (area) => {
  departurePlace.value = area;
  isDepartureModalOpen.value = false;
};

const handleArrivalSelect = (area) => {
  arrivalPlace.value = area;
  isArrivalModalOpen.value = false;
};
// 수하물 입력값 나타내기
const selectedLuggage = computed(() => {
  return products.value
    .filter((product) => product.quantity > 0)
    .map((product) => `${product.name} ${product.quantity}개`)
    .join(', ');
});

const isArrivalDateModalOpen = ref(false);

// 찾을 날짜 모달 열기
const openArrivalDateModal = (event) => {
  if (!selectedDepartureDate.value) {
    alert('먼저 맡기는 날짜를 선택해주세요.');
    return;
  }
  isArrivalDateModalOpen.value = true;
};

// 찾을 날짜 모달 확인
const confirmArrivalDate = () => {
  // 맡기는 날짜의 다음 날 계산
  const nextDay = new Date(selectedDepartureDate.value);
  nextDay.setDate(nextDay.getDate() + 1);

  // 날짜 포맷팅
  const year = nextDay.getFullYear();
  const month = String(nextDay.getMonth() + 1).padStart(2, '0');
  const day = String(nextDay.getDate()).padStart(2, '0');
  const formattedNextDay = `${year}-${month}-${day}`;

  // 찾을 날짜를 다음 날로 설정
  selectedArrivalDate.value = formattedNextDay;
  isArrivalDateModalOpen.value = false;
};

// 모바일 토글 상태 관리
const isDetailVisible = ref(true);

// 모바일 토글 함수
const toggleDetail = () => {
  if (window.innerWidth <= 768) {
    isDetailVisible.value = !isDetailVisible.value;
  } else {
    isDetailVisible.value = true;
  }
};

// 화면 크기 변경 감지
const handleResize = () => {
  if (window.innerWidth > 768) {
    isDetailVisible.value = true;
  } else {
    isDetailVisible.value = false;
  }
};

// 컴포넌트 마운트 시 초기 체크
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);

  // 이전 데이터 불러오기
  if (props.resevationData?.reservationDetails) {
    const details = props.resevationData.reservationDetails;
    departurePlace.value = details.departurePlace || '';
    selectedDepartureDate.value = details.departureDate || '';
    departureTime.value = details.departureTime || '';
    arrivalPlace.value = details.arrivalPlace || '';
    selectedArrivalDate.value = details.arrivalDate || '';
    arrivalTime.value = details.arrivalTime || '';

    // 수하물 데이터 복원
    if (details.luggage && Array.isArray(details.luggage)) {
      details.luggage.forEach((item) => {
        const product = products.value.find((p) => p.name === item.name);
        if (product) {
          product.quantity = item.quantity;
        }
      });
    }
  }
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="res_wrap">
    <div class="res_inner">
      <!-- 상단 -->
      <section class="res_top">
        <div class="res_text_box">
          <p id="res_top_title">3분 안에 예약하고</p>
          <h2>짐꾼을 부르세요!</h2>
        </div>
        <!-- 프로그래스바 -->
        <div class="progress_bar">
          <img src="/images/icon/reservation-bar1.png" alt="예약진행바" />
        </div>
        <div class="progress_text">
          <p>예약하기</p>
          <p>확인 및 결제</p>
          <p>예약완료</p>
        </div>
      </section>
      <!-- 배송정보 -->
      <h2 class="a4_title">배송정보 입력<span>*</span></h2>
      <form>
        <!-- 배송정보 입력창 -->
        <div id="res_content">
          <div>
            <!-- 출발지 -->
            <div class="row_box item_line" :class="{ active: toggleStates.departure.isVisible }">
              <div @click="toggleSection('departure')">
                <div>
                  <h3 v-if="toggleStates.departure.awesome">출발지</h3>
                  <h3 v-else>어디서 짐을 가져갈까요?</h3>
                  <span v-if="toggleStates.departure.awesome" class="fa accordion_icon">
                    <img src="/images/icon/toggleDown_icon.png" alt="아래아이콘" />
                  </span>
                  <span v-else class="fa accordion_icon">
                    <img src="/images/icon/toggleUp_icon.png" alt="아래아이콘" />
                  </span>
                </div>
              </div>
              <!-- 토글 활성화 된 콘텐츠 영역 -->
              <div v-if="toggleStates.departure.isVisible" class="row_line">
                <!-- 출발지 입력 영역 -->
                <div class="row">
                  <label>출발지</label>
                  <div class="res_input">
                    <img src="/images/icon/lens_icon.png" alt="돋보기" />
                    <input
                      type="text"
                      :value="departurePlace"
                      readonly=""
                      autocomplete="off"
                      placeholder="출발장소"
                      class="departure_input"
                      @click="isDepartureModalOpen = true"
                    />
                    <ModalInquire
                      :isOpen="isDepartureModalOpen"
                      @close="isDepartureModalOpen = false"
                      @select="handleDepartureSelect"
                    />
                  </div>
                </div>
                <!-- 맡길 날짜 선택 -->
                <div class="row">
                  <label>맡길 날짜</label>
                  <div class="res_input">
                    <img src="/images/icon/data_icon.png" alt="달력" />
                    <input
                      class="date_input"
                      type="text"
                      :value="selectedDepartureDate"
                      readonly
                      autocomplete="off"
                      placeholder="맡길 날짜"
                      @click="openDatePicker('departure', $event)"
                    />
                  </div>
                </div>
                <!-- 맡길 시간 선택 -->
                <div class="row">
                  <label>맡길 시간</label>
                  <div class="res_input">
                    <img src="/images/icon/watch_icon.png" alt="시계" />
                    <input
                      class="time_input"
                      id="departure_time"
                      type="text"
                      :value="departureTime"
                      readonly
                      autocomplete="off"
                      placeholder="맡길 시간"
                      @click="openTimePicker('departure', $event)"
                    />
                  </div>
                </div>
              </div>
              <!-- 도착지 -->
            </div>
            <!-- 도착지 -->
            <div class="row_box item_line" :class="{ active: toggleStates.arrival.isVisible }">
              <div @click="toggleSection('arrival')">
                <div>
                  <h3 v-if="toggleStates.arrival.awesome">도착지</h3>
                  <h3 v-else>어디에 짐을 놔둘까요?</h3>
                  <span v-if="toggleStates.arrival.awesome" class="fa accordion_icon">
                    <img src="/images/icon/toggleDown_icon.png" alt="아래아이콘" />
                  </span>
                  <span v-else class="fa accordion_icon">
                    <img src="/images/icon/toggleUp_icon.png" alt="아래아이콘" />
                  </span>
                </div>
              </div>
              <!-- 토글 활성화 된 콘텐츠 영역 -->
              <div v-if="toggleStates.arrival.isVisible" class="row_line">
                <!-- 도착지 입력 영역 -->
                <div class="row">
                  <label>도착지</label>
                  <div class="res_input">
                    <img src="/images/icon/lens_icon.png" alt="돋보기" />
                    <input
                      type="text"
                      :value="arrivalPlace"
                      readonly=""
                      autocomplete="off"
                      placeholder="도착장소"
                      class="arrival_input"
                      @click="isArrivalModalOpen = true"
                    />
                    <ModalInquire
                      :isOpen="isArrivalModalOpen"
                      @close="isArrivalModalOpen = false"
                      @select="handleArrivalSelect"
                    />
                  </div>
                </div>
                <!-- 찾을 날짜 선택 -->
                <div class="row">
                  <label>찾을 날짜</label>
                  <div class="res_input">
                    <img src="/images/icon/data_icon.png" alt="달력" />
                    <input
                      id="arrival_date"
                      class="date_input"
                      type="text"
                      :value="selectedArrivalDate"
                      readonly
                      autocomplete="off"
                      placeholder="찾을 날짜"
                      @click="openArrivalDateModal"
                    />
                  </div>
                </div>
                <!-- 찾을 시간 선택 -->
                <div class="row">
                  <label>찾을 시간</label>
                  <div class="res_input">
                    <img src="/images/icon/watch_icon.png" alt="시계" />
                    <input
                      id="arrival_time"
                      class="time_input"
                      type="text"
                      :value="arrivalTime"
                      readonly
                      autocomplete="off"
                      placeholder="찾을 시간"
                      @click="openTimePicker('arrival', $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 수하물 -->
            <div class="luggage_box" :class="{ active: toggleStates.luggage.isVisible }">
              <div @click="toggleSection('luggage')">
                <div>
                  <h3 v-if="toggleStates.luggage.awesome">수하물</h3>
                  <h3 v-else>보내는 짐의 크기와 갯수를 알려주세요</h3>
                  <span v-if="toggleStates.luggage.awesome" class="fa accordion_icon">
                    <img src="/images/icon/toggleDown_icon.png" alt="아래아이콘" />
                  </span>
                  <span v-else class="fa accordion_icon">
                    <img src="/images/icon/toggleUp_icon.png" alt="아래아이콘" />
                  </span>
                </div>
              </div>
              <!--토글 활성화 된 콘텐츠 영역 -->
              <div v-if="toggleStates.luggage.isVisible" class="row_line">
                <!-- 수하물 입력 영역 -->
                <ul class="carrier_list">
                  <li v-for="product in products" :key="product.id">
                    <div class="cr_name_area">
                      <p>
                        <span class="product cr_name">{{ product.name }}사이즈</span>
                        <span class="cr_txt">{{ product.description }}</span>
                      </p>
                    </div>
                    <div class="cr_btn_area">
                      <button type="button" @click="changeQuantity(product.id, -1)">
                        <i><img src="/images/icon/minus_icon.png" alt="이미지" /></i>
                      </button>
                      <input v-model="product.quantity" min="0" max="5" />
                      <button type="button" @click="changeQuantity(product.id, 1)">
                        <i><img src="/images/icon/plus_icon.png" alt="이미지" /></i>
                      </button>
                    </div>
                  </li>
                </ul>
                <!-- 주의문 -->
                <div class="cr_warning">
                  <i><img src="/images/icon/warning_icon.png" alt="이미지" /></i>
                  <span><strong>수하물 개당요금입니다.</strong></span>
                </div>
                <!-- 도움말 -->
                <div class="cr_help_text">
                  아래의 물건이 포함되어 있다면
                  <b>배송을 거부당할 수 있어요.</b>
                  <ul>
                    <li>비닐/종이 쇼핑백, 우산, 박스 등 파손 위험이 있는 물품</li>
                    <li>부재성 및 악취가 심한 물품</li>
                    <li>타인에게 해를 가할 수 있는 물품</li>
                    <li>일반 위탁 수하물 허용량을 초과한 물품</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 입력 결과창 -->
        <div id="res_result_box">
          <!-- 모바일 버튼 -->
          <div class="rrb_mb" @click="toggleDetail">
            <div class="mb_toggle_btn">
              <img
                :src="isDetailVisible ? '/images/icon/toggleDown_icon.png' : '/images/icon/toggleUp_icon.png'"
                alt="모바일토글아이콘"
              />
            </div>
          </div>
          <!-- 웹 -->
          <ul class="rrb_detail" v-show="isDetailVisible">
            <li class="rrb_fr">
              <label>출발지</label>
              <div>{{ departurePlace || '-' }}</div>
            </li>
            <li class="rrb_fr_data">
              <label>짐 맡길 일정</label>
              <div>
                {{ selectedDepartureDate && departureTime ? `${selectedDepartureDate} / ${departureTime}` : '-' }}
              </div>
            </li>
            <li class="rrb_to">
              <label>도착지</label>
              <div>{{ arrivalPlace || '-' }}</div>
            </li>
            <li class="rrb_to_data">
              <label>짐 찾을 일정</label>
              <div>
                {{ selectedArrivalDate && arrivalTime ? `${selectedArrivalDate} / ${arrivalTime}` : '-' }}
              </div>
            </li>
            <li class="rrb_cr">
              <label>수하물</label>
              <div>{{ selectedLuggage || '-' }}</div>
            </li>
          </ul>
          <!-- 총 금액 -->
          <div class="rrb_default">
            <div class="rrb_price">
              <label>배송 예상 금액</label>
              <div>{{ formatPrice(totalPrice) }} 원</div>
            </div>
            <div @click="nextStep" class="rrb_sumbit_btn">
              <input type="button" value="배송 예약하기" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- 날짜 선택 팝업 -->
  <DatePicker
    v-if="isDatePickerOpen"
    :type="datePickerType"
    :departureDate="selectedDepartureDate"
    @select="handleDateSelect"
    @close="isDatePickerOpen = false"
    :style="{
      position: 'absolute',
      top: `${datePickerPosition.top}px`,
      left: `${datePickerPosition.left}px`,
      zIndex: 1000,
    }"
  />

  <!-- 시간 선택 팝업 -->
  <TimePicker
    v-if="isTimePickerOpen"
    :type="timePickerType"
    :initialTime="timePickerType === 'arrival' ? departureTime : undefined"
    @select="handleTimeSelect"
    @close="isTimePickerOpen = false"
    :style="{
      position: 'absolute',
      top: `${timePickerPosition.top}px`,
      left: `${timePickerPosition.left}px`,
      zIndex: 1000,
    }"
  />

  <!-- 찾을 날짜 모달 -->
  <div v-if="isArrivalDateModalOpen" class="modal-overlay">
    <div class="modal-content">
      <p>짐은 <strong>맡긴 다음 날</strong> 찾을 수 있어요.</p>
      <div class="modal-buttons">
        <button @click="confirmArrivalDate" class="confirm-btn">확인</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/cards';
@import '/src/assets/variables'; // 반드시 최상단!
@import '/src/assets/resTop.scss';
.progress_text p:first-child {
  // font-size: 1.875rem;
  font-weight: 600;
  color: $primary-color;
}
// 배송정보 타이틀
.a4_title {
  // font-size: 24px;
  font-size: clamp(1rem, 1.25rem + 0.3vw, 1.5rem);
  font-weight: bold;
  margin-bottom: 20px;
  span {
    color: $primary-color;
    margin-left: 4px;
  }
}
// 배송정보 입력창
#res_content {
  width: 68%;
  display: inline-block;
  max-width: 700px;
  min-width: 320px;
  margin: 0px auto 30px;
  min-height: 350px;
}
.row_box > div:first-child {
  cursor: pointer;
}
.row_box {
  height: 54px;
  background-color: #fff;
  padding: 18px 25px;
  margin: 0 1vh 3vh 0;
  border-radius: 10px;
  transition: all 0.5s ease-in-out;
  &.active {
    border: none;
    box-shadow: $reservation-boxShadow;
    height: 298px;
  }
  h3 {
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
  }
}
// 토글 아이콘
.accordion_icon {
  float: right;
  color: gray;
  font-size: 1.5em;
  padding: 0px 10px;
}
// 토글시 라인
.row_line {
  margin: 15px 0;
  border-top: 2px dashed $input-select;
}

.row {
  position: relative;
  padding-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    font-weight: 600;
  }
  input {
    position: relative;
    width: 466px;

    height: 45px;
    font-size: $text-font-M;
    font-weight: 500;
    border: 1px solid $input-select;
    border-radius: 10px;
    padding-left: 45px;
    outline: none;
    transition: all 0.3s;
    &:focus {
      border: none;
      outline: 3px solid rgba(255, 111, 0, 0.5);
      box-shadow: $reservation-boxShadow;
    }
  }
  // 아이콘
  .res_input {
    position: relative;

    img {
      position: absolute;
      top: 25%;
      left: 15px;
      z-index: 10;
    }
  }
}
.date_input {
  font-weight: 100;
}
.date_input:hover {
  // border: none;
  outline: 3px solid rgba(255, 111, 0, 0.5);
  box-shadow: $reservation-boxShadow;
}
// 수하물
.luggage_box {
  height: 54px;
  background-color: #fff;
  padding: 18px 25px;
  margin: 0 1vh 3vh 0;
  border-radius: 10px;
  transition: all 0.7s ease-in-out;
  &.active {
    border: none;
    box-shadow: $reservation-boxShadow;
    height: 488px;
  }
  h3 {
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
  }
}
.carrier_list {
  padding: 30px 0;
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .cr_name {
    font-size: 20px;
    font-weight: bold;
    white-space: nowrap;
  }
  .cr_txt {
    font-size: 14px;
    white-space: nowrap;
    margin-left: 20px;
    color: $font-gray;
  }
  // 수하물 버튼
  .cr_btn_area {
    button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: rgba(255, 111, 0, 0.1);
      border: 1px solid rgba(255, 111, 0, 0.5);
      cursor: pointer;
      i {
        // background-color: #fff;
        width: 12px;
        height: 12px;
        display: block;
        margin: auto;
        img {
          width: 100%;
        }
      }
    }
    input {
      width: 30px;
      text-align: center;
      border: none;
    }
  }
}

// 수하물 주의문
.cr_warning {
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    color: $warning-color;
  }
}
// 수하물 도움말
.cr_help_text {
  background-color: $bg-light;
  padding: 15px;
  border: 1px solid $bg-primary;
  border-radius: 10px;
  margin-top: 15px;
  color: $font-light-gray;
  font-size: 13px;
  b {
    color: $primary-color;
    margin-bottom: 10px;
  }
  ul li {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    &::before {
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      background-color: $font-light-gray;
      border-radius: 50%;
    }
  }
}
// 입력 결과창
#res_result_box {
  width: 30%;
  display: block;
  float: right;
  border-radius: 10px;
  padding: 5px 15px 15px;
  font-size: 13px;
  background-color: #fff;
  position: relative;
}
// 입력 정보 값
.rrb_detail li {
  display: flex;
  justify-content: space-between;
  margin: 14px 0;
  :first-child {
    font-size: 14px;
    color: $font-gray;
  }
  &:last-child {
    border-bottom: 1px solid $input-select;

    margin: 0;
    padding-bottom: 14px;
  }
}
// 금액 값
.rrb_default {
  // border-top: 1px solid $input-select;
  .rrb_price {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 14px;
    font-weight: bold;
    div {
      color: $primary-color;
      font-size: 15px;
    }
  }
  .rrb_sumbit_btn {
    input {
      width: 100%;
      height: 2.375rem;
      background-color: $primary-color;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      color: #fff;
      padding: 6px 12px;
      font-size: 14px;
      &:hover {
        background-color: $primary-hover;
      }
    }
  }
}

.date_input {
  cursor: pointer;
  &:hover {
    border-color: $primary-color;
  }
}

/* 모달창 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding-top: 20px;
  border-radius: 10px;
  width: 250px;
  height: 150px;
  // width: 100%;
  // height: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  p {
    color: #111;
    margin-top: 20px;
    strong {
      color: $primary-color;
      font-weight: bold;
      font-size: 16px;
    }
  }
}

.modal-buttons {
  margin: 40px auto 0;
  width: 88%;
  height: 30%;
  button {
    width: 100%;
    height: 100%;
    // padding: 6px 12px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
  }

  .confirm-btn {
    background-color: $primary-color;
    color: white;
    border: none;

    &:hover {
      background-color: $primary-hover;
    }
  }

  .cancel-btn {
    background-color: $input-select;
    color: $font-gray;
    border: none;

    &:hover {
      background-color: darken($input-select, 10%);
    }
  }
}
.rrb_mb {
  display: none;
}
@media screen and (max-width: 1050px) {
  .row {
    input {
      width: 430px;
    }
  }
}
@media screen and (max-width: 900px) {
  .row {
    input {
      width: 380px;
    }
  }
}
// 테블릿
@media screen and (max-width: 768px) {
  // gotop 버튼
  .topBtnWrap {
    display: none !important;
  }
  // 본문
  #res_content {
    width: 100%;
    display: block;
    min-height: unset;
    .row {
      label {
        display: none;
      }
      .res_input {
        width: 100%;
      }
      input {
        width: 100%;
      }
    }
  }

  // 입력 결과값
  #res_result_box {
    width: 100%;
    float: none;
    border: none;
    position: fixed;
    z-index: 997;
    left: 0px;
    bottom: 0px;
    border-radius: 10px 10px 0 0;
    background-color: #eee;
    padding: 0 15px 15px;
    .rrb_price div {
      font-size: 18px;
    }

    .rrb_mb {
      display: block;
      background-color: #eee;
      padding: 5px 15px 0;
      border-radius: 0.5rem;
      cursor: pointer;
      text-align: center;
      margin: auto;
      width: 3rem;
      margin-top: -15px;
      transition: all 0.3s ease;

      .mb_toggle_btn {
        width: 16px;
        img {
          width: 100%;
        }
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .row {
    input {
      border-radius: 8px;
      font-size: 14px;
    }
  }
  .row_box h3 {
    font-size: 16px;
  }
  // 수하물
  .luggage_box h3 {
    font-size: 16px;
  }
  .cr_name_area p {
    display: flex;
    flex-direction: column;
  }

  .carrier_list {
    padding: 30px 0 15px;
    .cr_name {
      font-size: 16px;
    }
    .cr_txt {
      font-size: 13px;
      margin-left: 0;
      margin-top: 5px;
    }
  }
  .cr_help_text {
    font-size: 12px;
  }
  .cr_warning strong {
    font-size: 15px;
  }
}
</style>
