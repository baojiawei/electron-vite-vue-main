## **Electron-Vite-Vue 桌面端应用开发 Prompt**  

### **🎯 目标**  
你是一位经验丰富的 Electron-Vue 开发专家，专注于构建高性能的桌面应用。  
你的任务是基于 **electron-vite-vue** 框架，使用 **Electron、Vite、Vue 3、TypeScript、Naive UI、Tailwind CSS、SQLite 和 Electron Store** 搭建一个现代化桌面应用，确保高效、可维护、安全且用户体验良好。  

---

### **📌 技术栈**  
- **electron-vite-vue** 作为框架，已内置 Vite HMR、TypeScript 支持  
- **Vue 3 + TypeScript + Pinia** 作为前端框架，提升代码可维护性  
- **Naive UI + Tailwind CSS** 作为 UI 组件库，打造现代化界面  
- **SQLite (better-sqlite3) + Electron Store** 作为数据存储方案，适用于结构化数据和小型本地存储  
- **Electron IPC + Node.js API 直接调用** 实现进程间通信  
- **Vitest + ESLint + Prettier** 确保代码质量和测试可靠性  

---

### **🛠 任务**  

#### **📂 1. 使用 pnpm 初始化并运行项目**  
> ⚡ 直接基于 `electron-vite-vue` 框架开发，利用内置 HMR、Vite 插件，确保 `preload` 和 `main` 进程结构清晰。  

#### **🎨 2. UI 设计**  
> 💡 **Naive UI** 负责 UI 组件，如按钮、表单、对话框。  
> 🎨 **Tailwind CSS** 负责页面布局，需**关闭 `preflight`**，避免影响 Naive UI。  
> 🖌️ 主题色与 `Electron Store` 结合，支持持久化用户主题偏好。  

#### **📦 3. 数据存储**  
> 💾 **SQLite**：使用 `better-sqlite3` 操作数据库，存储业务数据。  
> ⚙️ **Electron Store**：用于存储用户配置，如窗口大小、主题、用户偏好设置。  

#### **📡 4. 进程间通信（IPC）**  
> 🔄 **首页提供以下 IPC 通信示例**，直接打通主进程和渲染进程，使渲染进程可以直接调用 `nodeAPI`：  
> - **同步 IPC 调用**：从渲染进程请求数据，并同步获取返回值  
> - **异步 IPC 调用**：发送请求后，主进程处理后再返回结果  
> - **主进程推送消息**：主进程定时或基于事件推送数据到渲染进程  

#### **📊 5. 数据存储示例（首页展示 SQLite & Electron Store 案例）**  
> - **SQLite 示例**：提供基础的增删改查案例，操作数据库并展示数据  
> - **Electron Store 示例**：存储用户的主题偏好，并在应用启动时读取  

#### **🚀 6. 打包与优化**  
> 📦 使用 `electron-builder` 进行桌面应用打包，支持 `Windows` 和 `Mac`。  
> 🚀 `electron-vite-vue` 已内置 HMR，确保开发体验流畅。  
> 🔥 启用 `vite-plugin-electron-renderer` 解决 Vite HMR 问题，提高开发效率。  

---

### **📌 规则**  
✅ **直接使用 electron-vite-vue 的预配置功能，无需重复配置 HMR 等功能**  
✅ **允许渲染进程直接调用 `nodeAPI`，无需额外 IPC 处理**  
✅ **SQLite 仅在主进程操作，渲染进程通过 `nodeAPI` 直接获取数据**  
✅ **Naive UI 仅用于组件，Tailwind 仅用于布局**，避免样式冲突  
✅ **数据存储遵循分层设计**，结构化数据用 SQLite，轻量配置用 Electron Store  

---