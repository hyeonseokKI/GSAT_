package com.skku.gsat.Member;

import com.skku.gsat.Repository.MemberRepository;
import io.jsonwebtoken.Jwt;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {

    private final MemberRepository memberRepository;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestBody Map<String, String> request){
        String username = request.get("username");
        if (memberRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Username already exists"));
        }
        return ResponseEntity.ok("Username is available");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request){
        String username = request.get("username");
        String email = request.get("email");
        String password = request.get("password");
        String confirmPassword = request.get("confirmPassword");

        Member member = new Member();
        member.setUsername(username);
        member.setEmail(email);
        member.setPassword(password);

        memberRepository.save(member);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginJWT(@RequestBody Map<String, String> request, HttpServletResponse response){
        //수동 로그인 구현

        String username = request.get("username");
        String password = request.get("password");
        //System.out.println(username + " " + password);

        var authToken = new UsernamePasswordAuthenticationToken(
                request.get("username"), request.get("password")
        );
        var auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var auth2 = SecurityContextHolder.getContext().getAuthentication();
        //현재 로그인 데이터에는 username, password만 있음.
        // createToken으로 jwt 토큰에 다양한 유저 정보를 적어줌
        var jwt = JwtUtil.createToken(auth2);
        //System.out.println("jwt is : " + jwt);
        //System.out.println("auth is : " + auth.getPrincipal());


        //jwt를 쿠키를 이용해서 저장해둠
        var cookie = new Cookie("jwt", jwt);
        cookie.setMaxAge(10000);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        //System.out.println("cookie is : " + cookie);
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutJWT(HttpServletResponse response){
        SecurityContextHolder.getContext().setAuthentication(null);
        var cookie = new Cookie("jwt", null);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/board")
    public ResponseEntity<?> getBoard(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        var jwtCookie = "";
        for(int i = 0; i < cookies.length; i++){
            if(cookies[i].getName().equals("jwt")){
                jwtCookie = cookies[i].getValue();
            }
        }

        return ResponseEntity.ok(Map.of("token", jwtCookie));
    }


}

