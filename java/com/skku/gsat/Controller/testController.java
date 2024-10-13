package com.skku.gsat.Controller;

import com.skku.gsat.CustomUser;
import com.skku.gsat.Member.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class testController {
    @GetMapping("/my-page/jwt")
    @ResponseBody
    String myPageJWT(Authentication auth) {
        if (auth == null || auth.getPrincipal() == null || auth.getPrincipal().equals("anonymousUser")) {
            throw new RuntimeException("Unauthorized access");
        }

        var user = (CustomUser) auth.getPrincipal();
        System.out.println(user);
        System.out.println(user.getDisplayName());
        System.out.println(user.getUserID());
        System.out.println(user.getEmail());
        System.out.println(user.getAuthorities());
        return "마이페이지데이터";

    }

}
