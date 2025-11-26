# ConnectRPC 计算器

基于 Go (ConnectRPC) 后端和 Next.js 前端的简单计算器示例。

## 前置要求

- Go 1.21+
- Node.js 18+
- [Buf CLI](https://buf.build/docs/installation)

## 快速开始

### 1. 生成代码

在项目根目录运行：

```bash
buf generate
```

### 2. 启动后端 (Go)

```bash
cd backend
go mod tidy
go run main.go
```
服务运行在 `http://localhost:8080`。

### 3. 启动前端 (Next.js)

```bash
cd frontend
npm install
npm run dev
```
访问 `http://localhost:3000` 使用计算器。

## 项目结构

- `proto/`: Protocol Buffer 定义文件
- `backend/`: Go 后端服务
- `frontend/`: Next.js 前端应用
