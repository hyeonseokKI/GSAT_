package com.skku.gsat.Member;

import com.skku.gsat.CustomUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Component
public class JwtFilter extends OncePerRequestFilter {

    // 소수점을 포함한 숫자 문자열을 long 형태로 변환
    private long convertToLong(String numberStr) {
        if (numberStr.contains(".")) {
            return Long.parseLong(numberStr.substring(0, numberStr.indexOf('.')));
        } else {
            return Long.parseLong(numberStr);
        }
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        //요청들어올때마다 실행할코드~~
        Cookie[] cookies = request.getCookies();
        if(cookies == null) {
            filterChain.doFilter(request, response);
            System.out.println("exiting... cause no cookie");
            return;
        }

        String jwtCookie = "";
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("jwt")) {
                jwtCookie = cookie.getValue();
                break;
            }
        }

        if (jwtCookie.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        Claims claim;
        try{
            claim = JwtUtil.extractToken(jwtCookie);
        }catch (Exception e){
            System.out.println("validation expired or something went wrong!!");
            filterChain.doFilter(request, response);
            return;
        }
        var arr = claim.get("authority").toString().split(",");
        var authorities = Arrays.stream(arr)
                .map(a -> new SimpleGrantedAuthority(a)).toList();
//        System.out.println("result " + claim.get("username").toString());
//        System.out.println(claim.get("username").toString());
//        System.out.println(claim.get("id").toString());
//        System.out.println(claim.get("point").toString());
//        System.out.println(claim.get("sex").toString());
//        System.out.println(claim.get("displayName").toString());
//        System.out.println(claim.get("company").toString());
//        System.out.println(claim.get("phoneNO").toString());
//        System.out.println(authorities);
//        System.out.println(claim.get("authority").toString());
        var customUser = new CustomUser(claim.get("username").toString(), "password", authorities);
        customUser.setDisplayName(claim.get("displayName").toString());
        customUser.setEmail(claim.get("email").toString());
        customUser.setId(convertToLong(claim.get("id").toString()));
        customUser.setCompany(claim.get("company").toString());
        customUser.setPoint(convertToLong(claim.get("point").toString()));
        customUser.setUserID(claim.get("userID").toString());
        customUser.setSex(claim.get("sex").toString());
        customUser.setPhoneNO(claim.get("phoneNO").toString());


        var authToken = new UsernamePasswordAuthenticationToken(
                customUser,
                null,
                authorities
        );
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);


    }

}