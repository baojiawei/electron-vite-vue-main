<template>
  <div class="settings-container">
    <n-card title="应用设置" class="mb-4">
      <template #header-extra>
        <n-button size="small" @click="goToHome">
          返回首页
        </n-button>
      </template>

      <n-spin :show="loading">
        <n-divider title-placement="left">主题设置</n-divider>
        
        <div class="mb-6">
          <n-form-item label="主题模式">
            <n-radio-group v-model:value="themeMode" name="theme-mode">
              <n-space>
                <n-radio value="light">浅色</n-radio>
                <n-radio value="dark">深色</n-radio>
                <n-radio value="auto">跟随系统</n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          
          <n-form-item label="当前主题状态">
            <n-tag :type="isDark ? 'warning' : 'success'">
              {{ isDark ? '深色模式' : '浅色模式' }}
            </n-tag>
          </n-form-item>
        </div>

        <n-divider title-placement="left">应用设置</n-divider>
        
        <div class="mb-6">
          <n-form-item label="开机自启动">
            <n-switch v-model:value="autoLaunch" />
          </n-form-item>
          
          <n-form-item label="启用通知">
            <n-switch v-model:value="notifications" />
          </n-form-item>
        </div>

        <div class="flex justify-end">
          <n-button type="primary" @click="saveSettings">
            保存设置
          </n-button>
        </div>
      </n-spin>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { 
  NCard, NButton, NSpin, NDivider, NFormItem, 
  NRadioGroup, NRadio, NSpace, NTag, NSwitch 
} from 'naive-ui';
import { useThemeStore } from '../stores/theme';
import { storeApi } from '../api/ipc';

const router = useRouter();
const themeStore = useThemeStore();

// 主题设置
const themeMode = ref('auto');
const isDark = computed(() => themeStore.isDark);
const loading = ref(true);

// 应用设置
const autoLaunch = ref(false);
const notifications = ref(true);

// 导航到首页
function goToHome() {
  router.push('/');
}

// 加载设置
async function loadSettings() {
  loading.value = true;
  
  try {
    // 加载主题设置
    await themeStore.initTheme();
    themeMode.value = themeStore.themeName;
    
    // 加载应用设置
    const settings = await storeApi.getSettings();
    autoLaunch.value = settings.autoLaunch;
    notifications.value = settings.notifications;
  } catch (error) {
    console.error('加载设置失败:', error);
  } finally {
    loading.value = false;
  }
}

// 保存设置
async function saveSettings() {
  loading.value = true;
  
  try {
    // 保存主题设置
    await themeStore.setTheme(themeMode.value, isDark.value);
    
    // 保存应用设置
    await storeApi.setSettings({
      autoLaunch: autoLaunch.value,
      notifications: notifications.value,
    });
  } catch (error) {
    console.error('保存设置失败:', error);
  } finally {
    loading.value = false;
  }
}

// 监听主题模式变化
watch(themeMode, async (newMode) => {
  let newIsDark = isDark.value;
  
  if (newMode === 'light') {
    newIsDark = false;
  } else if (newMode === 'dark') {
    newIsDark = true;
  } else if (newMode === 'auto') {
    // 自动模式下，根据系统主题设置
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    newIsDark = prefersDark;
  }
  
  await themeStore.setTheme(newMode, newIsDark);
});

// 组件挂载时加载设置
onMounted(() => {
  loadSettings();
});
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> 