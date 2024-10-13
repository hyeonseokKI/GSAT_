// import logo from './logo.svg';
import './App.css';

import {Routes, Route, useLocation} from "react-router-dom";
import React from "react";


import Header from "./components/Header.js";
import SignUp from "./pages/Sign-up/SignUp.js";
import Footer from "./components/Footer.js";
import BoardList from "./pages/Board-list/BoardList.js";
import About from "./pages/About.js";
import Home from "./pages/Home/Home.js";
import SignInAfter from "./pages/SignInAfter/SignInAfter.js";
import Board from './pages/Board/Board.js';
import PdfViewer from './pages/PdfViewer.js';


import QuestionAdd from './pages/Question-add/QuestionAdd.js';
import QuestionList from './pages/Question-add/QuestionList.js';
import QuestionDetail from './pages/Question-add/QuestionDetail.js';
import Profile from './pages/Profile.js';

//test
import Register from './pages/Sign-up/Register.js';
import Login from './PageTest/login.js'
import BoardTestComponent from './PageTest/BoardTestComponent.js'
import PrivateRoute from './routes/PrivateRoute.js';
function App() {

  // const file = 'test.pdf';
  // console.log(process.env.PUBLIC_URL )
  const location = useLocation();

  return (
    <>
        <React.Fragment>

      <div className="App">
        <Header />


        <Routes>
        <Route path="/" element={<Home/>}/>

          <Route path="/logintest" element={<Login />} />
          <Route path="/boardtest" element={<BoardTestComponent />} />
          <Route  path="/boardtest1" element={
            <PrivateRoute path={`${location.pathname}`} component={BoardTestComponent}/>
          }
        />
          <Route path="/sign-up" element={<Register/>} />
          {/* <Route path="/sign-up" element={<SignUp/>}/> */}

          <Route path="/board-list" element={<BoardList />} />
          <Route path="/about" element={<About />} />
          <Route path="/signinafter" element={<SignInAfter />} />
          <Route path="/board-list/:id" element={<Board />} />


          <Route path="/pdf-test/" element={<PdfViewer />} />
          <Route path="/pdf-test/:testType" element={<PdfViewer />} />


          <Route path="/question-list" element={<><QuestionList /></>} />
          <Route path="/question-list/:qid" element={<QuestionDetail />} />
          <Route path="/question-add" element={<QuestionAdd />} />
          <Route path="member/user/:userId" element={<Profile />} />
        </Routes>
        {/* <SignUp/> */}
        {/* <div className='main-bg'/> */}


        {/* <LoginModal handleShow={handleShow} show={show} handleClose={handleClose}    /> */}

        <br />


        <Footer />
      </div>
      </React.Fragment>
    </>
  )
}


export default App;
