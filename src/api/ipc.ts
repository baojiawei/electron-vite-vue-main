/**
 * IPC 通信 API 工具类
 * 封装与主进程的通信方法
 */

// 数据库操作 API
export const dbApi = {
  // 添加待办事项（同步）
  addTodo(title: string) {
    return window.ipcRenderer.send('db:addTodo', title);
  },

  // 获取所有待办事项（异步）
  async getAllTodos() {
    return await window.ipcRenderer.invoke('db:getAllTodos');
  },

  // 更新待办事项状态（异步）
  async updateTodoStatus(id: number, completed: boolean) {
    return await window.ipcRenderer.invoke('db:updateTodoStatus', id, completed);
  },

  // 删除待办事项（异步）
  async deleteTodo(id: number) {
    return await window.ipcRenderer.invoke('db:deleteTodo', id);
  },
};

// 配置存储 API
export const storeApi = {
  // 获取主题配置
  async getTheme() {
    return await window.ipcRenderer.invoke('store:getTheme');
  },

  // 设置主题配置
  async setTheme(theme: { name: string; isDark: boolean }) {
    return await window.ipcRenderer.invoke('store:setTheme', theme);
  },

  // 获取窗口配置
  async getWindowConfig() {
    return await window.ipcRenderer.invoke('store:getWindowConfig');
  },

  // 设置窗口配置
  async setWindowConfig(config: { width: number; height: number; x?: number; y?: number }) {
    return await window.ipcRenderer.invoke('store:setWindowConfig', config);
  },

  // 获取应用设置
  async getSettings() {
    return await window.ipcRenderer.invoke('store:getSettings');
  },

  // 设置应用设置
  async setSettings(settings: { autoLaunch: boolean; notifications: boolean }) {
    return await window.ipcRenderer.invoke('store:setSettings', settings);
  },
};

// 演示 API
export const demoApi = {
  // 开始推送消息
  async startPushMessages() {
    return await window.ipcRenderer.invoke('demo:startPushMessages');
  },

  // 停止推送消息
  async stopPushMessages() {
    return await window.ipcRenderer.invoke('demo:stopPushMessages');
  },

  // 注册消息监听
  onPushMessage(callback: (event: any, data: any) => void) {
    window.ipcRenderer.on('main:pushMessage', callback);
  },

  // 移除消息监听
  offPushMessage(callback: (event: any, data: any) => void) {
    window.ipcRenderer.off('main:pushMessage', callback);
  },
}; 