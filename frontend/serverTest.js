// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // CORS 패키지 가져오기
const dotenv = require('dotenv'); // dotenv 패키지 가져오기

dotenv.config({ path: './key.env' });
console.log('JWT_SECRET from .env:', process.env.JWT_SECRET);

const app = express();
const PORT = 8080;

app.use(cors({
  origin: 'http://localhost:3000' // React 앱이 실행되는 주소
}));

app.use(bodyParser.json());

// 사용자 데이터베이스 (실제로는 데이터베이스를 사용해야 하지만 예시로 메모리에 저장)
const users = [
  { id: 1, username: 'user1', password: '123' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'x', password: 'x' }
];

// 로그인 엔드포인트
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자 인증
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: '인증 실패' });
  }

  // JWT 생성
  const token = jwt.sign({  username : user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  console.log(`[${new Date().toISOString()}] 사용자 ${user.username }이(가) 로그인하였습니다.`);

  // 클라이언트에게 토큰 응답
  res.json({ token });
});

// 게시판 엔드포인트 (인증 필요)
app.get('/api/board', authenticateToken, (req, res) => {
  console.log(`[${new Date().toISOString()}] 인증된 사용자가 게시판에 접근했습니다.`);

  res.json({ message: '게시판 접근 성공!' });
});

// JWT 인증 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
