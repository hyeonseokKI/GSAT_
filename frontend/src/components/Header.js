
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { VscAccount } from "react-icons/vsc";

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

import { handleShow, setLoggedOut } from '../Redux/Store';
import LoginModal from './LoginModal.js';
import { jwtUtils } from "../utils/jwtUtils.js";
import { useEffect, useState } from "react";
import { setToken } from "../Redux/AuthReducer.js";
import axios from 'axios';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const token = useSelector(state => state.Auth.token);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
      console.log("setisAuth success");
    } else {
      setIsAuth(false);
    }
  }, [token]);
  const logout = async () => {
    alert("로그아웃 되었습니다😎");

    // Optional: notify the backend about the logout (if needed)
    await axios.post('/api/logout'); // Example API call

    // Clear the token from Redux state
    await dispatch(setToken(""));

    // Clear the token from localStorage or sessionStorage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to the home page or login page
    navigate("/");
  };


  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">GSAT</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about">about</Nav.Link>

              <Nav.Link href="/board-list">게시판</Nav.Link>
              <Nav.Link href="/pdf-test">pdf-test</Nav.Link>

              <Nav.Link href="/question-list">제보방</Nav.Link>

            </Nav>

            <Nav>
              {/* <ProfileDropdown /> */}


              {isAuth ? (<>
                <VscAccount style={{ height: "2em" }} />
                <NavDropdown title="프로필" href="/SignInAfter" id="collapsible-nav-dropdown" style={{ fontSize: "12px" }} >
                  <NavDropdown.Item href={`/member/user`} style={{ fontSize: "12px" }} >나의 gsat로 가기</NavDropdown.Item>
                  <NavDropdown.Item href="/SignInAfter" style={{ fontSize: "12px" }} >나의 gsat 목록</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4" style={{ fontSize: "12px" }} >나의 gsat 분석</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/question-list" style={{ fontSize: "12px" }} >문제 직접 출제 </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link style={{ fontSize: "12px" }} onClick={logout}>로그아웃</Nav.Link>
                </>) : <>
                <Nav.Link style={{ fontSize: "12px" }} onClick={() => dispatch(handleShow())}>로그인</Nav.Link>
                <Nav.Link href="/sign-up" style={{ fontSize: "12px" }}  >회원가입</Nav.Link>

                </>}
              {/* {isAuth ? <Nav.Link style={{ fontSize: "12px" }} onClick={handleLogout}>로그아웃</Nav.Link>
                : <Nav.Link style={{ fontSize: "12px" }} onClick={() => dispatch(handleShow())}>로그인</Nav.Link>
              } */}

              {isAuth ? (
                <>
                  <Nav.Link style={{ fontSize: "12px" }} href={`/boardtest`}>보드 test</Nav.Link>
                  <Nav.Link style={{ fontSize: "12px" }} href={`/`} onClick={logout}>로그아웃</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link style={{ fontSize: "12px" }} href={`/boardtest1`}>로그인 전 보드 test</Nav.Link>

                  <Nav.Link style={{ fontSize: "12px" }} href={`/boardtest`}>로그인 후 보드 test</Nav.Link>
                  <Nav.Link style={{ fontSize: "12px" }} onClick={() => dispatch(handleShow())}>로그인 test</Nav.Link>
                  {/* <Nav.Link href="/sign-up" style={{ fontSize: "12px" }}>회원가입</Nav.Link> */}
                </>
              )}
              {/* <Nav.Link eventKey={2} href="#memes">
                <IoIosBasket />
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>

      </Navbar>
      <LoginModal />

    </>
  );
}




export default Header;