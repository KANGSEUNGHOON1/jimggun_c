<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

// 플로팅 버튼들 전체
// 로그인 상태 기반 라우터 설정
const router = useRouter();
const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.getIsLoggedIn);

// gotop 버튼
const smoothlyBtn = ref(null);
const topBtnWrap = ref(null);
const isFooterVisible = ref(false);

// resBtn 버튼 클릭 시 라우팅
function handleGoToReservation() {
  if (isLoggedIn.value) {
    router.push("/reservation");
  } else {
    router.push("/reslogin");
  }
}

// top 버튼 부드럽게
onMounted(() => {
  smoothlyBtn.value?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 푸터요소 관찰
  const footer = document.querySelector("footer");
  if (footer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isFooterVisible.value = entry.isIntersecting;
        });
      },
      {
        threshold: 0.01,
        rootMargin: "-100px 0px 0px 0px",
      }
    );
    observer.observe(footer);
  }
});
</script>

<template>
  <!-- gotop 버튼 -->
  <div class="topBtnWrap" ref="topBtnWrap" :class="{ 'footer-visible': isFooterVisible }">
    <a href="#" class="topBtn" ref="smoothlyBtn">↑</a>
    <div class="resBtn" @click="handleGoToReservation">
      <img src="/images/hong/gotopBtn-logo-w.png" alt="gotopBtn로고" />
      <span>고용하기</span>
    </div>
  </div>

  <section class="charge-wrap">
    <div class="charge-container inner">
      <!-- 요금안내 타이틀 -->
      <h2 class="charge-title"><span>배송 서비스 요금 안내</span></h2>
      <!-- 1. 요금안내 품목 -->
      <ul class="charge-menu">
        <li class="charge-list charge-list1">
          <div class="list-box">
            <div class="icon-box">
              <img src="/images/lee/chargeIcon1.png" alt="케리어아이콘" />
            </div>
            <div class="text-wrap">
              <p class="list-text">
                <span class="lt1">캐리어</span>
                <span class="lt2">기내용, 화물용 등</span>
              </p>
              <h4 class="price">￦ 11,000 ~</h4>
            </div>
          </div>
        </li>
        <li class="charge-list charge-list2">
          <div class="list-box">
            <div class="icon-box">
              <img src="/images/lee/chargeIcon2.png" alt="가방아이콘" />
            </div>
            <div class="text-wrap">
              <p class="list-text">
                <span class="lt1">백팩</span>
                <span class="lt2">소형 및 대형 배낭 등</span>
              </p>
              <h4 class="price">￦ 11,000 ~</h4>
            </div>
          </div>
        </li>
        <li class="charge-list charge-list3">
          <div class="list-box">
            <div class="icon-box">
              <img src="/images/lee/chargeIcon3.png" alt="골프가방아이콘" />
            </div>
            <div class="text-wrap">
              <p class="list-text">
                <span class="lt1">기타</span>
                <span class="lt2">레디백, 골프백 등</span>
              </p>
              <h4 class="price">￦ 6,000 ~</h4>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 2. 사이즈 가격 측정 안내 -->
    <div class="size-wrap">
      <div class="size-container">
        <div class="size-bg"></div>
        <div class="size-info inner">
          <ul class="size-text">
            <li class="s-size size">
              <ul class="sub-info">
                <li class="size"><span>S 사이즈</span></li>
                <li class="size-length"><span>~54cm / ~10kg</span></li>
                <li class="size-price"><span>11,000원</span></li>
              </ul>
            </li>
            <li class="m-size size">
              <ul class="sub-info">
                <li class="size"><span>M 사이즈</span></li>
                <li class="size-length"><span>~65cm / ~20kg</span></li>
                <li class="size-price"><span>16,000원</span></li>
              </ul>
            </li>
            <li class="l-size size">
              <ul class="sub-info">
                <li class="size"><span>L 사이즈</span></li>
                <li class="size-length"><span> 66cm~ / ~30kg</span></li>
                <li class="size-price"><span>21,000원</span></li>
              </ul>
            </li>
            <li class="ex-size size">
              <ul class="sub-info">
                <li class="size"><span>기타</span></li>
                <li class="size-length"><span> 30kg ~</span></li>
                <li class="size-price"><span> 가격 문의</span></li>
              </ul>
            </li>
          </ul>
          <div class="size-img">
            <img src="/images/lee/sizeinfo.png" alt="사이즈예시" />
          </div>
        </div>
      </div>
      <p class="size-text-info inner">
        <span>※최고 길이 또는 최고 무게에 따라 사이즈가 산정됩니다.</span>
        <span>ex) 무게가 18kg & 최고길이가 60cm인 캐리어 = M사이즈</span>
      </p>
    </div>
    <!-- 3. 거리에 따른 추가요금 -->
    <div class="distance-wrap inner">
      <h3 class="distance-title">추가요금 안내</h3>
      <ul class="distance-text">
        <li class="divide divide1">
          <ul class="sub-divide">
            <li><span class="divide-title">구분</span></li>
            <li><span class="divide-title">타권역</span></li>
            <li><span class="divide-title">동일권역</span></li>
          </ul>
        </li>
        <li class="divide">
          <ul class="sub-divide">
            <li><span class="divide-title">S 사이즈</span></li>
            <li><span class="divide-text">+ 0원</span></li>
            <li><span class="divide-text">+ 0원</span></li>
          </ul>
        </li>
        <li class="divide">
          <ul class="sub-divide">
            <li><span class="divide-title">M 사이즈</span></li>
            <li><span class="divide-text">+ 1,000원</span></li>
            <li><span class="divide-text">+ 0원</span></li>
          </ul>
        </li>
        <li class="divide">
          <ul class="sub-divide">
            <li><span class="divide-title">L 사이즈</span></li>
            <li><span class="divide-text">+ 2,000원</span></li>
            <li><span class="divide-text">+ 0원</span></li>
          </ul>
        </li>
      </ul>
      <p class="distance-info">
        <span>※ 타권역 - 동일권역 외 모든 지역 &nbsp</span>
        <span>※ 동일권역 - 출발지로부터 150km 내에 위치</span>
        <!-- <span>타권역 : 동일권역 외 모든 지역</span> -->
        <!-- <span>동일권역 : 출발지로부터 150km 내에 위치</span> -->
      </p>
    </div>
    <!-- 4. 유의 사항 -->
    <div class="charge-careful inner">
      <h2 class="charge-careful-title">유의사항</h2>
      <ul class="charge-careful-box">
        <li class="charge-careful-list">서비스 이용 하루 전날 18:00시까지 취소 및 변경이 가능합니다.(취소시 100% 환불)</li>
        <li class="charge-careful-list">서비스 이용 1일전 18시이후부터는 취소 및 환불이 불가하오니 유의하시기 바랍니다.</li>
        <li class="charge-careful-list">짐꾼의 픽업방식으로 인해 당일 예약은 불가능합니다.</li>
        <li class="charge-careful-list">배송 짐에 아이스박스 포함 시 꼭 문의하시기 바랍니다.</li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";
// gotop 버튼
.topBtnWrap {
  position: fixed;
  right: 100px;
  bottom: 60px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  &.footer-visible {
    transform: translateY(-250px);
  }
  @media screen and (max-width: 768px) {
    // gotop 버튼
    display: none !important;
  }
  .topBtn {
    color: $primary-color;
    font-size: 40px;
    text-decoration: none;
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 50%;
    background-color: $white;
    text-align: center;
    box-shadow: $info-boxShadow;
  }
  .resBtn {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: $primary-color;
    text-align: center;
    box-shadow: $info-boxShadow;
    text-decoration: none;
    padding: 13.5px 0;
    span {
      display: inline-block;
      color: $white;
      font-size: 12px;
      margin-bottom: 2px;
    }
  }
}

// 이너 값
.inner {
  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
  margin: 0 auto;
}
// 전체 레이아웃
.charge-wrap {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   1. 요금 안내 품목
  .charge-container {
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    //   요금안내 타이틀
    .charge-title {
      width: 100%;
      max-width: 400px;
      height: 50px;
      // padding: 12.5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      // color: white;
      background-color: $primary-color;
      // border: 3px solid #f1f1f5;
      margin: 70px 0;
      // 타이틀 글자조절
      span {
        // color: $font-light-gray;
        color: $white;
        font-size: $text-font-L;
        // font-weight: bold;
      }
    }
    //   1. 요금 안내 품목
    .charge-menu {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      // margin-top: 30px;
      margin-bottom: 75px;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      // li
      .charge-list {
        display: flex;
        // gap: 50px;
        align-items: center;
        justify-content: center;
        width: calc(100% / 3);
        max-width: 270px;
        box-shadow: $info-boxShadow;
        border-radius: 10px;
        @media screen and (max-width: 768px) {
          width: 100% !important;
          max-width: 450px;
        }
        .list-box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          margin: 50px 0;
          @media screen and (max-width: 768px) {
            flex-direction: row;
            justify-content: center;
            gap: 50px;
            margin: 20px 0;
          }
          .icon-box {
            width: 70px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              max-width: 66px;
              max-height: 120px;
            }
          }
          .text-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            .list-text {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
              .lt1 {
                font-size: $title-font-XS;
                font-weight: bold;
                color: $font-primary;
                @media screen and (max-width: 768px) {
                  font-size: $text-font-XL;
                }
              }
              .lt2 {
                font-size: $text-font-M;
                color: $font-light-gray;
                @media screen and (max-width: 768px) {
                  font-size: $text-font-S;
                }
              }
            }
          }
          .price {
            font-size: $title-font-XS;
            color: $primary-color;
            font-weight: bold;
            @media screen and (max-width: 768px) {
              font-size: $text-font-XL;
            }
          }
        }
      }
    }
  }
  //   2. 사이즈 가격 측정 안내
  .size-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 100px;

    .size-container {
      width: 100%;
      position: relative;
      .size-bg {
        position: absolute;
        top: 0;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: $sub-color;
        z-index: -1;
        max-width: unset;
      }
      // background-color: $sub-color;
      .size-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $sub-color;
        padding: 80px 40px 60px 40px;
        position: relative;
        @media screen and (max-width: 768px) {
          flex-direction: column;
          gap: 50px;
        }

        .size-text {
          width: 50%;
          display: flex;
          flex-direction: column;
          gap: 40px;
          @media screen and (max-width: 768px) {
            width: 100%;
          }
          .size {
            .sub-info {
              width: 100%;
              display: flex;
              align-items: center;
              li {
                width: calc(100% / 3);
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .size {
                span {
                  font-size: $title-font-S;
                  font-weight: 600;
                  color: $font-gray;
                  @media screen and (max-width: 768px) {
                    font-size: $text-font-XL !important;
                  }
                  @media screen and (max-width: 430px) {
                    font-size: $text-font-L !important;
                  }
                }
              }
              .size-length {
                span {
                  font-size: $text-font-M;
                  font-weight: 500;
                  color: $font-light-gray;
                  @media screen and (max-width: 768px) {
                    font-size: $text-font-S !important;
                  }
                  @media screen and (max-width: 430px) {
                    font-size: $text-font-XS !important;
                  }
                }
              }
              .size-price {
                span {
                  font-size: $title-font-S;
                  font-weight: bold;
                  color: $primary-color;
                  @media screen and (max-width: 768px) {
                    font-size: $text-font-XL !important;
                  }
                  @media screen and (max-width: 430px) {
                    font-size: $text-font-L !important;
                  }
                }
              }
            }
          }
        }
        .size-img {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right: 50px;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
      // 2-1. size info text
    }
    .size-text-info {
      display: flex;
      width: 100%;
      // max-width: 960px;
      // padding-left: 50px;
      padding: 0 50px;
      // margin: 0;
      flex-direction: row-reverse;
      gap: 10px;
      @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      span {
        font-size: $text-font-S;
        color: $font-light-gray;
        text-align: left;
        font-weight: 300;
        @media screen and (max-width: 768px) {
          font-size: $text-font-XS;
        }
      }
    }
  }
  // 3. 거리에 따른 추가요금
  .distance-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
    padding: 0 50px;
    .distance-title {
      font-size: $title-font-M;
      font-weight: bold;
      min-width: 240px;
      margin-bottom: 80px;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: $title-font-S;
      }
    }
    .distance-text {
      width: 100%;
      // max-width: 1000px;
      display: flex;
      flex-direction: column;
      gap: 40px;
      padding-bottom: 60px;
      border-bottom: 1px solid rgba(118, 118, 118, 0.2);
      .divide1 {
        margin-bottom: 10px;

        padding-bottom: 30px;
        border-bottom: 1px solid rgba(118, 118, 118, 0.2);
      }
      .divide {
        width: 100%;
        // flex-direction: column;
        .sub-divide {
          width: 100%;
          display: flex;

          li {
            width: calc(100% / 3);
            display: flex;
            align-items: center;
            justify-content: center;
            .divide-title {
              color: $font-primary;
              font-size: $title-font-XS;
              font-weight: bold;
              @media screen and (max-width: 768px) {
                font-size: $text-font-XL;
              }
              @media screen and (max-width: 390px) {
                font-size: $text-font-L;
              }
            }
            .divide-text {
              color: $font-gray;
              font-size: $text-font-L;
              @media screen and (max-width: 768px) {
                font-size: $text-font-M;
              }
              @media screen and (max-width: 390px) {
                font-size: $text-font-S;
              }
            }
          }
        }
      }
    }
    .distance-info {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      margin-top: 20px;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 5px;
      }
      span {
        font-size: $text-font-S;
        color: $font-light-gray;
        text-align: left;
        font-weight: 300;
        @media screen and (max-width: 768px) {
          font-size: $text-font-XS;
        }
      }
    }
  }
  // 4. 유의사항
  .charge-careful {
    width: 100%;
    max-width: 960px;
    margin-top: 10px;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    .charge-careful-title {
      font-size: $title-font-XL;
      font-weight: bold;
      @media screen and (max-width: 768px) {
        font-size: $title-font-L;
      }
      @media screen and (max-width: 390px) {
        font-size: $title-font-M !important;
      }
    }
    .charge-careful-box {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .charge-careful-list {
        width: 100%;
        list-style: disc;
        font-size: $text-font-L;
        font-weight: 300;
        color: $font-primary;
        text-align: left;
        @media screen and (max-width: 768px) {
          font-size: $text-font-M;
        }
        @media screen and (max-width: 500px) {
          font-size: $text-font-S;
        }
        @media screen and (max-width: 390px) {
          font-size: $text-font-XS;
        }
      }
    }
  }
} // 전체 레이아웃 닫힘 영역
@media screen and (max-width: 900px) {
  .size-img img {
    width: 225px !important;
    height: 180px !important;
  }
  .sub-info .size span {
    font-size: $title-font-XS !important;
  }
  .sub-info .size-length span {
    font-size: $text-font-S !important;
  }
  .sub-info .size-price span {
    font-size: $title-font-XS !important;
  }
}
</style>
