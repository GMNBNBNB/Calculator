# ConnectRPC 计算器

基于 Go (ConnectRPC) 后端和 Next.js 前端的计算器示例。

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

## 测试

### 后端测试

```bash
cd backend
go test -v
```

测试覆盖：
- 加减乘除基本运算
- 除零错误处理
- 无效操作处理

### 前端测试

```bash
cd frontend
npm test
```

测试覆盖：
- 运算逻辑测试（基本运算、小数、负数）
- UI 交互测试（界面渲染、用户输入、错误提示）
- API 调用测试

## 项目结构

- `proto/`: Protocol Buffer 定义文件
- `backend/`: Go 后端服务
- `frontend/`: Next.js 前端应用
