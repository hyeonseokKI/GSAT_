import {jwtDecode} from 'jwt-decode'; // `jwt-decode` 패키지에서 default export 사용

export class jwtUtils {
  // 토큰 유효성 검사
  static isAuth(token) {
    if (!token) {
      return false;
    }
    try {
      const decoded = jwtDecode(token);
      // 현재 시간을 초 단위로 변환
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Token decoding error:', error);
      return false;
    }
  }

  // 토큰에서 유저 id 가져오기
  static getId(token) {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded)
      // `jti` 대신 `userId` 또는 다른 필드를 사용하세요
      return decoded.username || decoded.sub; // `userId` 또는 `sub` 등으로 수정
    } catch (error) {
      console.error('Token decoding error:', error);
      return undefined;
    }
  }
}
