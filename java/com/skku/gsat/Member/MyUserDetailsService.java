package com.skku.gsat.Member;

import com.skku.gsat.CustomUser;
import com.skku.gsat.Repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        var result = memberRepository.findByUserID(username);

        System.out.println("finding user...");
        if (result.isEmpty()) {
            System.out.println("no user found");
            throw new UsernameNotFoundException("No such username");
        }
        var user = result.get();
        System.out.println("user found!");
        List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
        if (user.getUserID().equals("donggun") || user.getUserID().equals("sunyeong") || user.getUserID().equals("hyeonsuk")) {
            grantedAuthorities.add(new SimpleGrantedAuthority("admin"));
        } else {
            grantedAuthorities.add(new SimpleGrantedAuthority("user"));
        }
        var customUser = new CustomUser(user.getUsername(), user.getPassword(), grantedAuthorities);
        customUser.setDisplayName(user.getUsername());
        customUser.setEmail(user.getEmail());
        customUser.setSex(user.getSex());
        customUser.setCompany(user.getCompany());
        customUser.setId(user.getId());
        customUser.setUserID(user.getUserID());
        customUser.setPhoneNO(user.getPhoneNO());
        customUser.setPoint(user.getPoint());
        return customUser;
    }
}
