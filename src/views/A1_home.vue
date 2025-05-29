<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
// 언어변경
import { useI18n } from "vue-i18n";
// 라이브러리
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";
// gotop버튼
import GototopBtn from "@/components/GototopBtn.vue";
// 출발지/도착지 모달 컴포넌트 불러오기
import ModalInquire from "@/components/ModalInquire.vue";
// 날짜선택시 달력 모달 컴포너트 불러오기
import DatePicker from "@/components/DatePicker.vue";
// 예약바로가기 정보 예약페이지로 넘기기
import { useReservationStore } from "@/stores/reservation";

// 언어변경
const { t, locale, messages } = useI18n();

const changeLang = (lang) => {
  locale.value = lang;
};

// 슬라이드 이미지 데이터
const mainBannerData = computed(() => {
  // t: 번역 함수 (t('hello') → 현재 언어로 번역된 "hello" 표시)
  // locale: 현재 선택된 언어 코드 ('ko', 'en' 등)
  const currentMessages = messages.value[locale.value];
  const data = currentMessages?.mainBanner || [];

  return data.map((slide, index) => ({
    ...slide,
    id: index + 1,
    image: slide.image || `/images/hong/slideImg${index + 1}.png`,
    imageWidth: slide.imageWidth || (index === 3 ? "280px" : index === 2 ? "350px" : "400px"),
  }));
});

// 예약바로기 미니버튼 로그인 상태 기반 라우팅
const router = useRouter();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.getIsLoggedIn);

// 예약바로가기 출발지/도착지 모달 띄우기
const isDepartureModalOpen = ref(false);
const isArrivalModalOpen = ref(false);
const departurePlace = ref("");
const arrivalPlace = ref("");

const handleDepartureSelect = (place) => {
  departurePlace.value = place;
  isDepartureModalOpen.value = false;
};

const handleArrivalSelect = (place) => {
  arrivalPlace.value = place;
  isArrivalModalOpen.value = false;
};
// 예약바로가기 달력 모달 띄우기
const isDatePickerOpen = ref(false);
const selectedType = ref(""); // 'departure' or 'arrival'
const selectedDepartureDate = ref("");
const selectedArrivalDate = ref("");
const datePickerPosition = ref({ top: 0, left: 0 });
// 날짜 선택 input 클릭 시 달력 열기
const openDatePicker = (type, event) => {
  selectedType.value = type;
  const rect = event.target.getBoundingClientRect();
  datePickerPosition.value = {
    top: rect.bottom + window.scrollY + 5,
    left: rect.left + window.scrollX,
  };
  isDatePickerOpen.value = true;
};
// 날짜 선택 완료
const handleDateSelect = (date) => {
  if (selectedType.value === "departure") {
    selectedDepartureDate.value = date;

    // 맡긴 다음 날을 자동으로 찾을 날짜로 설정
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const formatted = nextDay.toISOString().split("T")[0]; // YYYY-MM-DD
    selectedArrivalDate.value = formatted;
  } else {
    selectedArrivalDate.value = date;
  }
  isDatePickerOpen.value = false;
};

// 예약바로가기 정보 예약페이지로 넘기기
const reservationStore = useReservationStore();

const handleGoToReservation = () => {
  reservationStore.setReservation({
    departurePlace: departurePlace.value,
    arrivalPlace: arrivalPlace.value,
    departureDate: selectedDepartureDate.value,
    arrivalDate: selectedArrivalDate.value,
  });

  // 로그인 여부에 따라 라우팅
  if (isLoggedIn.value) {
    router.push("/reservation");
  } else {
    router.push("/reslogin");
  }
};
</script>

<template>
  <GototopBtn />

  <div class="main-wrap">
    <!-- 메인배너 슬라이드 -->
    <section class="visual">
      <!-- 메인베너 -->
      <Swiper :modules="[Autoplay]" :loop="true" :autoplay="{ delay: 3000 }">
        <SwiperSlide v-for="(slide, index) in mainBannerData" :key="index" class="slide">
          <div class="mainbannerText">
            <h1>{{ slide.title1 }}</h1>
            <h2>{{ slide.title2 }}</h2>
            <h3>
              {{ slide.title3 }}
              <span v-if="slide.title3Span">{{ slide.title3Span }}</span>
              {{ slide.title3After }}
            </h3>
            <h4>
              <span>{{ slide.title4Span }}</span>
              {{ slide.title4 }}
            </h4>
          </div>
          <div class="mainbannerImage">
            <img :src="slide.image" :alt="'슬라이드이미지' + slide.id" :style="{ width: slide.imageWidth }" :class="[slide.id === 3 ? 'mobile-img-3' : '', slide.id === 4 ? 'mobile-img-4' : '']" />
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- 바로 예약하기 -->
      <div class="reservationMini">
        <form>
          <!-- 출발지 입력 -->
          <div class="mini-text mini-text1">
            <label for="mini-dep">{{ t("pickup") }}</label>
            <input id="mini-dep" type="text" :value="departurePlace" readonly :placeholder="t('athome')" @click="isDepartureModalOpen = true" />
          </div>
          <!-- 맡길 날짜 -->
          <div class="mini-text mini-text1">
            <label for="mini-dep">{{ t("scheduled") }}</label>
            <input id="mini-dep" type="text" :value="selectedDepartureDate" readonly placeholder="2025.05.30" @click="openDatePicker('departure', $event)" />
          </div>
          <!-- 도착지 입력 -->
          <div class="mini-text mini-text1">
            <label for="mini-arr">{{ t("destination") }}</label>
            <input id="mini-arr" type="text" :value="arrivalPlace" readonly :placeholder="t('station')" @click="isArrivalModalOpen = true" />
          </div>
          <!-- 찾을 날짜 -->
          <div class="mini-text">
            <label for="mini-arr">{{ t("pickuptime") }}</label>
            <input id="mini-arr" type="text" :value="selectedArrivalDate" readonly placeholder="2025.05.31" @click="openDatePicker('arrival', $event)" />
          </div>
        </form>
        <!-- <router-link :to="isLoggedIn ? '/reservation' : '/reslogin'" class="mini-button">
          <p>바로 예약</p>
        </router-link> -->
        <div class="mini-button" @click="handleGoToReservation">
          <p>{{ t("reservation") }}</p>
        </div>
      </div>
    </section>

    <!-- 바로 예약하기 모달 -->
    <!-- 출발지 모달 -->
    <ModalInquire :isOpen="isDepartureModalOpen" @close="isDepartureModalOpen = false" @select="handleDepartureSelect" />
    <!-- 도착지 모달 -->
    <ModalInquire :isOpen="isArrivalModalOpen" @close="isArrivalModalOpen = false" @select="handleArrivalSelect" />
    <!-- 달력 컴포넌트 -->
    <DatePicker
      v-if="isDatePickerOpen"
      :type="selectedType"
      :departureDate="selectedDepartureDate"
      @select="handleDateSelect"
      @close="isDatePickerOpen = false"
      :style="{
        position: 'absolute',
        top: `${datePickerPosition.top}px`,
        left: `${datePickerPosition.left}px`,
        zIndex: 9999,
      }" />

    <!-- 파트 1 -->
    <section class="a1-part1 inner">
      <div class="a1-part1-title">
        <h3>{{ t("benefits") }}</h3>
        <p>{{ t("checkbenefits1") }}</p>
        <p>{{ t("checkbenefits2") }}</p>
      </div>
      <ul class="a1-part1-boxes">
        <li class="part1-box1 part1-box">
          <div class="part1-img">
            <img src="/images/hong/s-banner-1.png" alt="혜택1" />
          </div>
          <div class="box-text box1-text">
            <h3>{{ t("allBenefits") }}</h3>
            <p>{{ t("appDownload") }}</p>
          </div>
        </li>
        <li class="part1-box2 part1-box">
          <div class="part1-img">
            <img src="/images/hong/s-banner-3.png" alt="혜택2" />
          </div>
          <div class="box-text box2-text">
            <h3>{{ t("thoroughCare") }}</h3>
            <p>{{ t("options") }}</p>
          </div>
        </li>
        <li class="part1-box3 part1-box">
          <div class="part1-img">
            <img src="/images/hong/s-banner-2.png" alt="혜택3" />
          </div>
          <div class="box-text box3-text">
            <h3>Guid for Foreign Users</h3>
            <p>{{ t("guide") }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- 파트 2 -->
    <section class="a1-part2">
      <!-- 파트2 - 제목 -->
      <div class="part2-title">
        <h3>{{ t("travelFree") }}</h3>
        <p>{{ t("travelFree1") }}</p>
        <p>{{ t("travelFree2") }}</p>
      </div>

      <!-- 파트2 - 내용 -->
      <div class="part2-contents-all">
        <!-- 파트 2 웹 용 -->
        <div class="part2-web">
          <!-- 왼쪽 두개 -->
          <div class="part2-left">
            <!-- 1 -->
            <div class="p2-contents">
              <!-- 아이콘 -->
              <div class="p2-contents-icons">
                <img src="/images/hong/part2-icon1.png" alt="해외출장" />
                <h3>{{ t("business") }}</h3>
              </div>
              <!-- 말풍선 글 1-->
              <div class="p2-contents-texts1 p2-underline">
                <h3>
                  {{ t("businessTrip") }} <span> {{ t("businessTripSpan") }} </span>
                </h3>
                <p>
                  {{ t("TravelLight1") }} <br />
                  {{ t("TravelLight2") }} <br />{{ t("TravelLight3") }}
                </p>
              </div>
            </div>
            <!-- 2 -->
            <div class="p2-contents">
              <!-- 아이콘 -->
              <div class="p2-contents-icons">
                <img src="/images/hong/part2-icon2.png" alt="골프투어" />
                <h3>{{ t("golf") }}</h3>
              </div>
              <!-- 말풍선 글 2 -->
              <div class="p2-contents-texts2 p2-underline">
                <h3>
                  {{ t("golf1") }} <span> {{ t("golf2") }} </span>
                </h3>
                <p>{{ t("golfText1") }} <br />{{ t("golfText2") }} <br />{{ t("golfText3") }}</p>
              </div>
            </div>
          </div>

          <!-- 오른쪽 두개 -->
          <div class="part2-right">
            <!-- 3 -->
            <div class="p2-contents">
              <!-- 말풍선 글 3 -->
              <div class="p2-contents-texts3 p2-underline">
                <h3>
                  {{ t("weektrip1") }} <span> {{ t("weektrip2") }} </span>
                </h3>
                <p>{{ t("weektriptext1") }} <br />{{ t("weektriptext2") }} <br />{{ t("weektriptext3") }}</p>
              </div>
              <!-- 아이콘 -->
              <div class="p2-contents-icons">
                <img src="/images/hong/part2-icon3.png" alt="주말여행" />
                <h3>{{ t("week") }}</h3>
              </div>
            </div>
            <!-- 4 -->
            <div class="p2-contents">
              <!-- 말풍선 글 4 -->
              <div class="p2-contents-texts4 p2-underline">
                <h3>
                  {{ t("Evening1") }} <span> {{ t("Evening2") }} </span>
                </h3>
                <p>{{ t("Eveningtext1") }} <br />{{ t("Eveningtext2") }} <br />{{ t("Eveningtext3") }}</p>
              </div>
              <!-- 아이콘 -->
              <div class="p2-contents-icons">
                <img src="/images/hong/part2-icon4.png" alt="퇴근여행" />
                <h3>{{ t("Evening") }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- 파트 2 768 용 -->
        <div class="part2-tablet">
          <!-- 1 -->
          <div class="t-content1">
            <!-- 아이콘 영역 -->
            <div class="t-1-icon">
              <img src="/public/images/hong/part2-icon1.png" alt="해외출장-T" />
              <h3>{{ t("business") }}</h3>
            </div>
            <!-- 말풍선 영역 -->
            <div class="t-1-bubble p2-underline">
              <h2>
                {{ t("businessTrip") }} <span>{{ t("businessTripSpan") }}&nbsp</span>
              </h2>
              <p>
                {{ t("TravelLight1") }} <br />
                {{ t("TravelLight2") }} <br />{{ t("TravelLight3") }}
              </p>
            </div>
          </div>
          <!-- 2 -->
          <div class="t-content2">
            <!-- 말풍선 영역 -->
            <div class="t-2-bubble p2-underline">
              <h2>
                {{ t("weektrip1") }} <span>{{ t("weektrip2") }}</span>
              </h2>
              <p>{{ t("weektriptext1") }} <br />{{ t("weektriptext2") }} <br />{{ t("weektriptext3") }}</p>
            </div>
            <!-- 아이콘 영역 -->
            <div class="t-2-icon">
              <img src="/public/images/hong/part2-icon3.png" alt="주말여행-T" />
              <h3>{{ t("week") }}</h3>
            </div>
          </div>
          <!-- 3 -->
          <div class="t-content3">
            <!-- 아이콘 영역 -->
            <div class="t-1-icon">
              <img src="/public/images/hong/part2-icon2.png" alt="골프투어-T" />
              <h3>{{ t("golf") }}</h3>
            </div>
            <!-- 말풍선 영역 -->
            <div class="t-1-bubble p2-underline">
              <h2>
                {{ t("golf1") }} <span>{{ t("golf2") }}</span>
              </h2>
              <p>{{ t("golfText1") }} <br />{{ t("golfText2") }} <br />{{ t("golfText3") }}</p>
            </div>
          </div>
          <!-- 4 -->
          <div class="t-content4">
            <!-- 말풍선 영역 -->
            <div class="t-2-bubble p2-underline">
              <h2>
                {{ t("Evening1") }} <span>{{ t("Evening2") }}</span>
              </h2>
              <p>{{ t("Eveningtext1") }} <br />{{ t("Eveningtext2") }} <br />{{ t("Eveningtext3") }}</p>
            </div>
            <!-- 아이콘 영역 -->
            <div class="t-2-icon">
              <img src="/public/images/hong/part2-icon4.png" alt="퇴근여행-T" />
              <h3>{{ t("Evening") }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 파트 3 -->
    <section class="a1-part3 inner">
      <!-- 첫번째 박스 -->
      <div class="part3-box1">
        <!-- 백그라운드 이미지 -->
        <!-- <div class="bgImg">
      <img src="/public/images/hong/part3-bg1.png" alt="">
      </div> -->

        <!-- 폰 이미지 -->
        <div class="phoneImg">
          <img src="/images/hong/part3-phoneImg.png" alt="폰 이미지" />
        </div>
        <!-- 텍스트 영역 전체 -->
        <div class="appTextPart">
          <div class="appTexts">
            <div class="appTexts-spans">
              <span class="jimggun-span">{{ t("jimggun") }}</span>
              <span class="appdownload-span">{{ t("download") }}</span>
            </div>
            <p>{{ t("journeywithoutluggage") }}</p>
            <p>{{ t("experienceitwithMovers") }}</p>
          </div>
          <!-- 다운로드 버튼들 -->
          <div class="downloadBtns">
            <!-- 안드로이드 -->
            <div class="androidBtn">
              <div class="androidBtnImg">
                <img src="/images/hong/p3-playstore.png" alt="플레이스토어 로고" />
                <span class="playstoreENG">Google Play</span>
              </div>
              <div class="androidBtnText">
                <span class="playstoreKOR">AOS</span>
                <span class="playstoreAdd">AOS</span>
              </div>
            </div>
            <!-- IOS -->
            <div class="appstoreBtn">
              <div class="appstoreBtnImg">
                <img src="/images/hong/p3-appstore.png" alt="플레이스토어 로고" />
                <span class="appstoreENG">App Store</span>
              </div>
              <div class="appstoreBtnText">
                <span class="appstoreIOS">IOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 두번째 박스 -->
      <div class="part3-box2">
        <h3>{{ t("coupon") }}</h3>
        <p>{{ t("coupontext1") }}</p>
        <p>{{ t("coupontext2") }}</p>
        <div class="couponImg">
          <img src="/images/hong/part3-coupon.png" alt="쿠폰 이미지" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";

.inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}
.main-wrap {
  width: 100%;

  // 메인베너
  .visual {
    width: 100%;
    position: relative;
    .swiper-wrapper {
      width: 100%;
      .slide {
        width: 100%;
        height: 32vw;
        min-height: 450px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 100px;
        background-color: $bg-light;
        @media screen and (max-width: 1192px) {
          gap: 50px !important;
        }
        @media screen and (max-width: 768px) {
          height: auto !important;
          max-height: 600px !important;
          padding: 40px 20px 40px 20px !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          gap: 1px !important;
        }
        @media screen and (max-width: 390px) {
          gap: 0 !important;
          padding: 20px 10px !important;
        }

        .mainbannerText {
          display: flex !important;
          flex-direction: column !important;
          gap: 8px;
          @media screen and (max-width: 768px) {
            text-align: left !important;
            gap: 4px !important;
            width: 100% !important;
            align-items: flex-start !important;
            max-width: 500px !important;
          }

          h1 {
            font-size: 35px;
            font-weight: 600;
            color: $primary-color;
            @media screen and (max-width: 1192px) {
              font-size: $title-font-M !important;
            }
            @media screen and (max-width: 968px) {
              font-size: $title-font-XS !important;
            }
            @media screen and (max-width: 768px) {
              font-size: 22px !important;
            }
            @media screen and (max-width: 390px) {
              font-size: 20px !important;
            }
          }
          h2 {
            font-size: 65px;
            font-weight: 800;
            margin-bottom: 12px;
            @media screen and (max-width: 1192px) {
              font-size: 50px !important;
            }
            @media screen and (max-width: 968px) {
              font-size: 36px !important;
            }
            @media screen and (max-width: 768px) {
              margin-bottom: 6px !important;
              line-height: 1.2 !important;
            }
            @media screen and (max-width: 390px) {
              font-size: 28px !important;
            }
          }
          h3 {
            font-size: $title-font-S;
            @media screen and (max-width: 1192px) {
              font-size: $text-font-M !important;
            }
            @media screen and (max-width: 768px) {
              font-size: 15px !important;
              line-height: 1.4 !important;
            }
            @media screen and (max-width: 390px) {
              font-size: 13px !important;
            }

            span {
              color: $primary-color;
              font-weight: 700;
            }
          }
          h4 {
            font-size: $title-font-S;
            @media screen and (max-width: 1192px) {
              font-size: $text-font-M !important;
            }
            @media screen and (max-width: 768px) {
              font-size: 15px !important;
              line-height: 1.4 !important;
            }
            @media screen and (max-width: 390px) {
              font-size: 13px !important;
            }

            span {
              color: $primary-color;
              font-weight: 700;
            }
          }
        }
        .mainbannerImage {
          display: flex;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: 768px) {
            img.mobile-img-4 {
              transform: translateY(-20px) !important;
            }
            .mobile-img-3 {
              height: 95% !important;
            }
            .mobile-img-4 {
              width: 80% !important;
              max-width: 300px !important;
            }
          }
          @media screen and (max-width: 390px) {
            transform: translateY(-10px) !important;
            img.mobile-img-3 {
              transform: translateY(20px) !important;
            }
            img.mobile-img-4 {
              width: 70% !important;
              max-width: 300px !important;
              transform: translateY(-30px) !important;
            }
          }

          img {
            height: auto;
            object-fit: contain;
            @media screen and (max-width: 768px) {
              width: 80% !important;
              max-width: 480px !important;
            }
            @media screen and (max-width: 390px) {
              width: 90% !important;
              max-width: 320px !important;
              height: auto !important;
              margin-top: -10px !important;
            }
          }
        }
      }
    }
    // 바로 예약하기
    .reservationMini {
      overflow: visible; 
      width: 100%;
      max-width: 1000px;
      margin: 0 10px;
      padding-left: 15px;
      background-color: $white;
      border: 1px solid $bg-primary;
      border-radius: 50px;
      overflow: hidden;
      box-shadow: $reservation-boxShadow;
      display: flex;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      z-index: 10;
      form {
        width: 100%;
        // max-width: 850px;
        display: flex;
        padding: 5px;
      }
      .mini-text1 {
        position: relative;
        &::after {
          content: "";
          display: block;
          width: 1px;
          height: 35px; // 선 높이
          background-color: $bg-primary;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-55%);
        }
      }
      .mini-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        width: calc(100% / 4);
        // padding: 10px;
        margin: 15px 0 10px 0;
        // border-left: 1px solid $bg-primary;
        &:first-of-type {
          border: none;
        }
        label {
          // width: 100px;
          // flex-shrink: 0;
          width: 85%;
          font-size: 14px;
          margin-right: 10px;
          padding-left: 20px;
          padding-right: 5px;
          font-weight: 500;
        }
        input {
          // flex: 1;
          width: 85%;
          border: none;
          outline: none;
          padding: 6px;
          margin-left: 15px;
          margin-right: 15px;
          border-radius: 6px;
          &::placeholder {
            color: $font-light-gray;
          }
          &:focus {
            background-color: $sub-color;
          }
        }
      }
      .mini-button {
        background-color: $primary-color;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 16%;
        text-decoration: none;
        cursor: pointer;
        // border-radius: 50px;
        // margin: 10px;
        p {
          font-size: $text-font-L;
          color: $white;
          font-weight: 700;
        }
      }
    }
  }

  /* part 1 */

  // 파트 1 전체
  .a1-part1 {
    display: flex;
    justify-content: space-between;
    padding: 100px 0;
    /* 타이틀 */
    .a1-part1-title {
      h3 {
        font-size: $title-font-M;
        font-weight: bold;
        margin-bottom: 15px;
      }
      p {
        line-height: 20px;
        color: $font-gray;
      }
    }
    /* 이미지 박스들 */
    /* ul */
    .a1-part1-boxes {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 70%;
      gap: 20px;
      /* li */
      .part1-box {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        width: calc(100% / 3);
        min-width: 180px;
        max-width: 300px;
        overflow: hidden;
        border: 1px solid $input-select;
        border-radius: 10px;
        cursor: pointer;

        .part1-img {
          width: 100%;
          // width: 300px;
          // height: 200px;

          img {
            width: 100%;
          }
        }
        .box-text {
          padding: 18px 18px 22px 18px;
          display: flex;
          flex-direction: column;
          h3 {
            font-size: $text-font-XL;
            font-weight: bold;
            margin-bottom: 8px;
          }
          p {
            font-size: $text-font-S;
            color: $font-gray;
          }
        }
      }
    }
  }

  //   part 2

  // 파트 2 전체
  .a1-part2 {
    background-color: $sub-color;
    padding: 100px 0;
    display: flex;
    flex-direction: column;
    gap: 50px;
    //   파트 2 제목
    .part2-title {
      text-align: center;
      h3 {
        font-size: $title-font-L;
        font-weight: bold;
        margin-bottom: 12px;
        @media screen and (max-width: 390px) {
          font-size: 28px !important;
        }
      }
      p {
        line-height: 20px;
        color: $font-gray;
        @media screen and (max-width: 390px) {
          display: none;
        }
      }
    }

    //  파트 2 내용
    .part2-contents-all {
      display: flex;
      justify-content: center;

      // 웹 용
      .part2-web {
        display: flex;
        align-items: center;
        gap: 75px;
        @media screen and (max-width: 768px) {
          display: none !important;
        }
        //   왼쪽 둘
        .part2-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 45px;
          // 1
          .p2-contents {
            display: flex;
            align-items: center;
            gap: 75px;
            // 아이콘
            .p2-contents-icons {
              display: flex;
              flex-direction: column;
              text-align: center;
              gap: 10px;
              width: 100px;
              img {
                width: 100%;
              }
              h3 {
                font-size: $title-font-S;
                font-weight: 600; //semibold
              }
            }
            // 말풍선 글 1
            .p2-contents-texts1 {
              background-color: $white;
              position: relative;
              width: 280px;
              padding: 30px;
              border-radius: 10px;
              border-bottom-left-radius: 0;
              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: -30px;
                // transform: translateY(50%);
                transform: scaleX(-1);
                transform: scaleY(-1);
                width: 0;
                height: 0;
                border-left: 30px solid transparent;
                // border-right: 30px solid transparent;
                border-top: 25px solid $white;
              }
              h3 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
              }
              p {
                font-size: 14.5px;
                line-height: 18px;
                color: $font-light-gray;
              }
            }
            // 말풍선 글 2
            .p2-contents-texts2 {
              background-color: $white;
              position: relative;
              width: 280px;
              padding: 30px;
              border-radius: 10px;
              border-top-left-radius: 0;
              &::after {
                content: "";
                position: absolute;
                top: 0;
                left: -30px;
                transform: scaleY(-1);
                width: 0;
                height: 0;
                border-left: 30px solid transparent;
                // border-right: 30px solid transparent;
                border-bottom: 25px solid $white;
              }
              h3 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
              }
              p {
                font-size: 14.5px;
                line-height: 18px;
                color: $font-light-gray;
              }
            }
            // 말풍선 underline
            .p2-underline {
              span {
                position: relative;
                box-shadow: inset 0 -6px 0 rgba(255, 111, 0, 0.5);
              }
            }
          }
        }

        // 오른쪽 둘
        .part2-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 45px;
          // 3
          .p2-contents {
            display: flex;
            align-items: center;
            gap: 70px;
            // 아이콘
            .p2-contents-icons {
              display: flex;
              flex-direction: column;
              text-align: center;
              gap: 10px;
              width: 100px;
              img {
                width: 100%;
              }
              h3 {
                font-size: $title-font-S;
                font-weight: 600; //semibold
              }
            }
            // 말풍선 글 3
            .p2-contents-texts3 {
              background-color: $white;
              position: relative;
              width: 280px;
              padding: 30px;
              border-radius: 10px;
              border-bottom-right-radius: 0;
              &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: -30px;
                transform: translateY(-50%);
                transform: scaleY(-1);
                width: 0;
                height: 0;
                // border-left: 50px solid transparent;
                border-right: 30px solid transparent;
                border-top: 25px solid $white;
              }
              h3 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
              }
              p {
                font-size: 14.5px;
                line-height: 18px;
                color: $font-light-gray;
              }
            }
            // 말풍선 글 4
            .p2-contents-texts4 {
              background-color: $white;
              position: relative;
              width: 280px;
              padding: 30px;
              border-radius: 10px;
              border-top-right-radius: 0;
              &::after {
                content: "";
                position: absolute;
                top: 0;
                right: -30px;
                transform: translateY(-50%);
                transform: scaleY(-1);
                width: 0;
                height: 0;
                // border-left: 50px solid transparent;
                border-right: 30px solid transparent;
                border-bottom: 25px solid $white;
              }
              h3 {
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
              }
              p {
                font-size: 14.5px;
                line-height: 18px;
                color: $font-light-gray;
              }
            }
            // 말풍선 underline
            .p2-underline {
              span {
                position: relative;
                box-shadow: inset 0 -6px 0 rgba(255, 111, 0, 0.5);
              }
            }
          }
        }
      }

      // 768 용
      .part2-tablet {
        display: none;
        height: auto;
        // display: flex;
        flex-direction: column;
        gap: 50px;
        @media screen and (max-width: 768px) {
          display: flex !important;
          flex-direction: column !important;
        }
        @media screen and (max-width: 390px) {
          gap: 30px !important;
        }
        // 말풍선 underline
        .p2-underline {
          span {
            position: relative;
            display: inline-block; // 이거 중요!
            line-height: 1.2;
            box-shadow: inset 0 -6px 0 rgba(255, 111, 0, 0.5);
            white-space: nowrap; // 이거 추가
          }
        }
        // 1
        .t-content1 {
          display: flex;
          align-items: center;
          gap: 75px;
          @media screen and (max-width: 768px) {
            gap: 50px !important;
          }
          @media screen and (max-width: 390px) {
            gap: 30px !important;
          }
        }
        // 2
        .t-content2 {
          display: flex;
          align-items: center;
          gap: 75px;
          @media screen and (max-width: 768px) {
            gap: 50px !important;
          }
          @media screen and (max-width: 390px) {
            gap: 30px !important;
          }
        }
        // 3
        .t-content3 {
          display: flex;
          align-items: center;
          gap: 75px;
          @media screen and (max-width: 768px) {
            gap: 50px !important;
          }
          @media screen and (max-width: 390px) {
            gap: 30px !important;
          }
        }
        // 4
        .t-content4 {
          display: flex;
          align-items: center;
          gap: 75px;
          @media screen and (max-width: 768px) {
            gap: 50px !important;
          }
          @media screen and (max-width: 390px) {
            gap: 30px !important;
          }
        }
        // 왼쪽 아이콘 영역
        .t-1-icon {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 10px;
          width: 100px;
          @media screen and (max-width: 390px) {
            width: 70px !important;
            gap: 20px !important;
          }
          img {
            width: 100%;
          }
          h3 {
            font-size: $title-font-S;
            font-weight: 600; //semibold
            @media screen and (max-width: 390px) {
              font-size: 20px !important;
            }
          }
        }
        // 왼쪽 말풍선 영역
        .t-1-bubble {
          background-color: $white;
          position: relative;
          width: 255px;
          padding: 30px 50px;
          border-radius: 10px;
          border-bottom-left-radius: 0;
          @media screen and (max-width: 768px) {
            width: 300px !important;
          }
          @media screen and (max-width: 390px) {
            width: 200px !important;
            padding: 20px !important;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: -30px;
            transform: scaleX(-1);
            transform: scaleY(-1);
            width: 0;
            height: 0;
            border-left: 30px solid transparent;
            border-top: 25px solid $white;
          }
          h2 {
            font-size: $text-font-M;
            font-weight: 600;
            margin-bottom: 10px;
            @media screen and (max-width: 390px) {
              font-size: 14px !important;
            }
          }
          p {
            font-size: $text-font-S;
            line-height: 16px;
            color: $font-gray;
            @media screen and (max-width: 390px) {
              font-size: 12px !important;
            }
          }
        }
        // 오른쪽 말풍선 영역
        .t-2-bubble {
          background-color: $white;
          position: relative;
          width: 255px;
          padding: 30px 50px;
          border-radius: 10px;
          border-bottom-right-radius: 0;
          @media screen and (max-width: 768px) {
            width: 300px !important;
          }
          @media screen and (max-width: 390px) {
            width: 200px !important;
            padding: 20px !important;
          }
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            right: -30px;
            transform: translateY(-50%);
            transform: scaleY(-1);
            width: 0;
            height: 0;
            // border-left: 50px solid transparent;
            border-right: 30px solid transparent;
            border-top: 25px solid $white;
          }
          h2 {
            font-size: $text-font-M;
            font-weight: 600;
            margin-bottom: 10px;
            @media screen and (max-width: 390px) {
              font-size: 14px !important;
            }
          }
          p {
            font-size: $text-font-S;
            line-height: 16px;
            color: $font-gray;
            @media screen and (max-width: 390px) {
              font-size: 12px !important;
            }
          }
        }
        // 오른쪽 아이콘 영역
        .t-2-icon {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 10px;
          width: 100px;
          @media screen and (max-width: 390px) {
            width: 70px !important;
            gap: 20px !important;
          }
          img {
            width: 100%;
          }
          h3 {
            font-size: $title-font-S;
            font-weight: 600; //semibold
            @media screen and (max-width: 390px) {
              font-size: 20px !important;
            }
          }
        }
      }
    }
  }
  // part 3

  // 파트3 전체
  .a1-part3 {
    margin-top: 100px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: aqua;
    // 파트 3 - 첫번째 박스
    .part3-box1 {
      background: url("/public/images/hong/part3-bg1.png") center center / cover no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 45px;
      width: 55%;
      height: 407px;

      // 폰이미지
      .phoneImg {
        width: 150px;
        img {
          margin-top: 18px;
          width: 100%;
          display: block;
        }
      }
      // 텍스트 영역 전체
      .appTextPart {
        // 텍스트
        .appTexts {
          .appTexts-spans {
            margin-bottom: 10px;
            .jimggun-span {
              font-size: 32px;
              color: $white;
              margin-right: 5px;
            }
            .appdownload-span {
              font-size: 32px;
              font-weight: 700;
              color: $white;
            }
          }
          p {
            font-size: $text-font-S;
            color: $white;
            line-height: 17px;
            &:last-child {
              margin-bottom: 20px;
            }
          }
        }
        // 다운로드 버튼들
        .downloadBtns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          // 안드로이드
          .androidBtn {
            background-color: $white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;
            padding: 15px 30px;
            border-radius: 6px;
            width: 100%;
            max-width: 300px;
            cursor: pointer;
            .androidBtnImg {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                margin-right: 5px;
              }
            }
            .androidBtnText {
              display: flex;
              justify-content: space-between;
              .playstoreKOR {
                color: $primary-color;
                font-weight: 700;
              }
              .playstoreAdd {
                display: none;
              }
            }
          }
          // IOS
          .appstoreBtn {
            background-color: $white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 50px;
            padding: 15px 30px;
            border-radius: 6px;
            width: 100%;
            max-width: 300px;
            cursor: pointer;
            .appstoreBtnImg {
              display: flex;
              align-items: center;
              img {
                width: 23px;
                margin-right: 7px;
              }
            }
            .appstoreBtnText {
              display: flex;
              justify-content: space-between;
              span {
                color: $primary-color;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
    // 파트 3 - 두번째 박스
    .part3-box2 {
      background: url("/public/images/hong/part3-bg2.png") center center / cover no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 45%;
      height: 407px;
      h3 {
        font-size: $title-font-XS;
        font-weight: 700;
        margin-bottom: 9px;
      }
      p {
        font-size: $text-font-S;
        line-height: 17px;
        color: $font-gray;
      }
      .couponImg {
        margin-top: 18px;
        width: 100%;
        max-width: 300px;
        cursor: pointer;
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
@media screen and (max-width: 1500px) {
}
@media screen and (max-width: 1250px) {
  .box-text h3 {
    font-size: $text-font-L !important;
  }
  .box-text p {
    font-size: $text-font-XS !important;
  }
}
@media screen and (max-width: 1115px) {
  .box-text h3 {
    font-size: $text-font-M !important;
  }
  .box-text p {
    font-size: $text-font-XS !important;
  }
}
@media screen and (max-width: 1011px) {
  .box1-text p {
    margin-bottom: 12px !important;
  }
  .box3-text p {
    margin-bottom: 12px !important;
  }
}
@media screen and (max-width: 990px) {
  .box-text h3 {
    font-size: $text-font-S !important;
  }
  .box-text p {
    font-size: $text-font-XS !important;
  }
}
@media screen and (max-width: 937px) {
  .playstoreKOR {
    display: none !important;
  }
  .playstoreAdd {
    color: $primary-color !important;
    font-weight: 700 !important;
    display: block !important;
  }
}
@media screen and (max-width: 881px) {
}
@media screen and (max-width: 871px) {
  .a1-part3 {
    display: flex !important;
    flex-direction: column !important;
  }
  .part3-box1 {
    width: 100% !important;
  }
  .part3-box2 {
    width: 100% !important;
  }
}
@media screen and (max-width: 801px) {
  .box1-text h3 {
    margin-bottom: 22px !important;
  }
  .box2-text h3 {
    margin-bottom: 22px !important;
  }
}
@media screen and (max-width: 784px) {
  .box2-text h3 {
    margin-bottom: 8px !important;
  }
}
@media screen and (max-width: 768px) {
  // 파트1 영역
  .a1-part1 {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    gap: 15px;
    margin: 0 !important;
    padding: 70px 20px !important;
  }
  .a1-part2{
    padding-top: 80px !important;
    padding-bottom: 80px !important;
  }
  .a1-part3{
    margin-top: 80px !important;
    margin-bottom: 80px !important;
  }
  .a1-part1-title h3 {
    text-align: center !important;
  }
  .a1-part1-title p {
    text-align: center !important;
  }
  .a1-part1-boxes {
    width: 100% !important;
  }
  .box1-text h3 {
    margin-bottom: 8px !important;
  }
  .box1-text p {
    margin-bottom: unset !important;
  }
  .box3-text p {
    margin-bottom: unset !important;
  }
  // 예약미니 바
  .reservationMini {
    display: none !important;
  }
}
@media screen and (max-width: 751px) {
  .box1-text p {
    margin-bottom: 12px !important;
  }
  .box3-text p {
    margin-bottom: 12px !important;
  }
}
@media screen and (max-width: 634px) {
  .a1-part1-boxes {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }
  .a1-part1-title p {
    display: none !important;
  }
  .part1-box {
    display: flex !important;
    flex-direction: row !important;
    width: 100% !important;
    min-width: 165px !important;
    max-width: unset !important;
    gap: 10px !important;
  }
  .part1-img {
    flex: 1 !important;
  }
  .part1-img img {
    display: block !important;
    width: 100% !important;
  }
  .box-text {
    flex: 2 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: flex-start !important;
    padding: 10px !important;
  }
  .box-text h3 {
    font-size: 18px !important;
  }
  .box-text p {
    font-size: 16px !important;
    margin-bottom: 0 !important;
  }
}
@media screen and (max-width: 550px) {
  // 파트 3 영역
  .part3-box1 {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
    gap: 0 !important;
  }
  .phoneImg img {
    display: none !important;
  }
  .part3-box2 {
    width: 100%;
  }
}
@media screen and (max-width: 475px) {
  .a1-part1{
    padding: 55px 20px 70px 20px !important;
  }
  .box-text h3 {
    font-size: 14px !important;
  }
  .box-text p {
    font-size: 12px !important;
  }
}
@media screen and (max-width: 390px) {
  .box-text p {
    font-size: 12px !important;
  }
}
</style>
