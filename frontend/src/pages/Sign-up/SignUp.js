import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './signup.css';

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, '아이디는 최소 2글자 이상입니다!')
    .max(20, '아이디는 최대 20글자입니다!')
    .matches(/^[a-zA-Z0-9]*$/, '아이디는 영문과 숫자만 가능합니다!')
    .required('아이디를 입력하세요!'),
  name: Yup.string().required('이름을 입력하세요!'),
  password: Yup.string()
    .min(8, '비밀번호는 최소 8자리 이상입니다!')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, '비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다!')
    .required('비밀번호를 입력하세요!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다!')
    .required('비밀번호 확인이 필요합니다!'),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, '전화번호는 10자리 또는 11자리 숫자만 가능합니다!')
    .required('전화번호를 입력하세요!'),
  company: Yup.string().required('가고 싶은 회사명을 선택하세요!'),
  gender: Yup.string().required('성별을 선택하세요!')
});

const SignUp = () => {
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const navigate = useNavigate();

  // Handle username availability check
  const checkUsername = async (username) => {
    try {
      const response = await axios.get(`/api/check-username/${username}`);
      setIsUsernameAvailable(response.data.available);
    } catch (error) {
      console.error(error);
      toast.error('아이디 중복 확인 오류가 발생했습니다!');
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const { username, name, password, phone, company, gender } = values;
    try {
      await axios.post('/api/auth/signup', {
        username,
        name,
        password,
        phone,
        company,
        gender
      });
      toast.success('회원가입이 완료되었습니다. 로그인 하세요!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(`회원가입 오류: ${error.response.data.message}`);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
        phone: '',
        company: '',
        gender: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur }) => (
        <div className="signup-wrapper">
          <ToastContainer />
          <Form autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">아이디</div>
                <Field
                  as={TextField}
                  name="username"
                  variant="outlined"
                  fullWidth
                  onBlur={() => checkUsername(values.username)}
                />
                <ErrorMessage name="username" component="div" className="error-message" />
                {isUsernameAvailable === true && <div className="availability-message">사용 가능한 아이디입니다.</div>}
                {isUsernameAvailable === false && <div className="availability-message error">이미 사용 중인 아이디입니다.</div>}
              </div>
              <div className="input-forms-item">
                <div className="input-label">이름</div>
                <Field
                  as={TextField}
                  name="name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호</div>
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호 확인</div>
                <Field
                  as={TextField}
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>
              <div className="input-forms-item">
                <div className="input-label">전화번호</div>
                <Field
                  as={TextField}
                  name="phone"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>
              <div className="input-forms-item">
                <div className="input-label">가고 싶은 회사</div>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>회사명</InputLabel>
                  <Field
                    as={Select}
                    name="company"
                    label="회사명"
                    onBlur={handleBlur}
                  >
                    <MenuItem value="삼성전자">삼성전자</MenuItem>
                    <MenuItem value="삼성물산">삼성물산</MenuItem>
                    <MenuItem value="삼성바이오">삼성바이오</MenuItem>
                  </Field>
                </FormControl>
                <ErrorMessage name="company" component="div" className="error-message" />
              </div>
              <div className="input-forms-item">
                <div className="input-label">성별</div>
                <Field as={RadioGroup} name="gender">
                  <FormControlLabel value="male" control={<Radio />} label="남성" />
                  <FormControlLabel value="female" control={<Radio />} label="여성" />
                </Field>
                <ErrorMessage name="gender" component="div" className="error-message" />
              </div>
              <Button color="primary" variant="contained" fullWidth type="submit">
                회원가입
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignUp;
