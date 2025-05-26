<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
    <div class="bg-white px-8 py-10 rounded-lg shadow-md w-full max-w-md">
      <div class="text-center text-2xl font-bold text-gray-800 mb-8">
        <img src="/images/hong/jimggun_gray.png" alt="로고" class="w-[126px] mx-auto" />
      </div>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">회원번호</label>
          <input type="text" id="email" placeholder="회원번호를 입력하세요" class="w-full px-3 py-2 border border-[#e5e5ec] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-500" required />
        </div>

        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
          <div class="relative">
            <input id="password" :type="showPassword ? 'text' : 'password'" placeholder="비밀번호를 입력하세요" class="w-full px-3 py-2 border border-[#e5e5ec] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-green-500" required />
            <button @click="togglePassword" type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              {{ showPassword ? "숨기기" : "보기" }}
            </button>
          </div>
        </div>

          <button type="submit" class="w-full py-3 bg-[#24C76F] text-white font-medium rounded-[10px] hover:bg-[#01C73C] transition-colors duration-200">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const showPassword = ref(false);
const router = useRouter();
const handleLogin = () => {
  router.push("/admin/dashboard");
};
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
</script>
