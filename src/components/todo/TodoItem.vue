<template>
  <div class="todo-item" :class="{ 'completed': todo.completed }">
    <n-list-item>
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
          <n-checkbox
            :checked="todo.completed"
            @update:checked="updateStatus"
          />
          <span :class="{ 'line-through text-gray-400': todo.completed }">
            {{ todo.title }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <n-text depth="3" class="text-xs">
            {{ formatDate(todo.created_at) }}
          </n-text>
          <n-button
            quaternary
            circle
            size="small"
            @click="deleteTodo"
          >
            <template #icon>
              <n-icon>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
                  <path fill="currentColor" d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/>
                </svg>
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </n-list-item>
  </div>
</template>

<script setup lang="ts">
import { NListItem, NCheckbox, NText, NButton, NIcon } from 'naive-ui';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  'update-status': [id: number, completed: boolean];
  'delete': [id: number];
}>();

// 更新待办事项状态
function updateStatus(completed: boolean) {
  emit('update-status', props.todo.id, completed);
}

// 删除待办事项
function deleteTodo() {
  emit('delete', props.todo.id);
}

// 格式化日期
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
}
</script>

<style scoped>
.todo-item {
  transition: all 0.3s;
}

.todo-item.completed {
  opacity: 0.7;
}
</style> 