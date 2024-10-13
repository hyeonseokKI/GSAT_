import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  token: null,
};

// Slice 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload; // payload를 통해 토큰을 설정
    },
  },
});

// 액션과 리듀서 내보내기
export const { setToken } = authSlice.actions;
export default authSlice.reducer;
