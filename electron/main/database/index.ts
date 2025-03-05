import Database from 'better-sqlite3';
import path from 'node:path';
import { app } from 'electron';

// 数据库文件路径
const dbPath = path.join(app.getPath('userData'), 'database.sqlite');

// 创建数据库连接
const db = new Database(dbPath, { verbose: console.log });

// 初始化数据库
export function initDatabase() {
  // 创建示例表
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('数据库初始化完成');
  return db;
}

// 获取数据库实例
export function getDatabase() {
  return db;
}

// 示例：添加待办事项
export function addTodo(title: string) {
  const stmt = db.prepare('INSERT INTO todos (title, completed) VALUES (?, ?)');
  const result = stmt.run(title, 0);
  return result.lastInsertRowid;
}

// 示例：获取所有待办事项
export function getAllTodos() {
  const stmt = db.prepare('SELECT * FROM todos ORDER BY created_at DESC');
  return stmt.all();
}

// 示例：更新待办事项状态
export function updateTodoStatus(id: number, completed: boolean) {
  const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
  return stmt.run(completed ? 1 : 0, id);
}

// 示例：删除待办事项
export function deleteTodo(id: number) {
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  return stmt.run(id);
}

// 关闭数据库连接
export function closeDatabase() {
  db.close();
} 