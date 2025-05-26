<template>
  <!-- 바깥 배경색 -->
  <div class="bg-white md:bg-[#FDF3E7] min-h-screen flex flex-col">
    <!-- 중앙 박스: max-width 768px -->
    <div class="w-full max-w-[768px] mx-auto h-screen bg-white flex flex-col items-center justify-center">
      <!-- 로그인 박스: 내부 폭 510px -->
      <div class="w-full max-w-[510px] text-center font-sans">
        <!-- 로고 -->
        <div class="mb-6">
          <img src="/images/jimggun_logo.png" alt="로고" class="w-[126px] mx-auto" />
        </div>

        <!-- 로그인 인풋 -->
        <form class="flex flex-col items-center w-full space-y-3 mt-[50px]">
          <input type="text" placeholder="아이디" v-model="formData.userId" autocomplete="username" class="w-[88%] h-[60px] border border-[#e5e5ec] rounded-[10px] text-sm text-gray-400 px-[23px] py-[21px]" />
          <div class="relative w-full">
            <input :type="showPassword ? 'text' : 'password'" placeholder="비밀번호" v-model="formData.password" autocomplete="current-password" class="w-[88%] h-[60px] border border-[#e5e5ec] rounded-[10px] text-sm text-gray-400 px-[23px] py-[21px]" />
            <button @click="togglePassword" type="button" class="absolute right-[55px] top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>
        </form>

        <!-- 로그인 버튼 -->
        <button class="w-[88%] h-[60px] bg-[#FF6F00] text-white text-lg font-bold mt-[60px] rounded-[10px] hover:bg-[#e65f00] transition-colors" @click="handleLogin">로그인</button>

        <!-- 텍스트 링크 -->
        <div class="flex justify-center items-center text-sm text-gray-400 gap-2 mt-[30px]">
          <p class="pr-2 border-r border-[#e5e5ec]">회원번호 찾기</p>
          <p class="pr-2">비밀번호 찾기</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const formData = ref({
  userId: "",
  password: "",
});

const router = useRouter();

const handleLogin = () => {
  // 로그인 성공했다고 가정하고 출근 여부 검사
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const lastCheckedDate = localStorage.getItem("worker-checked-date");

  if (lastCheckedDate === todayKey) {
    router.push("/worker/worker-home"); // 이미 출근한 경우
  } else {
    router.push("/worker/worker-main"); // 오늘 첫 출근이면 출근 페이지 보여줌
  }
};

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
