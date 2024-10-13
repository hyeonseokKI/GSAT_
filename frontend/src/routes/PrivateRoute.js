import React from "react";
import { Navigate  } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtUtils } from "../utils/jwtUtils";

const PrivateRoute = ({ component: RouteComponent, path }) => {
  const token = useSelector((state) => state.Auth.token);

  // 사용자 ID 가져오기 (로그인된 경우에만)
  const userId = jwtUtils.isAuth(token) ? jwtUtils.getId(token) : null;
  
  if (!jwtUtils.isAuth(token)) {
    alert("로그인이 필요한 페이지입니다");
    return <Navigate to={`/logintest?redirectUrl=${path}`} />
    ;
  }

  // 컴포넌트에 userId를 props로 전달
  return <RouteComponent userId={userId} />;
};

export default PrivateRoute;