<template>
  <div class="todo-container">
    <n-card title="待办事项管理" class="mb-4">
      <template #header-extra>
        <n-button size="small" @click="goToHome">
          返回首页
        </n-button>
      </template>
      
      <div class="mb-6">
        <n-input-group>
          <n-input
            v-model:value="newTodo"
            placeholder="输入新的待办事项..."
            @keyup.enter="addNewTodo"
          />
          <n-button type="primary" ghost @click="addNewTodo">
            添加
          </n-button>
        </n-input-group>
      </div>

      <n-spin :show="loading">
        <n-empty v-if="!loading && todos.length === 0" description="暂无待办事项" />
        
        <n-list v-else>
          <todo-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @update-status="updateTodoCompleted"
            @delete="removeTodo"
          />
        </n-list>
      </n-spin>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NCard, NButton, NInput, NInputGroup, NSpin, NEmpty, NList } from 'naive-ui';
import { useTodoStore } from '../stores/todo';
import TodoItem from '../components/todo/TodoItem.vue';

const router = useRouter();
const todoStore = useTodoStore();
const newTodo = ref('');

// 从Store中获取状态
const todos = todoStore.todos;
const loading = todoStore.loading;

// 添加新的待办事项
function addNewTodo() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value);
    newTodo.value = '';
  }
}

// 更新待办事项完成状态
function updateTodoCompleted(id: number, completed: boolean) {
  todoStore.updateTodoStatus(id, completed);
}

// 删除待办事项
function removeTodo(id: number) {
  todoStore.deleteTodo(id);
}

// 组件挂载时加载待办事项
onMounted(() => {
  todoStore.loadTodos();
});

function goToHome() {
  router.push('/');
}
</script>

<style scoped>
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> 