<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import StarRating from "@/components/StarRating.vue";

// 플로팅버튼들 관련 전체
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

onMounted(() => {
  smoothlyBtn.value?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

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

const userName = ref("");
const REVIEW_KEY = "userReviews"; // 로컬스토리지 키
const reviewCount = ref(0); // 작성 후기 수
const myReviews = ref([]);

onMounted(() => {
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  userName.value = savedUser.name || "사용자";
  const savedReviews = JSON.parse(localStorage.getItem(REVIEW_KEY) || "[]");
  reviewCount.value = savedReviews.length;

  const saved = JSON.parse(localStorage.getItem(REVIEW_KEY) || "[]");
  myReviews.value = saved.map((review) => ({
    ...review,
    rating: Number(review.rating),
  }));

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

  <!-- 페이지 전체 -->
  <div class="mypage-wrap">
    <!-- 마이페이지 콘텐츠 all -->
    <div class="mypage-all">
      <!-- 첫번째 영역 -->
      <div class="my-intro">
        <!-- 첫번째 영역 타이틀 -->
        <div class="intro-name">
          <h1>{{ userName }}</h1>
          <h2>님</h2>
          <!-- <h3>의 여행을 가볍게!</h3> -->
          <h4>정보수정</h4>
        </div>
        <!-- 첫번째 영역 박스들 -->
        <div class="intro-current">
          <!-- 첫번째 영역 박스 1 -->
          <div class="current-ing">
            <div class="ing-text">
              <span>진행중인 예약</span>
              <div class="ing-text-p">
                <p class="ing-number">2</p>
                <p>건</p>
              </div>
            </div>
            <div class="ing-img img1">
              <img src="/images/hong/mypage-reservation-icon.png" alt="진행중인 예약" />
            </div>
          </div>
          <!-- 첫번째 영역 박스 2 -->
          <div class="current-ing">
            <div class="ing-text">
              <span>배송 진행중</span>
              <div class="ing-text-p">
                <p class="ing-number">1</p>
                <p>건</p>
              </div>
            </div>
            <div class="ing-img img2">
              <img src="/images/hong/mypage-delivery-icon.png" alt="배송 진행중" />
            </div>
          </div>
          <!-- 첫번째 영역 박스 3 -->
          <div class="current-ing">
            <div class="ing-text">
              <span>보유 쿠폰</span>
              <div class="ing-text-p">
                <p class="ing-number">2</p>
                <p>장</p>
              </div>
            </div>
            <div class="ing-img img3">
              <img src="/images/hong/mypage-coupon-icon.png" alt="보유 쿠폰" />
            </div>
          </div>
          <!-- 첫번째 영역 박스 4 -->
          <div class="current-ing">
            <div class="ing-text">
              <span>작성 후기</span>
              <div class="ing-text-p">
                <p class="ing-number">{{ reviewCount }}</p>
                <p>건</p>
              </div>
            </div>
            <div class="ing-img img4">
              <img src="/images/hong/mypage-review-icon.png" alt="작성 후기" />
            </div>
          </div>
        </div>
      </div>

      <!-- 두번째 영역 -->
      <div class="my-second">
        <!-- 두번째 영역 타이틀 -->
        <div class="second-title">
          <h3>최근 이용 내역</h3>
          <p>전체보기</p>
        </div>
        <!-- 두번째 영역 박스들 -->
        <div class="second-boxes">
          <!-- 박스 1 -->
          <div class="sec-box sec-box1">
            <div class="sec-box1-texts">
              <div class="sec-box1-texts-p">
                <p>집 앞</p>
                <p class="sec-arrow">→</p>
                <p>숙소</p>
              </div>
              <span>2025.01.08 - 2025.01.09</span>
            </div>
            <div class="sec-box1-status status1">
              <p>배송 중</p>
            </div>
          </div>
          <!-- 박스 1-1 -->
          <div class="sec-box sec-box1">
            <div class="sec-box1-texts">
              <div class="sec-box1-texts-p">
                <p>집 앞</p>
                <p class="sec-arrow">→</p>
                <p>숙소</p>
              </div>
              <span>2025.01.09 - 2025.01.10</span>
            </div>
            <div class="sec-box1-status status1">
              <p>배송 중</p>
            </div>
          </div>
          <!-- 박스 2 -->
          <div class="sec-box sec-box2">
            <div class="sec-box1-texts">
              <div class="sec-box1-texts-p">
                <p>숙소</p>
                <p class="sec-arrow">→</p>
                <p>집 앞</p>
              </div>
              <span>2025.01.22 - 2025.01.23</span>
            </div>
            <div class="sec-box1-status status2">
              <p>인수 대기</p>
            </div>
          </div>
          <!-- 박스 3 -->
          <div class="sec-box sec-box3">
            <div class="sec-box1-texts">
              <div class="sec-box1-texts-p">
                <p>서울역</p>
                <p class="sec-arrow">→</p>
                <p>대구 공항</p>
              </div>
              <span>2025.01.25 - 2025.01.26</span>
            </div>
            <div class="status-box">
              <div class="sec-box1-status status3-1">
                <p><router-link to="/reviewPost"> 리뷰 쓰기</router-link></p>
              </div>
              <div class="sec-box1-status status3-2">
                <p>배송 완료</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 세번째 영역 + 네번째 영역 -->
      <div class="my-third-forth">
        <!-- 세번째 영역 -->
        <div class="my-third">
          <!-- 세번째 영역 타이틀 -->
          <div class="third-title">
            <h3>내가 작성한 후기</h3>
            <p>전체보기</p>
          </div>

          <!-- 후기 없을 때 -->
          <img v-if="myReviews.length === 0" src="/images/hong/mypage-review-empty-icon.png" alt="내가 작성한 후기" />

          <!-- 후기 있을 때 -->
          <ul v-else class="my-review-list">
            <router-link v-for="(review, index) in myReviews.slice(0, 2)" :key="index" :to="{ path: '/review' }" class="review-item-link">
              <li>
                <div>{{ review.title }}</div>
                <StarRating :rating="review.rating" class="review-rating" />
              </li>
            </router-link>
          </ul>
        </div>

        <!-- 네번째 영역 -->
        <div class="my-forth">
          <!-- 네번째 영역 타이틀 -->
          <div class="forth-title">
            <h3>나의 쿠폰함</h3>
            <p>전체보기</p>
          </div>
          <!-- 네번째 영역 박스들 -->
          <div class="forth-boxes">
            <!-- 네번째 박스 1 -->
            <div class="forth-box">
              <!-- 네번째 박스 왼쪽 텍스트 -->
              <div class="forth-box-texts">
                <div class="forth-box-texts-price">
                  <p>2,000</p>
                  <span>원 할인</span>
                </div>
                <p>2025.03.31까지</p>
              </div>
              <!-- 네번째 박스 오른쪽 버튼 -->
              <div class="forth-box-button">
                <p>사용하기</p>
              </div>
            </div>
            <!-- 네번째 박스 2 -->
            <div class="forth-box">
              <!-- 네번째 박스 왼쪽 텍스트 -->
              <div class="forth-box-texts">
                <div class="forth-box-texts-price">
                  <p>5,000</p>
                  <span>원 할인</span>
                </div>
                <p>2025.03.29까지</p>
              </div>
              <!-- 네번째 박스 오른쪽 버튼 -->
              <div class="forth-box-button">
                <p>사용하기</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/assets/variables";
// GoTop 버튼
.topBtnWrap {
  position: fixed;
  right: 100px;
  bottom: 60px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: transform 0.3s ease-in-out;

  &.footer-visible {
    transform: translateY(-250px);
  }

  .topBtn {
    color: #ff6f00;
    font-size: 40px;
    text-decoration: none;
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
    }
  }

  @media screen and (max-width: 768px) {
    display: none !important;
  }
}

// 페이지 전체
.mypage-wrap {
  background-color: $sub-color;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }
  //   내용 전체
  .mypage-all {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 100px 0;
    //   첫번째 영역
    .my-intro {
      padding: 70px 40px 50px;
      background-color: $white;
      width: 100%;
      max-width: 980px;
      border-radius: 10px;
      box-shadow: $reservation-boxShadow;
      // 첫번째 영역 타이틀
      .intro-name {
        margin-bottom: 50px;
        display: flex;
        // gap: 5px;
        align-items: center;
        justify-content: flex-start;
        h1 {
          font-size: $title-font-L;
          font-weight: 700;
          margin-right: 5px;
        }
        h2 {
          font-size: $title-font-L;
          font-weight: 500;
          margin-right: 9px;
        }
        // h3 {
        //   font-size: $text-font-XL;
        //   color: $white;
        //   background-color: $primary-color;
        //   border-radius: 50px;
        //   text-align: center;
        //   line-height: 30px;
        //   padding: 3px 9px;
        // }
        h4 {
          font-size: $text-font-S;
          margin-left: auto;
          text-decoration: underline;
          color: $font-light-gray;
          cursor: pointer;
        }
      }
      // 첫번째 영역 박스들
      .intro-current {
        // display: flex;
        // justify-content: space-between;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
        // 첫번째 영역 박스
        .current-ing {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border: 1px solid $bg-primary;
          border-radius: 10px;
          box-shadow: 2px 4px 10px rgba(17, 17, 17, 0.02);
          padding: 25px 30px;
          gap: 20px;
          cursor: pointer;
          .ing-text {
            display: flex;
            flex-direction: column;
            gap: 4px;
            span {
              font-size: $text-font-M;
              color: $font-gray;
            }
            .ing-text-p {
              display: flex;
              align-items: center;
              gap: 2px;
              .ing-number {
                font-size: $title-font-S;
                font-weight: 700;
                color: $primary-color;
              }
              p {
                font-size: $text-font-XL;
                font-weight: 700;
              }
            }
          }
          // 박스 1 아이콘
          .ing-img {
            width: 30px;
            img {
              width: 100%;
            }
          }
          // 박스 2 아이콘
          .img2 {
            width: 50px;
            img {
              width: 100%;
            }
          }
          // 박스 3 아이콘
          .img3 {
            width: 40px;
            img {
              width: 100%;
            }
          }
          // 박스 4 아이콘
          .img4 {
            width: 35px;
            img {
              width: 100%;
            }
          }
        }
      }
    }

    //   두번째 영역
    .my-second {
      padding: 40px;
      background-color: $white;
      width: 100%;
      max-width: 980px;
      border-radius: 10px;
      box-shadow: $reservation-boxShadow;
      // 두번째 영역 타이틀
      .second-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 25px;
        h3 {
          font-size: $text-font-L;
          font-weight: 700;
        }
        p {
          font-size: $text-font-S;
          color: $font-light-gray;
          text-decoration: underline;
          cursor: pointer;
        }
      }
      // 두번째 영역 박스들
      .second-boxes {
        display: flex;
        flex-direction: column;
        gap: 20px;
        // 박스 1
        .sec-box {
          // border: 1px solid $input-select;
          // border-radius: 10px;
          padding: 20px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .sec-box1-texts {
            display: flex;
            flex-direction: column;
            gap: 9px;
            .sec-box1-texts-p {
              display: flex;
              gap: 10px;
              p {
                font-weight: 500;
              }
              .sec-arrow {
              }
            }
            span {
              font-size: $text-font-XS;
              color: $font-light-gray;
            }
          }
          .sec-box1-status {
            p {
            }
          }
          .status1 {
            padding: 5px 12px;
            // color: #7be879;
            color: #5fc95e;
            background-color: #f5fee8;
            border-radius: 50px;
          }
          .status2 {
            padding: 5px 12px;
            // color: #ffa945;
            color: #ff8800;
            background-color: #fef8e8;
            border-radius: 50px;
          }
          .status-box {
            display: flex;
            gap: 10px;
            .status3-1 {
              padding: 5px 12px;
              background-color: #fff3fa;
              border-radius: 50px;
              a {
                color: #fe688c;
              }
            }
            .status3-2 {
              padding: 5px 12px;
              color: #45a6ff;
              background-color: #e8f9fe;
              border-radius: 50px;
            }
          }
        }
        .sec-box1 {
          border: 1px solid #78e976;
          border-radius: 10px;
        }
        .sec-box2 {
          border: 1px solid #ffa945;
          border-radius: 10px;
        }
        .sec-box3 {
          border: 1px solid #45a6ff;
          border-radius: 10px;
        }
      }
    }

    // 세번째 + 네번째 영역
    .my-third-forth {
      display: flex;
      gap: 20px;
      // 세번째 영역
      .my-third {
        background-color: $white;
        width: 100%;
        // max-width: 480px;
        border-radius: 10px;
        box-shadow: $reservation-boxShadow;
        padding: 40px;
        position: relative;
        // 세번째 영역 타이틀
        .third-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          h3 {
            font-size: $text-font-L;
            font-weight: 700;
          }
          p {
            font-size: $text-font-S;
            color: $font-light-gray;
            text-decoration: underline;
            cursor: pointer;
          }
        }

        img {
          display: block;
          position: absolute;
          top: 55%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 38.26px;
          width: 50px;
        }
        // 내가 쓴 리뷰 제목
        .my-review-list {
          list-style: none;
          padding: 0;
          margin-top: 10px;
          cursor: pointer;

          li {
            border: 1px solid $input-select;
            border-radius: 10px;
            padding: 32px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            color: $font-primary;
          }
        }
      }
      // 네번째 영역
      .my-forth {
        background-color: $white;
        width: 100%;
        // max-width: 480px;
        border-radius: 10px;
        box-shadow: $reservation-boxShadow;
        padding: 40px;
        // padding: 20px 15px 15px;
        // 네번째 영역 타이틀
        .forth-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          h3 {
            font-size: $text-font-L;
            font-weight: 700;
          }
          p {
            font-size: $text-font-S;
            color: $font-light-gray;
            text-decoration: underline;
            cursor: pointer;
          }
        }
        //   네번째 영역 박스들
        .forth-boxes {
          display: flex;
          flex-direction: column;
          gap: 15px;
          // 박스 1
          .forth-box {
            border: 1px solid $input-select;
            border-radius: 10px;
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // 왼쪽 텍스트
            .forth-box-texts {
              display: flex;
              flex-direction: column;
              gap: 8px;
              .forth-box-texts-price {
                display: flex;
                p {
                  font-size: $text-font-L;
                  font-weight: 700;
                  color: $font-primary;
                  line-height: 20px;
                }
                span {
                  font-size: $text-font-M;
                  font-weight: 700;
                  line-height: 20px;
                }
              }
              p {
                font-size: $text-font-XS;
                color: $font-light-gray;
              }
            }
            // 오른쪽 버튼
            .forth-box-button {
              cursor: pointer;
              p {
                font-size: $text-font-S;
                color: $white;
                border-radius: 8px;
                padding: 7px 14px;
                background-color: $font-primary;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .intro-current {
    // width: 100%;
    // display: flex;
    // flex-wrap: wrap;
    // grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: repeat(2, 200px);
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
  .current-ing {
    // width: calc(100% / 2);
    // max-width: 200px;
  }
  .my-third-forth {
    display: flex;
    flex-direction: column;
  }
  .my-third {
    height: 302px;
  }
}
@media screen and (max-width: 768px) {
  // gotop 버튼
  .topBtnWrap {
    display: none !important;
  }
}
@media screen and (max-width: 413px) {
  .intro-current {
    grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
  }
  .status-box {
    display: block;
  }
}
</style>
