<script setup>
import { ref, computed } from "vue";
// 결제 , step
const emit = defineEmits(["next", "prev"]);
const props = defineProps({
  resevationData: Object,
});

const isModalOpen = ref(false);
const modalMessage = ref("");

const reservationDetails = computed(
  () => props.resevationData?.reservationDetails || {}
);

const agree = ref(false);
const individualAgrees = ref({
  stipulation1: false,
  stipulation2: false,
});

const name = ref("");
const phone = ref("");
const phonePrefix = ref("");
const email = ref("");
const showNumberOnlyMessage = ref(false);
const showEmailError = ref(false);
const paymentMethod = ref("신용카드");

const prevStep = () => emit("prev");

const handleEdit = () => {
  emit("prev", {
    editMode: true,
    reservationDetails: props.resevationData.reservationDetails,
  });
};

const confirmPayment = () => {
  // 약관 동의 확인
  if (
    !individualAgrees.value.stipulation1 ||
    !individualAgrees.value.stipulation2
  ) {
    isModalOpen.value = true;
    modalMessage.value = "모든 약관에 동의해주세요.";
    return;
  }

  // 입력 필드 검증
  if (!name.value) {
    isModalOpen.value = true;
    modalMessage.value = "예약자 성명을 입력해주세요.";
    return;
  }

  if (!phone.value) {
    isModalOpen.value = true;
    modalMessage.value = "휴대폰 번호를 입력해주세요.";
    return;
  }

  if (!email.value) {
    isModalOpen.value = true;
    modalMessage.value = "이메일을 입력해주세요.";
    return;
  }

  if (!email.value.includes("@")) {
    showEmailError.value = true;
    isModalOpen.value = true;
    modalMessage.value = "올바른 이메일 형식을 입력해주세요.";
    return;
  }

  // 결제 정보를 포함하여 다음 단계로 전달
  emit("next", {
    paymentComfirmed: true,
    reservationInfo: {
      name: name.value,
      phone: `${phonePrefix.value}-${phone.value}`,
      email: email.value,
      paymentMethod: paymentMethod.value,
    },
  });
};

const closeModal = () => {
  isModalOpen.value = false;
};

// 가격 포맷 함수 추가
const formatPrice = (price) => {
  if (!price) return "0";
  return `${price.toLocaleString()}`;
};

// 전체 동의 체크박스 변경 시
const handleAllAgree = (event) => {
  const isChecked = event.target.checked;
  agree.value = isChecked;
  individualAgrees.value.stipulation1 = isChecked;
  individualAgrees.value.stipulation2 = isChecked;
};

// 개별 동의 체크박스 변경 시
const handleIndividualAgree = (type) => {
  individualAgrees.value[type] = !individualAgrees.value[type];
  agree.value =
    individualAgrees.value.stipulation1 && individualAgrees.value.stipulation2;
};

// 휴대폰 번호 입력 처리
const handlePhoneInput = (event) => {
  const input = event.target.value;

  // 숫자가 아닌 문자가 포함되어 있는지 확인
  if (!/^\d*$/.test(input)) {
    showNumberOnlyMessage.value = true;
    // 숫자만 나머지 제거
    phone.value = input.replace(/[^0-9]/g, "");
    return;
  }

  showNumberOnlyMessage.value = false;
  let value = input;

  // 12자리 이상 입력 방지
  // if (value.length > 12) {
  //   value = value.slice(0, 12);
  // }

  // 3번째와 8번째 뒤에 하이픈 추가
  // if (value.length > 3 && value.length <= 7) {
  //   value = value.slice(0, 3) + "-" + value.slice(3);
  // } else if (value.length > 7) {
  //   value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
  // }

  phone.value = value;
};

// 이메일 입력 처리
const handleEmailInput = (event) => {
  const input = event.target.value;
  email.value = input;
  // '@'가 포함되어 있으면 에러 메시지 숨김
  if (input.includes("@")) {
    showEmailError.value = false;
  }
};

// 결제 방법 변경 핸들러 추가
const handlePaymentMethodChange = (method) => {
  paymentMethod.value = method;
};

// 휴대폰 번호 앞자리 변경 핸들러 추가
const handlePhonePrefixChange = (event) => {
  phonePrefix.value = event.target.value;
};
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
          <img src="/images/jung/reservation-bar2.png" alt="예약진행바" />
        </div>
        <div class="progress_text">
          <p>예약하기</p>
          <p>확인 및 결제</p>
          <p>예약완료</p>
        </div>
      </section>
      <!-- 하단 -->
      <section class="res_order_wrap" id="step3_inner">
        <form class="card_form card_box">
          <!-- 예약확인 영역 -->
          <h2 class="pay_title">예약정보<span>*</span></h2>
          <div class="res_pay_card res_cart">
            <ul class="cart_row">
              <li>
                <label>출발지</label>
                <div>{{ reservationDetails.departurePlace || "-" }}</div>
              </li>
              <li>
                <label>짐 맡길 일정</label>
                <div>
                  {{
                    reservationDetails.departureDate &&
                    reservationDetails.departureTime
                      ? `${reservationDetails.departureDate} / ${reservationDetails.departureTime}`
                      : "-"
                  }}
                </div>
              </li>
              <li>
                <label>도착지</label>
                <div>{{ reservationDetails.arrivalPlace || "-" }}</div>
              </li>
              <li>
                <label>짐 찾을 일정</label>
                <div>
                  {{
                    reservationDetails.arrivalDate &&
                    reservationDetails.arrivalTime
                      ? `${reservationDetails.arrivalDate} / ${reservationDetails.arrivalTime}`
                      : "-"
                  }}
                </div>
              </li>
              <li>
                <label>수하물</label>
                <div>
                  {{
                    reservationDetails.luggage
                      ?.map((item) => `${item.name} ${item.quantity}개`)
                      .join(", ") || "-"
                  }}
                </div>
              </li>
            </ul>
            <div class="cart_line"></div>
            <!-- 수정 버튼 -->
            <div class="edbtn">
              <button class="edit_btn" @click="handleEdit">수정</button>
            </div>
          </div>
        </form>
        <!-- 예약정보 확인 끝 -->
        <form>
          <!-- 예약자 정보 -->
          <div class="res_info card_box">
            <h2 class="pay_title">예약자 정보<span>*</span></h2>
            <div class="res_pay_card">
              <ul>
                <!-- 라디오 체크 박스 -->
                <div class="nation_check">
                  <li>
                    <label class="nation">
                      <input
                        type="radio"
                        name="od_nation"
                        value="D"
                        class="form_check_input"
                        checked />내국인
                    </label>
                  </li>
                  <li>
                    <label class="nation">
                      <input
                        type="radio"
                        name="od_nation"
                        value="D"
                        class="form_check_input"
                         />외국인
                    </label>
                  </li>
                </div>
                <!-- 예약자 이름 입력 -->
                <li class="info_row">
                  <label class="res_info_title">예약자 성명</label>
                  <input
                    class="res_info_input"
                    type="text"
                    v-model="name"
                    placeholder="보내는 사람의 성함을 입력해 주세요."
                    required />
                </li>
                <!-- 휴대폰 번호 -->
                <li class="info_row info_row_phone">
                  <label class="res_info_title">휴대폰 번호</label>
                  <!-- <select class="res_select res_info_input">
                    <optgroup label="번호선택">
                      <option value="010">010</option>
                      <option value="010">011</option>
                    </optgroup>
                  </select> -->
                  <input
                    class="res_info_input"
                    type="text"
                    v-model="phone"
                    @input="handlePhoneInput"
                    placeholder="카카오 알림톡을 받으실 연락처를 알려주세요."
                    id="number_input"
                    maxlength="11"
                    required />
                  <p v-if="showNumberOnlyMessage" class="error-message">
                    숫자만 입력해주세요.
                  </p>
                </li>
                <!-- 이메일 -->
                <li class="info_row">
                  <label class="res_info_title">이메일</label>
                  <input
                    id="email_input"
                    class="res_info_input"
                    type="text"
                    v-model="email"
                    @input="handleEmailInput"
                    placeholder="예약확정 안내 메일이 전송됩니다."
                    required />
                  <p v-if="showEmailError" class="error-message">
                    올바른 이메일 형식을 입력해주세요.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 결제 정보 -->
          <div class="res_payment_info card_box">
            <h2 class="pay_title">결제 정보<span>*</span></h2>
            <!-- 결제 수단 선택 -->
            <div class="res_pay_card">
              <div class="res_pay_sl">
                <h3>결제 방법</h3>

                <fieldset>
                  <input
                    type="radio"
                    name="od_settle"
                    class="form_check_input"
                    value="신용카드"
                    id="od_settle_card"
                    @change="handlePaymentMethodChange('신용카드')" />
                  <label for="od_settle_card">신용카드</label>
                  <input
                    type="radio"
                    name="od_settle"
                    class="form_check_input"
                    value="계좌이체"
                    id="od_settle_iche"
                    @change="handlePaymentMethodChange('계좌이체')" />
                  <label for="od_settle_iche">실시간 계좌이체</label>
                  <input
                    type="radio"
                    name="od_settle"
                    class="form_check_input"
                    value="네이버페이"
                    id="od_settle_npay"
                    @change="handlePaymentMethodChange('네이버페이')" />
                  <label for="od_settle_npay">네이버페이</label>
                </fieldset>

                <!-- 라인 -->
                <div class="res_pay_line"></div>
                <!-- 결제 -->
                <div class="pay_order_box">
                  <!-- 좌측 영역 -->
                  <div class="pay_order">
                    <h3>결제 금액</h3>
                  </div>
                  <!-- 우측 영역 -->
                  <div class="pay_order od_right">
                    <ul class="od_right_ul">
                      <li>
                        <label>운송요금</label>
                        <strong class="right_price"
                          >{{
                            formatPrice(reservationDetails.totalPrice)
                          }}
                          원</strong
                        >
                      </li>
                      <li>
                        <label>추가요금</label>
                        <strong class="right_price">0 원</strong>
                      </li>
                      <li id="coupon_area">
                        <label>쿠폰적용</label>
                        <div class="coupon_area">
                          <input
                            type="text"
                            placeholder="쿠폰번호를 입력해 주세요" />
                          <!-- 알림창 띄우기 쿠폰 번호를 입력해주세요 -->
                          <span class="coupon_btn close_btn" id="coupon_apply"
                            >적용</span
                          >
                          <span class="coupon_btn" style="display: none"
                            >취소</span
                          >
                        </div>
                      </li>
                      <li>
                        <label>쿠폰할인</label>
                        <strong class="right_price">0 원</strong>
                      </li>
                      <li class="right_line"></li>
                      <li>
                        <label>최종 결제 금액</label>
                        <strong class="right_price"
                          >{{
                            formatPrice(reservationDetails.totalPrice)
                          }}
                          원</strong
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 이용 약관 동의 -->
          <div class="agree_box card_box">
            <h2 class="pay_title">이용 약관 동의<span>*</span></h2>
            <div id="agree_card">
              <div class="agree">
                <label>
                  <input
                    class="form_check_all"
                    type="checkbox"
                    :checked="agree"
                    @change="handleAllAgree" />모든 약관에 동의합니다.
                </label>
              </div>
              <div class="agree agree_line"></div>
              <div class="agree">
                <label>
                  <input
                    type="checkbox"
                    :checked="individualAgrees.stipulation1"
                    @change="handleIndividualAgree('stipulation1')" />
                  <span>[필수]</span>
                  이용약관 동의
                  <u>보기</u>
                </label>
              </div>
              <div class="agree">
                <label>
                  <input
                    type="checkbox"
                    :checked="individualAgrees.stipulation2"
                    @change="handleIndividualAgree('stipulation2')" />
                  <span>[필수]</span>
                  개인정보 취급방침 동의
                  <u>보기</u>
                </label>
              </div>
            </div>
          </div>
          <!-- 결제하기 버튼 -->
          <div class="confirm_btn" @click="confirmPayment">
            <input class="c_btn btn_submit" type="button" value="결제하기" />
          </div>
        </form>
      </section>
    </div>
  </div>
  <!-- 모달 컴포넌트 -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal-content">
      <p>{{ modalMessage }}</p>
      <div class="modal-buttons">
        <button @click="closeModal" class="confirm-btn">확인</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";
@import "/src/assets/resTop.scss";

#step3_inner {
  max-width: 800px;
  margin: auto;
}

.progress_text p:nth-child(2) {
  // font-size: 1.875rem;
  font-weight: 600;
  color: $primary-color;
}
// 소타이틀
.pay_title {
  font-size: 20px;
  font-weight: bold;
  span {
    color: $primary-color;
    margin-left: 4px;
  }
}
.card_box {
  margin: 50px 0;
}
//예약 정보
.res_cart {
  padding: 0;
  .cart_row {
    padding: 35px 35px 0;
    li {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 24px;
      > div {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
}
.edbtn {
  padding: 12px 35px;
  display: flex;
  flex-direction: row-reverse;
  .edit_btn {
    background-color: $font-light-gray;
    &:hover {
      background-color: $font-gray;
    }
  }
}
.cart_line {
  border-bottom: 1px dashed $input-select;
  width: 100%;
}
// 예약자 정보
.res_info ul li {
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
}
.nation_check {
  display: flex;
  gap: 30px;
  label {
    display: flex;
    gap: 10px;
    font-weight: bold;
  }
}
// 체크박스
.form_check_input {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  appearance: none;
  border: 1px solid $input-select;
  &:checked {
    border: 4px solid $primary-color;
  }
}
// 예약자 인풋
.info_row {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.res_info_title {
  font-weight: bold;
  text-wrap: nowrap;
  width: 110px;
  height: 50px;
  padding-top: 18px;
}
.res_info_input {
  padding: 0.375rem 0.75rem;
  border: 1px solid $input-select;
  color: $font-light-gray;
  border-radius: 6px;
  width: 100%;
  height: 45px;
  transition: all 0.3s;
  &:focus {
    border: none;
    outline: 3px solid rgba(255, 111, 0, 0.5);
    box-shadow: $reservation-boxShadow;
  }
}
//연락처 에러 메세지
.info_row_phone {
  position: relative;
  .error-message {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
// .res_select {
//   width: 15%;
//   font-size: 15px;
//   color: $font-gray;
// }
// #number_input {
//   width: 85%;
//   margin-left: 10px;
// }
// 결제 정보
.res_pay_sl {
  h3 {
    font-weight: bold;
  }
  fieldset {
    // border: 2px solid $input-select;
    // border-radius: 20px;
    padding: 15px 0 0;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    font-size: 15px;
    label {
      margin-right: 10px;
    }
  }
}
.res_pay_line {
  border-bottom: 1px dashed $input-select;
  margin: 15px 0 20px;
}
.pay_order_box {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  .pay_order {
    flex: 0 0 auto;
    width: 50%;
    padding: 0 12px;
    ul {
      li:last-child {
        margin: 0;
      }
      li {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        strong {
          font-size: 15px;
        }
        label {
          font-size: 13px;
        }

        &.right_line {
          width: 100%;
          border-bottom: 1px dashed $input-select;
        }
        &:last-child strong {
          color: $primary-color;
          font-size: 16px;
          font-weight: bold;
        }
        &:last-child label {
          font-weight: bold;
          font-size: 14px;
        }
        // 쿠폰
        .coupon_area {
          input {
            text-align: center;
            padding: 10px;
            width: 200px;
            height: 30px;
            font-size: 13px;
            color: $font-light-gray;
            border: 1px solid $input-select;
            background: #fff;
            border-radius: 5px;
            &:focus {
              border: none;
              outline: 3px solid rgba(255, 111, 0, 0.5);
              box-shadow: $reservation-boxShadow;
            }
          }
        }
        .coupon_btn {
          padding: 7.5px 8px;
          font-size: 14px;
          margin-left: 5px;
          font-weight: 300;
          cursor: pointer;
          background-color: $font-light-gray;
          &:hover {
            background-color: $font-gray;
          }
        }
      }
    }
  }
}
#coupon_area {
  display: flex;
  align-items: center;
}
// 이용약관 동의
#agree_card {
  padding: 20px 25px 35px 25px;
  margin-top: 12px;
  border-radius: 10px;
  // background-color: aqua;
  .agree {
    width: 100%;
    // background-color: aquamarine;
    margin-bottom: 10px;
    &.agree_line {
      border-bottom: 1px dashed $input-select;
    }
    input {
      width: 16px;
      height: 16px;
      margin-right: 10px;
      margin-left: 5px;
      vertical-align: bottom;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }
    span {
      margin-right: 4px;
      color: $primary-color;
    }
    u {
      color: $font-light-gray;
      float: right;
      font-size: 13px;
      cursor: pointer;
      margin-right: 5px;
    }
  }
}
// 결제하기 버튼
.confirm_btn {
  margin: 0 0 50px 0;
  display: flex;
  .btn_submit {
    width: 50%;
    font-size: 16px;
    font-weight: bold;
    padding: 20px 0;
    margin: auto;
    cursor: pointer;
  }
}

/* 모달 스타일 */
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
    margin-top: 20px;
    color: #111;
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
  }
}

.error-message {
  color: $primary-color;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 10px;
  position: absolute;
  top: 15px;
  right: 15px;
}
@media screen and (max-width: 390px) {
  .pay_order_box .pay_order ul li .coupon_area input {
    width: 150px;
    font-size: 12px;
  }
}

@media screen and (max-width: 480px) {
  .res_pay_sl {
    fieldset {
      padding: 10px 0 0;
      gap: 6px;
      label {
        font-size: 14px;
      }
    }
    .res_pay_line {
      margin: 10px 0 20px;
    }
  }
  .form_check_input {
    width: 14px;
    height: 14px;
  }
  .res_pay_card {
    padding: 20px 20px;
    margin-top: 12px;
    .cart_row {
      padding: 0;
    }
  }
  .res_cart {
    padding: 20px 20px 0;
  }
  .edbtn {
    padding: 10px 0;
  }

  #agree_card {
    padding: 20px 20px 35px;
  }
}
@media screen and (max-width: 768px) {
  // gotop 버튼
  .topBtnWrap {
    display: none !important;
  }
  // 예약 정보
  .res_cart .cart_row li {
    font-size: 14px;
  }
  // 예약자 정보
  .nation_check label {
    font-size: 14px;
  }
  .res_info_title {
    font-size: 14px;
  }
  .res_info_input {
    font-size: 13px;
  }
  // .res_select {
  // }
  // #number_input {
  //   width: 80%;
  // }
  // 결제 정보
  .pay_order_box {
    display: block;
    .pay_order {
      width: 100%;
      ul {
        padding-top: 20px;
      }
    }
  }
  // 이용약관 동의
  .agree {
    font-size: 15px;
  }
}
</style>
