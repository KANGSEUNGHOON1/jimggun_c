<script setup>
import { ref, computed } from "vue";
// 결제 , step
const emit = defineEmits(["next", "prev"]);
const props = defineProps({
  resevationData: Object,
});
const reservationDetails = computed(
  () => props.resevationData?.reservationDetails || {}
);

// 예약자 정보와 결제 방법을 저장하는 computed 속성 추가
const reservationInfo = computed(
  () => props.resevationData?.reservationInfo || {}
);

// 가격 포맷 함수 추가
const formatPrice = (price) => {
  if (!price) return "0";
  return `${price.toLocaleString()}`;
};

// 전화번호 형식화 함수 추가
const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  // 하이픈 제거 후 숫자만 추출
  const numbers = phone.replace(/-/g, "");
  // 3자리, 4자리, 4자리로 분리하여 하이픈 추가
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
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
          <img src="/images/jung/reservation-bar3.png" alt="예약진행바" />
        </div>
        <div class="progress_text">
          <p>예약하기</p>
          <p>확인 및 결제</p>
          <p>예약완료</p>
        </div>
      </section>
      <!-- 본문 -->
      <section class="res_pay_card" id="card_custom">
        <form>
          <!-- 카드 상단 -->
          <div class="confirmation_top">
            <div class="conImg">
              <img src="/images/jung/s4_check_icon.png" alt="예약완료" />
            </div>
            <div class="conTopTitle">
              <h2>예약이 <b>완료</b>되었습니다.</h2>
              <div class="conBtn">
                <button type="button">
                  <img src="/images/jung/s4_btn_icon.png" alt="공유하기" /><b
                    id="conBtn_txt"
                    >공유하기</b
                  >
                </button>
              </div>
            </div>
          </div>
          <!-- 예약 내역 -->
          <div class="confirmation_info">
            <!-- 예약 정보 -->
            <div class="confirmation_card">
              <div class="confirmation_title">
                <span
                  ><img src="/images/jung/s4_date_icon.png" alt="예약정보"
                /></span>
                <p>예약 정보</p>
              </div>
              <ul>
                <li>
                  <label>출발지</label>
                  <div>{{ reservationDetails.departurePlace }}</div>
                </li>
                <li>
                  <label>짐 맡길 일정</label>
                  <div>
                    {{
                      `${reservationDetails.departureDate} / ${reservationDetails.departureTime}`
                    }}
                  </div>
                </li>
                <li>
                  <label>도착지</label>
                  <div>{{ reservationDetails.arrivalPlace }}</div>
                </li>
                <li>
                  <label>짐 찾을 일정</label>
                  <div>
                    {{
                      `${reservationDetails.arrivalDate} / ${reservationDetails.arrivalTime}`
                    }}
                  </div>
                </li>
                <li>
                  <label>수하물</label>
                  <div>
                    {{
                      reservationDetails.luggage
                        ?.map((item) => `${item.name} ${item.quantity}개`)
                        .join(", ")
                    }}
                  </div>
                </li>
              </ul>
            </div>
            <!-- 예약자 정보 -->
            <div class="confirmation_card">
              <div class="confirmation_title">
                <span
                  ><img src="/images/jung/s4_my_icon.png" alt="예약자정보"
                /></span>
                <p>예약자 정보</p>
              </div>
              <ul>
                <li>
                  <label>예약자 성명</label>
                  <div>{{ reservationInfo.name }}</div>
                </li>
                <li>
                  <label>휴대폰 번호</label>
                  <div>{{ formatPhoneNumber(reservationInfo.phone) }}</div>
                </li>
                <li>
                  <label>이메일</label>
                  <div>{{ reservationInfo.email }}</div>
                </li>
              </ul>
            </div>
            <!-- 결제 정보 -->
            <div class="confirmation_card">
              <div class="confirmation_title">
                <span
                  ><img src="/images/jung/s4_pay_icon.png" alt="결제정보"
                /></span>
                <p>결제 정보</p>
              </div>
              <ul>
                <li>
                  <label>결제 방법</label>
                  <div>{{ reservationInfo.paymentMethod }}</div>
                </li>
                <li>
                  <label>결제 금액</label>
                  <div id="totalPrice_info">
                    {{ formatPrice(reservationDetails.totalPrice) }} 원
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </section>
      <!-- <div class="confirm_btn" @click="confirmPayment">
        <button class="c_btn btn_submit" type="button">메인으로 가기</button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";
@import "/src/assets/resTop.scss";

.progress_text p:last-child {
  // font-size: 1.875rem;
  font-weight: 600;
  color: $primary-color;
}
// 상단
.confirmation_top {
  position: relative;
  text-align: center;
  .conTopTitle {
    h2 {
      margin: 15px 0 25px;
      font-weight: bold;
      // font-size: 26px;
      font-size: clamp(1.25rem, calc(0.9rem + 0.8vw), 1.625rem);
      // margin-top: 20px;
      b {
        color: $primary-color;
      }
    }
  }
  // 공유 버튼
  .conBtn {
    // background-color: aqua;
    position: absolute;
    // bottom: -15px;
    right: 15px;
    top: -15px;

    button {
      cursor: pointer;
      border: none;
      border-radius: 6px;
      background-color: $sub-color;
      // background-color: #fff;
      // border: 1px solid #ddd;
      font-size: 12px;
      display: flex;
      align-items: flex-start;
      gap: 4px;
      padding: 4px 8px 4px 6px;
      color: $font-light-gray;
      font-weight: 600;
    }
  }
}
// 본문
#card_custom {
  max-width: 700px;
  margin: auto;
  padding: 30px 0;
  margin-bottom: 80px;
}
.confirmation_info {
  .confirmation_card {
    width: 95%;
    margin: auto;
    padding-top: 20px;
    border-top: 1px dashed $input-select;
    .confirmation_title {
      display: flex;
      align-items: center;
      gap: 4px;
      width: 70%;
      margin: auto;
      p {
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  ul {
    width: 70%;
    margin: auto;
    li {
      display: flex;
      justify-content: space-between;
      margin: 18px 0;
      font-size: 14px;
      // font-weight: 900;
      div {
        font-weight: 500;
      }
      label {
        color: $font-light-gray;
      }
    }
  }
}
.confirm_btn {
  margin: 70px 0;
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
#totalPrice_info {
  // color: $warning-color;
  font-weight: bold;
}
@media screen and (max-width: 768px) {
  // gotop 버튼
  .topBtnWrap {
    display: none !important;
  }
  .conBtn {
    top: 0;
  }
}
@media screen and (max-width: 480px) {
  .conImg {
    width: 45px;
    display: inline-block;
    img {
      width: 100%;
    }
  }
  .conBtn {
    top: 0;
  }
  .confirmation_info {
    ul li label {
      font-size: 13px;
    }
    .confirmation_card .confirmation_title {
      span {
        // width: 20px;

        img {
          width: 100%;
        }
      }
      p {
        font-size: 16px;
      }
    }
  }
  #conBtn_txt {
    display: none;
  }
}
</style>
