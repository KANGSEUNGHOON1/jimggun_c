<script setup>
import { computed, ref, watchEffect, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import StarRating from '@/components/StarRating.vue';

const STORAGE_KEY = 'userReviews';
const reviews = ref([]);

onMounted(() => {
  const savedReviews = localStorage.getItem(STORAGE_KEY);
  if (savedReviews) {
    reviews.value = JSON.parse(savedReviews);
  }
});

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

// 더미 데이터 (변경되지 않는 초기 데이터)
const dummyReviews = [
  {
    name: '홍길동',
    rating: 5,
    images: ['/images/kang/1-1.jpg', '/images/kang/1-2.jpg', '/images/kang/1-3.jpg'],
    title: '뚜벅이 여행객들에게 강추!',
    content:
      '처음 이용해봤는데 너무 좋았습니다.\n매번 짐 때문에 고생했는데, 짐 걱정이 없으니까 여행의 질이 너무 좋아졌어요.\n안내도 너무 친절하게 잘해주셔서 좋았어요.\n처음부터 끝까지 친절하고 자세하게 알려주십니다.\n뚜벅이 여행객들에게 강추합니다!',
  },
  {
    name: '김길동',
    rating: 4,
    images: ['/images/kang/2-1.jpg', '/images/kang/2-2.jpg', '/images/kang/2-3.jpg'],
    title: '공항부터 호텔까지 가벼운 마음으로 여행 시작!',
    content:
      '유모차에 아이들 짐까지 들고 이동하는 게 늘 힘들었는데,\n이번에 짐 운반 서비스를 이용하면서 여행의 질이 확 달라졌어요.\n아이 손 잡고 여유롭게 이동하니 정말 좋았습니다.\n다음 여행도 무조건 이용할 거예요.',
  },
  {
    name: '이길동',
    rating: 5,
    images: ['/images/kang/3-1.png', '/images/kang/3-2.png', '/images/kang/3-3.png'],
    title: '아이들과 함께한 가족 여행의 필수템',
    content:
      '호텔 체크아웃 후 밤 비행기까지 시간이 남았는데,\n짐 때문에 카페도 마음 놓고 못 갔던 경험이 있어서 이번엔 운반 서비스를 신청했어요.\n덕분에 하루 종일 가볍게 돌아다닐 수 있었고,\n공항에서 짐을 바로 받아 너무 만족스러웠습니다.',
  },
  {
    name: '박길동',
    rating: 4,
    images: ['/images/kang/4-1.jpg', '/images/kang/4-2.jpg'],
    title: '시간과 체력을 아껴주는 최고의 선택',
    content:
      '비행기에서 내린 뒤 무거운 캐리어를 들고 다닐 생각에 걱정이 많았는데,\n짐 운반 서비스를 이용하니 정말 편했어요.\n바로 관광지로 직행할 수 있어서 하루를 알차게 썼습니다.\n서비스도 친절했고, 호텔 도착하니 짐이 먼저 와 있어서 감동!',
  },
];
// 사진이 무조건 3개가 나오도록 하는 함수
const defaultImg = '/images/kang/default.png'; // 대체 이미지

const getThreeImages = (images) => {
  const filled = [...images];
  while (filled.length < 3) {
    filled.push(defaultImg);
  }
  return filled;
};

//더미데이터 + 로컬스토리지데이터 합치기

const allReviews = computed(() => [...reviews.value].reverse().concat(dummyReviews));
// 이름 마스킹
function maskedName(name) {
  const [user, domain] = name.split('@');
  if (user.length <= 4) {
    return user[0] + '*'.repeat(user.length - 1);
  } else {
    const visible = user.slice(0, 4);
    const masked = '*'.repeat(user.length - 4);
    return visible + masked;
  }
}

// 리뷰 펼침 상태 배열 추가
const expandedStates = ref([]);

// 모든 리뷰 데이터가 준비된 후, 초기 펼침 상태 설정
watchEffect(() => {
  expandedStates.value = allReviews.value.map(() => false);
});

// 특정 인덱스의 토글 상태 변경 함수
const toggleContent = (index) => {
  expandedStates.value[index] = !expandedStates.value[index];
};

//줄바꿈
function formatContent(content) {
  return content.replace(/\n/g, '<br>');
}
// 리뷰 더보기 3개까지
const defaultVisible = 3;
const showAllReviews = ref(false);

const visibleReviews = computed(() =>
  showAllReviews.value ? allReviews.value : allReviews.value.slice(0, defaultVisible)
);
// 리뷰 더보기
const toggleReviews = () => {
  showAllReviews.value = !showAllReviews.value;
};
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

  <div class="A5-wrap">
    <div class="A5-inner">
      <div class="A5-h1-box">
        <h1 class="A5-h1">고객 후기</h1>
      </div>

      <div class="review-box" v-for="(review, index) in visibleReviews" :key="index">
        <div class="writerRating" @click="toggleContent(index)">
          <h2 class="review-writer">{{ maskedName(review.name) }} 님 감사합니다!</h2>
          <StarRating :rating="review.rating" class="review-rating" />
        </div>

        <div class="review-header" @click="toggleContent(index)">
          <h3 class="review-title">
            {{ review.title }}
          </h3>
          <button class="toggle-content-btn" @click.stop="toggleContent(index)">
            {{ expandedStates[index] ? '▲' : '▼' }}
          </button>
        </div>

        <div v-if="expandedStates[index]" class="review-content">
          <p v-html="formatContent(review.content)"></p>
        </div>

        <div class="review-images">
          <img
            v-for="(img, imgIndex) in getThreeImages(review.images)"
            :key="imgIndex"
            :src="img"
            alt="리뷰 이미지"
            class="user-image"
          />
        </div>
      </div>
      <div v-if="allReviews.length > defaultVisible" class="toggle-review-box">
        <button class="review-toggle-btn" @click="toggleReviews">
          {{ showAllReviews ? '접기' : '더 많은 후기 보기' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/variables';
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
  @media screen and (max-width: 768px) {
    // gotop 버튼
    display: none !important;
  }

  &.footer-visible {
    transform: translateY(-250px);
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

.A5-wrap {
  background-color: $sub-color;
  width: 100%;
  font-family: $font-family;
  padding-top: 70px;
}
.A5-inner {
  max-width: 1240px;
  margin: auto;
  text-align: center;
}
// 이용후기
.A5-h1-box {
  width: 100%;
  max-width: 400px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
  // border: 3px solid #f1f1f5;
  margin: auto;
  background-color: $primary-color;
  color: #fff;
}
.A5-h1 {
  // font-size: $title-font-XS;
  font-size: $text-font-L;
  // letter-spacing: 6px;
}

// 리뷰 박스
.review-box {
  width: 84.4%;
  background: #fff;
  margin: 80px auto;
  padding-top: 55px;

  padding-bottom: 95px;
  border-radius: 25px;
  box-shadow: $reservation-boxShadow;
}
//작성자
.review-writer {
  text-align: left;
  padding-left: 90px;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;

  color: $font-primary;
}
//제목
.writerRating {
  display: flex;
  cursor: pointer;
}
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 90px; // 좌우 정렬 위치 조정 (기존 .review-title padding과 맞춤)
  margin-top: 10px;
  cursor: pointer;

  @media screen and (max-width: 440px) {
    padding: 0 40px;
  }
}
.review-title {
  font-size: $text-font-M;
  color: $font-primary;
  line-height: 20px;
}
//별점
.review-rating {
  margin: 0 30px;
}
//내용
.review-content {
  width: 85%;
  display: flex;
  text-align: left;
  padding: 15px 30px;
  font-size: 14px;
  color: $font-primary;
  line-height: 22px;
  position: relative;
  margin: auto;
  margin-top: 10px;
  background-color: $sub-color;
  border-radius: 6px;
}

//내용 보기 버튼

.toggle-content-btn {
  background: none;
  border: none;
  color: $input-select;
  font-size: 20px;
  cursor: pointer;
}
//이미지
.review-images {
  display: flex;
  justify-content: center;
  gap: 70px;
  margin-top: 35px;
}

.user-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
}
// 리뷰 더보기 버튼
.toggle-review-box {
  text-align: center;
  margin-top: 90px;
  padding-bottom: 100px;

  .review-toggle-btn {
    font-size: $text-font-M;
    line-height: 20px;
    padding: 14px 32px;
    color: #fff;
    background-color: $primary-color;
    border: none;
    border-radius: 10px;
    margin: 12px auto;
    font-weight: bold;
    cursor: pointer;
    &:hover {
          background-color: $primary-hover;
          color: $white;
        }
  }
}
//반응형
@media screen and (max-width: 1100px) {
  .review-images img:nth-child(n + 3) {
    display: none;
  }
  .review-images {
    // justify-content: left;
    padding-left: 90px;

    justify-content: center;
    padding-left: 0px;
  }
  .review-content {
    width: 80%;
  }
}
@media screen and (max-width: 900px) {
  .review-images {
    gap: 60px;
    margin-top: 10px;
  }
  .user-image {
    width: 220px;
    height: 220px;
  }
  .review-rating {
    margin: 0 20px;
  }
}
@media screen and (max-width: 768px) {
  // gotop 버튼
  .topBtnWrap {
    display: none !important;
  }
}
@media screen and (max-width: 730px) {
  .review-images img:nth-child(n + 2) {
    display: none;
  }
}
@media screen and (max-width: 440px) {
  .A5-h1-box {
    max-width: 250px;
  }
  .review-box {
    padding-top: 40px;
    padding-bottom: 55px;
  }
  .writerRating {
    display: block;
  }
  .review-writer {
    padding-left: 100px;
  }
  .review-rating {
    // padding-left: 60px;
    margin: 10px 110px;
  }
  .review-title {
    margin: auto;
    font-size: 14px;
  }
  .review-content {
    padding-left: 30px;
    width: 75%;
  }
}
@media screen and (max-width: 390px) {
  .review-box {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .review-writer {
    padding-left: 90px;
  }
  .review-rating {
    // padding-left: 60px;
    margin: 10px 100px;
  }
  .review-title {
    margin: auto;
    font-size: 14px;
  }
  .review-content {
    padding-left: 30px;
    width: 75%;
  }
}
</style>
