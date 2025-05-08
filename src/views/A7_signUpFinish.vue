<script setup></script>
<template>
  <div class="wrap">
    <h1>회원가입이 완료되었습니다</h1>
    <img src="/images/kang/congratulation.png" alt="회원가입 축하" />
  </div>
  <div class="textBox">
    <p class="topText">회원가입을 축하합니다!</p>
    <p class="btText">
      짐꾼의 다양한 혜택과 서비스를 이용하실 수 있어요!
      <br /><span class="colorText">더 새롭고, 더 즐거운 여행이</span> 시작됩니다.
    </p>
  </div>
  <router-link to="login" class="toMain">
    <button class="mainBtn">로그인 페이지로</button>
  </router-link>
</template>
<style lang="scss" scoped>
@import '/src/assets/variables';
.wrap {
  max-width: 510px;
  margin: auto;
  padding-top: 100px;
}
h1 {
  font-size: 32px;
  font-weight: bold;
  color: $font-primary;
  text-align: center;
}
img {
  margin: auto;
  display: flex;
  margin-top: 27px;
  margin-bottom: 27px;
}
.textBox {
  text-align: center;
  margin-bottom: 42px;
}
.topText {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
}
.btText {
  font-size: 16px;
  line-height: 19px;
}
.colorText {
  color: $primary-color;
}
.toMain {
  text-decoration: none;
}
.mainBtn {
  margin: auto;
  display: flex;
  width: 130px;
  height: 40px;
  text-decoration: none;
  border: 1px solid $primary-color;
  border-radius: 10px;
  background-color: #fff;
  color: $primary-color;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  cursor: pointer;
}
@media screen and (max-width: 390px) {
  h1 {
    font-size: 28px;
  }
}
</style>
