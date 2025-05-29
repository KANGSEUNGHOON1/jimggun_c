<template>
  <div class="flex gap-1 text-xs">
    <!-- 연도 선택 -->
    <Combobox v-model="year">
      <div class="relative">
        <ComboboxButton
          class="w-[70px] flex items-center justify-center gap-2 py-1 rounded border border-input text-xs text-gray font-normal dark:bg-dark-100 dark:text-dark-font-100 dark:border-dark-200">
          {{ year }}년
          <!-- 라이트 모드용 이미지 -->
          <img
            src="/images/jung/customdate-light.png"
            alt="토글버튼 (라이트)"
            class="w-2 h-2 block dark:hidden" />
          <!-- 다크 모드용 이미지 -->
          <img
            src="/images/jung/customdate-dark.png"
            alt="토글버튼 (다크)"
            class="w-2 h-2 hidden dark:block" />
        </ComboboxButton>
        <ComboboxOptions
          class="absolute mt-1 w-full bg-white border-input text-gray-200 font-normal dark:bg-dark-100 dark:border-dark-200 dark:text-dark-font-200 border rounded shadow z-10">
          <ComboboxOption
            v-for="y in yearOptions"
            :key="y"
            :value="y"
            class="px-2 py-1 hover:bg-gray-100 hover:text-gray-300 dark:hover:bg-dark dark:hover:text-dark-font-100">
            {{ y }}년
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>

    <!-- 월 선택 -->
    <Combobox v-if="mode !== 'yearly'" v-model="month">
      <div class="relative">
        <ComboboxButton
          class="w-[54px] flex items-center justify-center gap-2 px-1.5 py-1 rounded border border-input text-xs text-gray font-normal dark:bg-dark-100 dark:text-dark-font-100 dark:border-dark-200">
          {{ month }}월
         <!-- 라이트 모드용 이미지 -->
          <img
            src="/images/jung/customdate-light.png"
            alt="토글버튼 (라이트)"
            class="w-2 h-2 block dark:hidden" />
          <!-- 다크 모드용 이미지 -->
          <img
            src="/images/jung/customdate-dark.png"
            alt="토글버튼 (다크)"
            class="w-2 h-2 hidden dark:block" />
        </ComboboxButton>
        <ComboboxOptions
          class="absolute mt-1 w-full bg-white border-input text-gray-200 font-normal dark:bg-dark-100 dark:border-dark-200 dark:text-dark-font-200 border rounded shadow z-10">
          <ComboboxOption
            v-for="m in 12"
            :key="m"
            :value="m"
            class="px-2 py-1 hover:bg-gray-100 hover:text-gray-300 dark:hover:bg-dark dark:hover:text-dark-font-100">
            {{ m }}월
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>

    <!-- 주차 선택 -->
    <Combobox v-if="mode === 'weekly'" v-model="week">
      <div class="relative">
        <ComboboxButton
          class="w-[60px] flex items-center justify-center gap-2 px-1.5 py-1 rounded border border-input text-xs text-gray font-normal dark:bg-dark-100 dark:text-dark-font-100 dark:border-dark-200">
          {{ week }}주차
          <!-- 라이트 모드용 이미지 -->
          <img
            src="/images/jung/customdate-light.png"
            alt="토글버튼 (라이트)"
            class="w-2 h-2 block dark:hidden" />
          <!-- 다크 모드용 이미지 -->
          <img
            src="/images/jung/customdate-dark.png"
            alt="토글버튼 (다크)"
            class="w-2 h-2 hidden dark:block" />
        </ComboboxButton>
        <ComboboxOptions
          class="absolute mt-1 w-full bg-white border-input text-gray-200 font-normal dark:bg-dark-100 dark:border-dark-200 dark:text-dark-font-200 border rounded shadow z-10">
          <ComboboxOption
            v-for="w in 5"
            :key="w"
            :value="w"
            class="px-2 py-1 hover:bg-gray-100 hover:text-gray-300 dark:hover:bg-dark dark:hover:text-dark-font-100">
            {{ w }}주차
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
</template>

<script setup>
import {
  Combobox,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import { ref, watchEffect } from "vue";

const props = defineProps({
  mode: {
    type: String,
    default: "weekly",
  },
});

const emit = defineEmits(["update:modelValue"]);

const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth() + 1);
const week = ref(getWeekOfMonth(today));
const yearOptions = [2025, 2024, 2023, 2022];

function getWeekOfMonth(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const adjustedDate = date.getDate() + firstDay;
  return Math.ceil(adjustedDate / 7);
}

// emit current selection for outside use
watchEffect(() => {
  emit("update:modelValue", {
    year: year.value,
    month: month.value,
    week: week.value,
  });
});
</script>

<style scoped>
.dark .hover\:bg-dark:hover {
  background-color: #333 !important;
}
</style>
