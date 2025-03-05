<template>
  <div class="about-container">
    <n-card title="关于应用" class="mb-4">
      <template #header-extra>
        <n-button size="small" @click="goToHome">
          返回首页
        </n-button>
      </template>

      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold mb-2">Electron-Vue-Vite 示例应用</h1>
        <p class="text-gray-500">版本 1.0.0</p>
      </div>

      <n-divider />

      <div class="mb-6">
        <h2 class="text-lg font-medium mb-2">技术栈</h2>
        <n-space vertical>
          <n-tag type="success">Electron</n-tag>
          <n-tag type="info">Vue 3</n-tag>
          <n-tag type="warning">TypeScript</n-tag>
          <n-tag type="error">Vite</n-tag>
          <n-tag type="primary">Naive UI</n-tag>
          <n-tag type="default">Tailwind CSS</n-tag>
          <n-tag type="success">SQLite</n-tag>
          <n-tag type="info">Electron Store</n-tag>
        </n-space>
      </div>

      <n-divider />

      <div class="text-center">
        <p class="text-sm text-gray-500">
          © 2023 Electron-Vue-Vite 示例应用
        </p>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { NCard, NButton, NDivider, NSpace, NTag } from 'naive-ui';

const router = useRouter();

function goToHome() {
  router.push('/');
}
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> 