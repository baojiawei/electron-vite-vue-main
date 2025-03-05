<template>
  <div class="app-header">
    <n-layout-header bordered class="py-2 px-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="logo mr-4">
            <img src="/logo.svg" alt="Logo" class="h-8" />
          </div>
          <h1 class="text-lg font-medium">Electron-Vue-Vite 应用</h1>
        </div>
        
        <div class="flex items-center gap-4">
          <n-menu
            v-model:value="activeKey"
            mode="horizontal"
            :options="menuOptions"
            @update:value="handleMenuUpdate"
          />
          
          <n-button circle @click="toggleDarkMode">
            <template #icon>
              <n-icon>
                <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
                  <path fill="currentColor" d="M12 17q-2.075 0-3.538-1.463T7 12q0-2.075 1.463-3.538T12 7q2.075 0 3.538 1.463T17 12q0 2.075-1.463 3.538T12 17ZM2 13q-.425 0-.713-.288T1 12q0-.425.288-.713T2 11h2q.425 0 .713.288T5 12q0 .425-.288.713T4 13H2Zm18 0q-.425 0-.713-.288T19 12q0-.425.288-.713T20 11h2q.425 0 .713.288T23 12q0 .425-.288.713T22 13h-2Zm-8-8q-.425 0-.713-.288T11 4V2q0-.425.288-.713T12 1q.425 0 .713.288T13 2v2q0 .425-.288.713T12 5Zm0 18q-.425 0-.713-.288T11 22v-2q0-.425.288-.713T12 19q.425 0 .713.288T13 20v2q0 .425-.288.713T12 23ZM5.65 7.05L4.575 6q-.3-.275-.288-.7t.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7t-.275.7q-.275.3-.687.288T5.65 7.05ZM18 19.425l-1.05-1.075q-.275-.3-.275-.713t.275-.687q.275-.3.688-.287t.712.287L19.425 18q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.288-.687t.288-.713L18 4.575q.275-.3.7-.288t.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275t-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.712-.275t.688.275q.3.275.288.688t-.288.712L6 19.425q-.275.3-.7.288t-.725-.288Z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
                  <path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21Z"/>
                </svg>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </n-layout-header>
  </div>
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NLayoutHeader, NMenu, NButton, NIcon } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { useThemeStore } from '../../stores/theme';

const router = useRouter();
const route = useRoute();
const themeStore = useThemeStore();

// 当前激活的菜单项
const activeKey = ref(route.path);

// 是否为暗色主题
const isDark = computed(() => themeStore.isDark);

// 切换暗色/亮色主题
function toggleDarkMode() {
  themeStore.toggleDarkMode();
}

// 菜单选项
const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: '/',
  },
  {
    label: '待办事项',
    key: '/todo',
  },
  {
    label: '设置',
    key: '/settings',
  },
  {
    label: '关于',
    key: '/about',
  },
];

// 处理菜单项点击
function handleMenuUpdate(key: string) {
  router.push(key);
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style> 