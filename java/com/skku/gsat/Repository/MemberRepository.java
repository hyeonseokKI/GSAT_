package com.skku.gsat.Repository;

import com.skku.gsat.Member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUsername(String username);
    Optional<Member> findByUserID(String userID);
    //사용자 이름 중복
    boolean existsByUsername(String username);


}
