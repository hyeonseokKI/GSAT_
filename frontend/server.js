const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 5000;

// 미들웨어 설정
app.use(bodyParser.json());

// CORS 설정 (필요 시)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// 서버 시작 시 db.json 파일 초기화
if (!fs.existsSync('db.json')) {
  fs.writeFileSync('db.json', JSON.stringify({ users: [] }, null, 2));
}

// 회원가입 엔드포인트
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // 사용자 데이터 유효성 검사
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 유저 데이터 로드
  fs.readFile('db.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    let db;
    try {
      db = JSON.parse(data);
      if (!db.users || !Array.isArray(db.users)) {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      db = { users: [] };
    }

    // 이메일 중복 검사
    if (db.users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 새로운 사용자 추가
    const newUser = { username, email, password };
    db.users.push(newUser);

    // db.json 업데이트
    fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// 로그인 엔드포인트
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // 사용자 데이터 유효성 검사
  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 유저 데이터 로드
  fs.readFile('db.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    let db;
    try {
      db = JSON.parse(data);
      if (!db.users || !Array.isArray(db.users)) {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    // 유저 인증
    const user = db.users.find(user => user.email === email && user.password === password);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
  });
});



app.post('/api/check-username', (req, res) => {
  const { username } = req.body;

  // 유저 데이터 로드
  fs.readFile('db.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    let db;
    try {
      db = JSON.parse(data);
      if (!db.users || !Array.isArray(db.users)) {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      db = { users: [] };
    }

    // 닉네임 중복 검사
    if (db.users.some(user => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    res.status(200).json({ message: 'Username is available' });
  });
});
// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  // 서버 시작 시 회원가입 요청 보내기
  axios.post('http://localhost:5000/api/register', {
    username: 'test1',
    email: 'test1@test.com',
    password: 'Password123!',
  })
  .then(response => {
    console.log('Registration Response:', response.data);
  })
  .catch(error => {
    console.error('Error during registration:', error.response ? error.response.data : error.message);
  });
});
