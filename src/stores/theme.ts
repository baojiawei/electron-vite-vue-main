import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { storeApi } from '../api/ipc';

export const useThemeStore = defineStore('theme', () => {
  // 主题名称：light, dark, auto
  const themeName = ref<string>('auto');
  // 是否为暗色主题
  const isDark = ref<boolean>(false);
  // 是否正在加载
  const loading = ref<boolean>(true);

  // 计算属性：当前主题
  const currentTheme = computed(() => {
    return {
      name: themeName.value,
      isDark: isDark.value,
    };
  });

  // 初始化主题
  async function initTheme() {
    loading.value = true;
    try {
      const theme = await storeApi.getTheme();
      themeName.value = theme.name;
      isDark.value = theme.isDark;
    } catch (error) {
      console.error('获取主题配置失败:', error);
    } finally {
      loading.value = false;
    }
  }

  // 设置主题
  async function setTheme(name: string, dark: boolean) {
    themeName.value = name;
    isDark.value = dark;
    
    try {
      await storeApi.setTheme({
        name,
        isDark: dark,
      });
    } catch (error) {
      console.error('保存主题配置失败:', error);
    }
  }

  // 切换暗色/亮色主题
  async function toggleDarkMode() {
    const newIsDark = !isDark.value;
    await setTheme(themeName.value, newIsDark);
  }

  return {
    themeName,
    isDark,
    loading,
    currentTheme,
    initTheme,
    setTheme,
    toggleDarkMode,
  };
}); 