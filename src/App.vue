<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { 
  NConfigProvider, 
  NMessageProvider, 
  NDialogProvider, 
  NNotificationProvider,
  darkTheme, 
  lightTheme 
} from 'naive-ui';
import { useThemeStore } from './stores/theme';
import AppLayout from './components/common/AppLayout.vue';

const themeStore = useThemeStore();

// 计算当前主题
const theme = computed(() => {
  return themeStore.isDark ? darkTheme : lightTheme;
});

// 初始化主题
onMounted(async () => {
  await themeStore.initTheme();
});
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <app-layout>
            <router-view />
          </app-layout>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
}

.app-container {
  min-height: 100vh;
  transition: all 0.3s;
}
</style>
