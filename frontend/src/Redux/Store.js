import { configureStore,createSlice  } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage를 사용하기 위한 import


import questionReducer from './questionSlice.js';
import authReducer from './AuthReducer.js';


// Redux Persist 설정
const persistConfig = {
  key: 'auth', // 상태를 저장할 키
  storage, // 로컬 스토리지 사용
};

// authReducer를 persistReducer로 래핑
const persistedAuthReducer = persistReducer(persistConfig, authReducer);


//test 
// Create a slice with the initial state directly declared
const mockTestSlice = createSlice({
  name: 'mockTests',
  initialState: {
    mockTests: Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `삼성 모의고사 ${index + 1}`
    }))
  },
  reducers: {}
}); 


// Slice for login state and modal control
const loginHandleSlice = createSlice({
  name: 'loginHandle',
  initialState: {
    isModalOpen: false,
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    handleShow(state) {
      state.isModalOpen = true;
    },
    handleClose(state) {
      state.isModalOpen = false;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload; // Save JWT token
      localStorage.setItem('token', action.payload); // Save JWT token to localStorage
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token'); // Remove JWT token from localStorage
    },
    initializeLoginState(state) {
      const token = localStorage.getItem('token');
      state.isLoggedIn = !!token; // Check if token exists
      state.token = token;
    },
  },
});
// Export actions
export const { handleShow, handleClose, setLoggedIn, setLoggedOut, initializeLoginState } = loginHandleSlice.actions;



// Store 구성
const store = configureStore({
  reducer: {
    Auth: persistedAuthReducer, // persist된 authReducer
    mockTests: mockTestSlice.reducer,
    questions: questionReducer,
    loginHandle: loginHandleSlice.reducer, // 다른 슬라이스와 함께 리듀서 추가
  },
  devTools: process.env.NODE_ENV !== 'production', // 개발 모드에서만 Redux DevTools 활성화
});

// persistStore 객체 생성
export const persistor = persistStore(store);

export default store;

// export default configureStore({
//   reducer: { 
//     loginHandle : loginHandleSlice.reducer,
//     mockTests: mockTestSlice.reducer,
//     questions: questionReducer,


//   }
// }) 