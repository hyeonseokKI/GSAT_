package com.skku.gsat.Repository;

import com.skku.gsat.DB.ExamAccess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamAccessRepository extends JpaRepository<ExamAccess, Long> {
    boolean existsByUserIDAndExamID(String userID, String examID);
}
