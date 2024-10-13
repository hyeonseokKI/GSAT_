package com.skku.gsat.Controller;

import com.skku.gsat.CustomUser;
import com.skku.gsat.DB.ExamAccess;
import com.skku.gsat.Repository.ExamAccessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class ExamAccessController {
    private final ExamAccessRepository examAccessRepository;

    @PostMapping("/addExamCart")
    public ResponseEntity<?> addExamCart(@RequestBody Map<String, String> request,
                                         Authentication auth){
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        String examID = request.get("examID");

        if (examAccessRepository.existsByUserIDAndExamID(customUser.getUserID(),examID)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Exam already exists"));
        }
        ExamAccess examAccess = new ExamAccess();
        examAccess.setExamID(examID);
        examAccess.setUserID(customUser.getUserID());
        examAccessRepository.save(examAccess);

        return ResponseEntity.ok("Add the exam");
    }

}
