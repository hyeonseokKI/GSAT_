import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { handleClose, setLoggedIn } from '../Redux/Store.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../Redux/AuthReducer.js';

const SquareButton = styled(Button)`
  border-radius: 0; /* 각지게 만들기 위해 설정 */

`;

function LoginModal(){
    let dispatch = useDispatch()
    const loginHandle = useSelector((state) => state.loginHandle.isModalOpen);
    let navigate = useNavigate();

    const [loginMessage, setLoginMessage] = useState('');  //로그인 모달 성공 실패 여부 메세지
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    const handleLogin1 = async () => {
      const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });

      if (response.ok) {
          const { token } = await response.json();
          dispatch(handleClose()); // Close modal
          dispatch(setLoggedIn(token));
          localStorage.setItem('token', token); // Save token to localStorage
          dispatch(setToken(token));

          alert('로그인 성공');
          navigate('/'); // Navigate to home
      } else {
        setLoginMessage('로그인 실패');
          alert('로그인 실패');
      }
  };
    return(
      <>
  
  
  <Modal show={loginHandle} onHide={() => dispatch(handleClose())}>
  <Modal.Header closeButton>
            <Modal.Title>로그인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  type="email"
                  placeholder="아이디"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Label>Example textarea</Form.Label> */}
                <Form.Control 
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <input id="name" type="checkbox" />          
              <label htmlFor="name">아이디 기억하기</label>
              {loginMessage && <div>{loginMessage}</div>}
            </Form>
  
          </Modal.Body>
          {/* <Modal.Footer> */}
          <div className="d-grid gap-0">
  
        <SquareButton variant="light" size="lg" onClick={handleLogin1}>
          로그인
        </SquareButton>
        <SquareButton variant="dark" size="lg" onClick={
    ()=> {navigate('/sign-up')
    dispatch(handleClose())
    }
        }>
          회원가입
        </SquareButton>
        <SquareButton variant="success" size="lg" onClick={()=>{alert('준비중 입니다~')}}>
          네이버 로그인
        </SquareButton>
        <SquareButton variant="warning" size="lg" onClick={()=>{alert('준비중 입니다~')}}style={{color : 'white'}} >
          카카오 로그인
        </SquareButton>
      </div>
          {/* <Button variant="light" onClick={props.handleClose}>Light</Button>{' '}
  
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={props.handleClose}>
              Save Changes
            </Button> */}
          {/* </Modal.Footer> */}
        </Modal>   
      </>
    )
  }

  export default LoginModal;
