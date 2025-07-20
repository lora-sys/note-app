# 🚀 Fuckstack Note App

## 📝 项目简介

一个现代化、轻量级的笔记应用，使用 React 和 Appwrite 构建，提供简单而强大的笔记管理体验。

## ✨ 特性

- 🌈 动态笔记卡片
- 🔒 Appwrite 后端支持
- 📱 响应式设计
- 🎨 个性化颜色主题
- ⚡ 高性能拖拽和输入
- 🗑️ 一键删除笔记
- ➕ 快速新建笔记

## 🛠 技术栈

- React 19
- Vite
- Appwrite
- ESLint

## 🚀 快速开始

### 前提条件

- Node.js (v18+)
- npm 或 yarn

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yourusername/fuckstack-note-app.git
cd fuckstack-note-app/note-app
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
创建 `.env` 文件，添加以下内容：
```
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_DATABASE_ID=your_database_id
VITE_COLLECTION_NOTES_ID=your_collection_id
```

4. 启动开发服务器
```bash
npm run dev
```

## 📂 项目结构

```
note-app/
├── src/
│   ├── appwrite/     # Appwrite 配置
│   ├── components/   # React 组件
│   ├── pages/        # 页面组件
│   └── utils/        # 工具函数
├── public/           # 静态资源
└── README.md         # 项目文档
```

## 🤝 贡献指南

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 🐞 已修复问题与改进

### ✅ 性能优化
- NoteCard 输入保存增加防抖处理，提升性能
- 拖拽时只在 mouseup 时统一更新状态，减少不必要的重渲染
- 增加边界限制，防止卡片被拖出可视区域

### ✅ 用户体验改进
- 支持删除笔记功能，UI 交互更友好
- 新建笔记按钮，提升用户体验
- 增加删除确认对话框
- 支持 Ctrl+Enter 快速保存
- 优化按钮样式和加载状态

### ✅ 代码维护性
- NoteCard 组件拆分为 Header/Body，便于维护
- 工具函数增强健壮性，便于单元测试
- 增加 utils 单元测试覆盖
- 完善错误处理和边界情况

### ✅ 健壮性增强
- bodyParser 函数增强异常处理
- 增加空值检查和类型转换
- 完善删除和创建操作的错误处理
- 防止重复点击和异常状态

## 📄 许可证

基于 MIT 许可证 - 详见 [LICENSE.md](LICENSE.md)

## 🌟 鸣谢

- [React](https://reactjs.org/)
- [Appwrite](https://appwrite.io/)
- [Vite](https://vitejs.dev/)

---

**Happy Noting!** 📓✨