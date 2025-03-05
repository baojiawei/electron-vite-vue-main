<template>
  <div class="app-layout">
    <n-layout has-sider>
      <app-header />
      
      <n-layout-content class="layout-content">
        <slot></slot>
      </n-layout-content>
      
      <n-layout-footer bordered class="py-4 px-6 text-center">
        <p class="text-sm text-gray-500">
          Electron-Vue-Vite 示例应用 &copy; {{ new Date().getFullYear() }}
        </p>
      </n-layout-footer>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter } from 'naive-ui';
import AppHeader from './AppHeader.vue';
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  padding: 20px;
}
</style> 