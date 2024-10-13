package com.skku.gsat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
@Setter
@ToString
public class CustomUser extends User {
    private Long id;
    private String displayName;
    private String email;
    private String userID;
    private String company;
    private String phoneNO;
    private String sex;
    private Long point;

    public CustomUser(String username, String password, List<SimpleGrantedAuthority> authorities) {
        super(username, password, authorities);
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Cannot pass null or empty values to constructor");
        }
    }
}