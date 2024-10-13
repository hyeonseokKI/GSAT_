package com.skku.gsat.Repository;

import com.skku.gsat.DB.ExamAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExamAnswerRepository extends JpaRepository<ExamAnswer, Long> {
    Optional<ExamAnswer> findByExamID(Long examID);

}
