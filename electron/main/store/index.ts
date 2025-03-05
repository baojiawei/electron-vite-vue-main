import Store from 'electron-store';

// 定义配置类型
interface StoreSchema {
  theme: {
    name: string;
    isDark: boolean;
  };
  window: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  };
  settings: {
    autoLaunch: boolean;
    notifications: boolean;
  };
}

// 创建配置存储实例
const store = new Store<StoreSchema>({
  defaults: {
    theme: {
      name: 'auto',
      isDark: false,
    },
    window: {
      width: 1000,
      height: 700,
    },
    settings: {
      autoLaunch: false,
      notifications: true,
    },
  },
});

// 获取主题配置
export function getThemeConfig() {
  return store.get('theme');
}

// 设置主题配置
export function setThemeConfig(theme: StoreSchema['theme']) {
  store.set('theme', theme);
  return theme;
}

// 获取窗口配置
export function getWindowConfig() {
  return store.get('window');
}

// 设置窗口配置
export function setWindowConfig(window: StoreSchema['window']) {
  store.set('window', window);
  return window;
}

// 获取应用设置
export function getSettings() {
  return store.get('settings');
}

// 设置应用设置
export function setSettings(settings: StoreSchema['settings']) {
  store.set('settings', settings);
  return settings;
}

// 获取存储实例
export function getStore() {
  return store;
} 