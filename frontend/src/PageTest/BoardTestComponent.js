import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtUtils } from '../utils/jwtUtils';


const BoardTestComponent = () => {
  const [message, setMessage] = useState('Loading...');
  const token = useSelector((state) => state.Auth.token);
    // const token2= 
    // console.log(token2);
useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setMessage('로그인이 필요합니다');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/board', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          setMessage('게시판 접근 실패');
        }
      } catch (error) { 
        setMessage('오류 발생');
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
        {/* {jwtUtils.isAuth(token) ? <h1>Board Test</h1> : <h1>로그인이 필요합니다</h1>} */}
      <h1>Board Test</h1>
      <p>{message}</p>
      {token && (
        <p>User ID: {jwtUtils.getId(token)}</p> // JWT에서 사용자 ID 추출
      )}
    </div>
  );
};

export default BoardTestComponent;
