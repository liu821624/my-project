const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// 初始化 JSON 数据库
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], products: [] }));
}

// 基础 API 路由
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Amazon Hub Backend is running on F Drive' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
