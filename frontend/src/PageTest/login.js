import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../Redux/Store';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { setToken } from '../Redux/AuthReducer';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const { token } = await response.json();
            dispatch(setLoggedIn(token));
            localStorage.setItem('token', token); // Save token to localStorage
            dispatch(setToken(token));

            alert('로그인 성공');
            const redirectUrl = searchParams.get("redirectUrl");
            setTimeout(()=> {
                if (redirectUrl) {
                  navigate(redirectUrl);
                } else {
                  navigate("/");
                }
              }, 2000);

        } else {
            alert('로그인 실패');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>로그인</button>

            
        </div>
    );
};

export default Login;
