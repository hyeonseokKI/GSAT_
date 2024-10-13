package com.skku.gsat.Member;

import com.skku.gsat.CustomUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtil {
    static final SecretKey key =
            Keys.hmacShaKeyFor(Decoders.BASE64.decode(//12번
                    "tlfflzhsqoffl123tlfflzhsqoffl123tlfflzhsqoffl123tlfflzhsqoffl123" +
                            "tlfflzhsqoffl123tlfflzhsqoffl123tlfflzhsqoffl123tlfflzhsqoffl123" +
                            "tlfflzhsqoffl123tlfflzhsqoffl123tlfflzhsqoffl123tlfflzhsqoffl123"
            ));

    // JWT 만들어주는 함수
    public static String createToken(Authentication auth) {
        System.out.println(auth.getPrincipal());
        CustomUser user = (CustomUser) auth.getPrincipal();
        String authorities = auth.getAuthorities().stream()
                .map(a->a.getAuthority()).collect(Collectors.joining(","));
        String jwt = Jwts.builder()
                .claim("username", user.getUsername())//username이랑 displayname이랑 같음
                .claim("displayName", user.getDisplayName())
                .claim("email", user.getEmail())
                .claim("point", user.getPoint())
                .claim("id", user.getId())
                .claim("company", user.getCompany())
                .claim("phoneNO", user.getPhoneNO())
                .claim("authority", authorities)
                .claim("userID", user.getUserID())
                .claim("sex", user.getSex())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 10000000)) //유효기간 10000초
                .signWith(key)
                .compact();
        return jwt;
    }

    // JWT 까주는 함수
    public static Claims extractToken(String token) {
        Claims claims = Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload();
        return claims;
    }
}
