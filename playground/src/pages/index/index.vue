<script setup lang="ts">
import { ref } from 'vue';
const title = ref('Hello');
</script>

<template>
  <view class="flex flex-col items-center justify-center">
    <image class="h-200rpx w-200rpx mt-200rpx mb-50rpx mx-auto" src="/static/logo.png" />
    <view class="flex justify-center">
      <text class="text-lg text-[#8f8f94]">{{ title }}</text>
    </view>
  </view>
</template>
