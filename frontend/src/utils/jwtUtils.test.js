import jwtDecode from 'jwt-decode';
import { jwtUtils } from './jwtUtils'; // 경로를 실제 파일 위치에 맞게 수정

describe('jwtUtils', () => {
  const validToken = jwtDecode({
    exp: Math.floor(Date.now() / 1000) + 3600, // 유효한 토큰, 현재 시간 + 1시간
    jti: '12345' // 임의의 사용자 ID
  });
  const expiredToken = jwtDecode({
    exp: Math.floor(Date.now() / 1000) - 3600, // 만료된 토큰, 현재 시간 - 1시간
    jti: '67890' // 임의의 사용자 ID
  });

  test('isAuth should return true for valid token', () => {
    expect(jwtUtils.isAuth(validToken)).toBe(true);
  });

  test('isAuth should return false for expired token', () => {
    expect(jwtUtils.isAuth(expiredToken)).toBe(false);
  });

  test('getId should return the correct user id', () => {
    expect(jwtUtils.getId(validToken)).toBe('12345');
    expect(jwtUtils.getId(expiredToken)).toBe('67890');
  });

  test('isAuth should return false for no token', () => {
    expect(jwtUtils.isAuth(null)).toBe(false);
    expect(jwtUtils.isAuth(undefined)).toBe(false);
  });
});
