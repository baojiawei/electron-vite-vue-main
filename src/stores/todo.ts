import { defineStore } from 'pinia';
import { ref } from 'vue';
import { dbApi } from '../api/ipc';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  const loading = ref<boolean>(false);

  // 加载所有待办事项
  async function loadTodos() {
    loading.value = true;
    try {
      const result = await dbApi.getAllTodos();
      if (result.success) {
        todos.value = result.data;
      } else {
        console.error('加载待办事项失败:', result.error);
      }
    } catch (error) {
      console.error('加载待办事项出错:', error);
    } finally {
      loading.value = false;
    }
  }

  // 添加待办事项
  function addTodo(title: string) {
    if (!title.trim()) return;
    
    try {
      // 使用同步IPC调用
      dbApi.addTodo(title);
      // 添加后重新加载列表
      loadTodos();
    } catch (error) {
      console.error('添加待办事项出错:', error);
    }
  }

  // 更新待办事项状态
  async function updateTodoStatus(id: number, completed: boolean) {
    try {
      const result = await dbApi.updateTodoStatus(id, completed);
      if (result.success) {
        // 更新本地状态
        const todo = todos.value.find(t => t.id === id);
        if (todo) {
          todo.completed = completed;
        }
      }
    } catch (error) {
      console.error('更新待办事项状态出错:', error);
    }
  }

  // 删除待办事项
  async function deleteTodo(id: number) {
    try {
      const result = await dbApi.deleteTodo(id);
      if (result.success) {
        // 从本地状态中移除
        todos.value = todos.value.filter(t => t.id !== id);
      }
    } catch (error) {
      console.error('删除待办事项出错:', error);
    }
  }

  return {
    todos,
    loading,
    loadTodos,
    addTodo,
    updateTodoStatus,
    deleteTodo,
  };
}); 