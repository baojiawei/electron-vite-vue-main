<template>
  <div class="home-container">
    <n-card title="Electron-Vue-Vite 示例应用" class="mb-4">
      <p class="text-base mb-4">
        这是一个基于 Electron + Vue 3 + Vite + TypeScript + Naive UI + Tailwind CSS 的示例应用。
      </p>
      <div class="flex gap-4">
        <n-button type="primary" @click="goToTodo">待办事项示例</n-button>
        <n-button @click="goToSettings">应用设置</n-button>
      </div>
    </n-card>

    <n-card title="IPC 通信示例" class="mb-4">
      <div class="mb-4">
        <h3 class="text-lg font-medium mb-2">主进程推送消息</h3>
        <div class="flex gap-4 mb-2">
          <n-button @click="startPushMessages" :disabled="isPushingMessages">
            开始接收消息
          </n-button>
          <n-button @click="stopPushMessages" :disabled="!isPushingMessages">
            停止接收消息
          </n-button>
        </div>
        <div v-if="messages.length > 0" class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <div v-for="(msg, index) in messages" :key="index" class="mb-2 last:mb-0">
            <span class="text-gray-500">{{ msg.time }}:</span> {{ msg.message }}
          </div>
        </div>
        <div v-else class="text-gray-500 italic">
          点击"开始接收消息"按钮接收来自主进程的消息
        </div>
      </div>
    </n-card>

    <n-card title="SQLite 数据库示例" class="mb-4">
      <p class="mb-4">
        本应用使用 SQLite 数据库存储结构化数据。点击下方按钮查看待办事项示例。
      </p>
      <n-button type="primary" @click="goToTodo">查看待办事项</n-button>
    </n-card>

    <n-card title="Electron Store 配置示例">
      <p class="mb-4">
        本应用使用 Electron Store 存储应用配置。点击下方按钮查看设置页面。
      </p>
      <n-button @click="goToSettings">查看应用设置</n-button>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { NCard, NButton } from 'naive-ui';
import { demoApi } from '../api/ipc';

const router = useRouter();
const isPushingMessages = ref(false);
const messages = ref<{ time: string; message: string }[]>([]);

// 导航函数
function goToTodo() {
  router.push('/todo');
}

function goToSettings() {
  router.push('/settings');
}

// 开始接收主进程推送的消息
async function startPushMessages() {
  try {
    await demoApi.startPushMessages();
    isPushingMessages.value = true;
  } catch (error) {
    console.error('启动消息推送失败:', error);
  }
}

// 停止接收主进程推送的消息
async function stopPushMessages() {
  try {
    await demoApi.stopPushMessages();
    isPushingMessages.value = false;
  } catch (error) {
    console.error('停止消息推送失败:', error);
  }
}

// 接收主进程推送的消息
function handlePushMessage(event: any, data: { time: string; message: string }) {
  messages.value.unshift(data);
  // 最多保留10条消息
  if (messages.value.length > 10) {
    messages.value = messages.value.slice(0, 10);
  }
}

onMounted(() => {
  // 注册消息监听
  demoApi.onPushMessage(handlePushMessage);
});

onUnmounted(() => {
  // 清理消息监听
  demoApi.offPushMessage(handlePushMessage);
  // 确保停止消息推送
  if (isPushingMessages.value) {
    stopPushMessages();
  }
});
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> 