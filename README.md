# 🚀 Fuckstack Note App

## 📝 项目简介

一个现代化、轻量级的笔记应用，使用 React 和 Appwrite 构建，提供简单而强大的笔记管理体验。

## ✨ 特性

- 🌈 动态笔记卡片
- 🔒 Appwrite 后端支持
- 📱 响应式设计
- 🎨 个性化颜色主题

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

## 📄 许可证

基于 MIT 许可证 - 详见 [LICENSE.md](LICENSE.md)

## 🌟 鸣谢

- [React](https://reactjs.org/)
- [Appwrite](https://appwrite.io/)
- [Vite](https://vitejs.dev/)

---

**Happy Noting!** 📓✨