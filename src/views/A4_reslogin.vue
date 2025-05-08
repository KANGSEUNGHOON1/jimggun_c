<script setup>
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const authStore = useAuthStore();
const router = useRouter();

//추가
const emit = defineEmits(['next', 'prev']);
defineProps({ resevationData: Object });
const agree = ref(false);
const prevStep = () => emit('prev');
const confirmPayment = () => emit('next', { paymentComfirmed: true });
//추가 끝
const formData = ref({
  userId: '',
  password: '',
});

const handleLogin = () => {
  const savedData = JSON.parse(localStorage.getItem('userDatas') || '[]');

  const userData = Array.isArray(savedData)
    ? savedData.find((u) => u.userId === formData.value.userId && u.password === formData.value.password)
    : null;

  if (userData) {
    authStore.login({
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      userId: userData.userId,
      password: userData.password,
    });
    router.push('/reservation');
  } else {
    alert('아이디 또는 비밀번호가 일치하지 않습니다.');
  }
};
</script>

<template>
  <div class="a7-wrap">
    <div class="logoContainer">
      <img src="/images/jimggun_logo.png" alt="로고" class="logo" />
    </div>
    <form>
      <div class="loginInputContainer">
        <input type="text" placeholder="아이디" class="loginInput" v-model="formData.userId" autocomplete="username" />
        <input
          type="password"
          placeholder="비밀번호"
          class="loginInput"
          v-model="formData.password"
          autocomplete="current-password"
        />
      </div>
    </form>

    <button class="loginBtn" @click="handleLogin">로그인</button>
    <router-link to="/reservation" class="routerBtn routerBtn4">
      <button class="loginBtn nonAccount" id="nonAccount">비회원으로 예약하기</button>
    </router-link>
    <div class="textContainer">
      <p>아이디 찾기</p>
      <p>비밀번호 찾기</p>
      <div class="routerContainer">
        <router-link to="/signUp" class="goSignUp">회원가입</router-link>
      </div>
    </div>

    <div class="snsLoginContainer">
      <div class="snsIconBox">
        <div class="snsIcon naver">
          <img src="/images/kang/naver.png" alt="네이버" />
        </div>
        <div class="snsIcon kakao">
          <img src="/images/kang/kakao.png" alt="카카오" />
        </div>
        <div class="snsIcon google">
          <img src="/images/kang/google.png" alt="구글" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/src/assets/variables';

.a7-wrap {
  max-width: 510px;
  margin: auto;
  padding-top: 100px;
  flex-direction: column;
  text-align: center;
  font-family: $font-family;
}
a {
  text-decoration: none;
  color: $font-primary;
}
//로고
.logo {
  width: 126px;
}
//인풋
.loginInputContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 50px;
}
.loginInput {
  width: 88%;
  height: 60px;
  border: 1px solid $input-select;
  border-radius: 10px;
  font-size: 14px;
  color: $font-light-gray;
  padding: 21px 23px;
}
//로그인 버튼
.loginBtn {
  width: 88%;
  height: 60px;
  background-color: $primary-color;
  color: $white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 60px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.loginBtn:hover {
  background-color: $primary-hover;
}
//아이디 찾기 비밀번호 찾기 회원가입
.textContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  margin-top: 30px;
  color: $font-light-gray;
}
.textContainer p {
  border-right: 1px solid $font-light-gray;
  padding-right: 10px;
}
.goSignUp {
  color: $font-light-gray;
}
//간편 로그인
.snsLoginContainer {
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.snsIconBox {
  display: flex;

  gap: 50px;
}
.snsIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  cursor: pointer;
}

.naver {
  background: $naver-color;
}
.kakao {
  background: $kakao-color;
}
.google {
  background-color: $bg-light;
}
// 비회원 예약하기 추가
.nonAccount {
  background-color: #d5d5dc;
  color: $font-light-gray;
  font-weight: 500;
  &:hover {
    background-color: #c5c5d0;
  }
}
#nonAccount {
  margin-top: 10px;
}
@media screen and (max-width: 768px) {
  // gotop 버튼
  .topBtnWrap {
    display: none !important;
  }
}
</style>
