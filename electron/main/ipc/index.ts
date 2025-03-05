import { ipcMain, BrowserWindow } from 'electron';
import { 
  addTodo, 
  getAllTodos, 
  updateTodoStatus, 
  deleteTodo 
} from '../database';
import { 
  getThemeConfig, 
  setThemeConfig, 
  getWindowConfig, 
  setWindowConfig,
  getSettings,
  setSettings
} from '../store';

// 注册所有IPC处理程序
export function registerIpcHandlers(mainWindow: BrowserWindow) {
  // 数据库操作 - 同步调用示例
  ipcMain.on('db:addTodo', (event, title: string) => {
    try {
      const id = addTodo(title);
      event.returnValue = { success: true, id };
    } catch (error) {
      console.error('添加待办事项失败:', error);
      event.returnValue = { success: false, error: (error as Error).message };
    }
  });

  // 数据库操作 - 异步调用示例
  ipcMain.handle('db:getAllTodos', async () => {
    try {
      const todos = getAllTodos();
      return { success: true, data: todos };
    } catch (error) {
      console.error('获取待办事项失败:', error);
      return { success: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('db:updateTodoStatus', async (_, id: number, completed: boolean) => {
    try {
      const result = updateTodoStatus(id, completed);
      return { success: true, changes: result.changes };
    } catch (error) {
      console.error('更新待办事项状态失败:', error);
      return { success: false, error: (error as Error).message };
    }
  });

  ipcMain.handle('db:deleteTodo', async (_, id: number) => {
    try {
      const result = deleteTodo(id);
      return { success: true, changes: result.changes };
    } catch (error) {
      console.error('删除待办事项失败:', error);
      return { success: false, error: (error as Error).message };
    }
  });

  // 配置存储操作
  ipcMain.handle('store:getTheme', () => {
    return getThemeConfig();
  });

  ipcMain.handle('store:setTheme', (_, theme) => {
    return setThemeConfig(theme);
  });

  ipcMain.handle('store:getWindowConfig', () => {
    return getWindowConfig();
  });

  ipcMain.handle('store:setWindowConfig', (_, config) => {
    return setWindowConfig(config);
  });

  ipcMain.handle('store:getSettings', () => {
    return getSettings();
  });

  ipcMain.handle('store:setSettings', (_, settings) => {
    return setSettings(settings);
  });

  // 主进程推送消息示例
  let messageInterval: NodeJS.Timeout | null = null;

  ipcMain.handle('demo:startPushMessages', () => {
    if (messageInterval) {
      clearInterval(messageInterval);
    }

    messageInterval = setInterval(() => {
      mainWindow.webContents.send('main:pushMessage', {
        time: new Date().toLocaleTimeString(),
        message: '这是来自主进程的推送消息'
      });
    }, 5000);

    return { success: true };
  });

  ipcMain.handle('demo:stopPushMessages', () => {
    if (messageInterval) {
      clearInterval(messageInterval);
      messageInterval = null;
    }
    return { success: true };
  });
} 