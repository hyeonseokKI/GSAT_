package com.skku.gsat.Controller;

import com.skku.gsat.CustomUser;
import com.skku.gsat.DB.ExamAnswer;
import com.skku.gsat.DB.InferExamResult;
import com.skku.gsat.DB.MathExamResult;
import com.skku.gsat.Repository.ExamAnswerRepository;
import com.skku.gsat.Repository.InferExamResultRepository;
import com.skku.gsat.Repository.MathExamResultRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class ExamResultController {

    //examId 전달 받기
    //userID 불러 오기
    Long examID = 1111L;
    Long userID = 1111L;

    private final ExamAnswerRepository examAnswerRepository;
    private final MathExamResultRepository mathExamResultRepository;
    private final InferExamResultRepository inferExamResultRepository;


    //Pathvariable로 examID 받아오기 /submit-exma/{examID} 이런 식으로
    @PostMapping("/submit-exam")
    public ResponseEntity<String> submitExam(@RequestBody Map<String, Object> submitAnswer,
                                             Authentication auth){
        List<Integer> selectedOptions = (List<Integer>) submitAnswer.get("incrementedOptions");
        String testType = (String) submitAnswer.get("testType");
        CustomUser customUser = (CustomUser) auth.getPrincipal();

        Optional<ExamAnswer> examAnswerOptional = examAnswerRepository.findByExamID(examID);
        ExamAnswer examAnswer = examAnswerOptional.get();


        if(testType.equals("1")){

            MathExamResult result = new MathExamResult();
            result.setExamID(examID);
            result.setUserID(customUser.getId());

            result.setQ1(selectedOptions.get(0));
            result.setQ2(selectedOptions.get(1));
            result.setQ3(selectedOptions.get(2));
            result.setQ4(selectedOptions.get(3));
            result.setQ5(selectedOptions.get(4));
            result.setQ6(selectedOptions.get(5));
            result.setQ7(selectedOptions.get(6));
            result.setQ8(selectedOptions.get(7));
            result.setQ9(selectedOptions.get(8));
            result.setQ10(selectedOptions.get(9));
            result.setQ11(selectedOptions.get(10));
            result.setQ12(selectedOptions.get(11));
            result.setQ13(selectedOptions.get(12));
            result.setQ14(selectedOptions.get(13));
            result.setQ15(selectedOptions.get(14));
            result.setQ16(selectedOptions.get(15));
            result.setQ17(selectedOptions.get(16));
            result.setQ18(selectedOptions.get(17));
            result.setQ19(selectedOptions.get(18));
            result.setQ20(selectedOptions.get(19));


            result.setCorrect1(examAnswer.getQ1().equals(selectedOptions.get(0)));
            result.setCorrect2(examAnswer.getQ2().equals(selectedOptions.get(1)));
            result.setCorrect3(examAnswer.getQ3().equals(selectedOptions.get(2)));
            result.setCorrect4(examAnswer.getQ4().equals(selectedOptions.get(3)));
            result.setCorrect5(examAnswer.getQ5().equals(selectedOptions.get(4)));
            result.setCorrect6(examAnswer.getQ6().equals(selectedOptions.get(5)));
            result.setCorrect7(examAnswer.getQ7().equals(selectedOptions.get(6)));
            result.setCorrect8(examAnswer.getQ8().equals(selectedOptions.get(7)));
            result.setCorrect9(examAnswer.getQ9().equals(selectedOptions.get(8)));
            result.setCorrect10(examAnswer.getQ10().equals(selectedOptions.get(9)));
            result.setCorrect11(examAnswer.getQ11().equals(selectedOptions.get(10)));
            result.setCorrect12(examAnswer.getQ12().equals(selectedOptions.get(11)));
            result.setCorrect13(examAnswer.getQ13().equals(selectedOptions.get(12)));
            result.setCorrect14(examAnswer.getQ14().equals(selectedOptions.get(13)));
            result.setCorrect15(examAnswer.getQ15().equals(selectedOptions.get(14)));
            result.setCorrect16(examAnswer.getQ16().equals(selectedOptions.get(15)));
            result.setCorrect17(examAnswer.getQ17().equals(selectedOptions.get(16)));
            result.setCorrect18(examAnswer.getQ18().equals(selectedOptions.get(17)));
            result.setCorrect19(examAnswer.getQ19().equals(selectedOptions.get(18)));
            result.setCorrect20(examAnswer.getQ20().equals(selectedOptions.get(19)));

            int score = 0;

            if (result.getCorrect1() != null && result.getCorrect1()) score++;
            if (result.getCorrect2() != null && result.getCorrect2()) score++;
            if (result.getCorrect3() != null && result.getCorrect3()) score++;
            if (result.getCorrect4() != null && result.getCorrect4()) score++;
            if (result.getCorrect5() != null && result.getCorrect5()) score++;
            if (result.getCorrect6() != null && result.getCorrect6()) score++;
            if (result.getCorrect7() != null && result.getCorrect7()) score++;
            if (result.getCorrect8() != null && result.getCorrect8()) score++;
            if (result.getCorrect9() != null && result.getCorrect9()) score++;
            if (result.getCorrect10() != null && result.getCorrect10()) score++;
            if (result.getCorrect11() != null && result.getCorrect11()) score++;
            if (result.getCorrect12() != null && result.getCorrect12()) score++;
            if (result.getCorrect13() != null && result.getCorrect13()) score++;
            if (result.getCorrect14() != null && result.getCorrect14()) score++;
            if (result.getCorrect15() != null && result.getCorrect15()) score++;
            if (result.getCorrect16() != null && result.getCorrect16()) score++;
            if (result.getCorrect17() != null && result.getCorrect17()) score++;
            if (result.getCorrect18() != null && result.getCorrect18()) score++;
            if (result.getCorrect19() != null && result.getCorrect19()) score++;
            if (result.getCorrect20() != null && result.getCorrect20()) score++;



            result.setMathScore(score);
            mathExamResultRepository.save(result);
        } else {

            InferExamResult result = new InferExamResult();
            result.setExamID(examID);
            result.setUserID(userID);

            result.setQ1(selectedOptions.get(0));
            result.setQ2(selectedOptions.get(1));
            result.setQ3(selectedOptions.get(2));
            result.setQ4(selectedOptions.get(3));
            result.setQ5(selectedOptions.get(4));
            result.setQ6(selectedOptions.get(5));
            result.setQ7(selectedOptions.get(6));
            result.setQ8(selectedOptions.get(7));
            result.setQ9(selectedOptions.get(8));
            result.setQ10(selectedOptions.get(9));
            result.setQ11(selectedOptions.get(10));
            result.setQ12(selectedOptions.get(11));
            result.setQ13(selectedOptions.get(12));
            result.setQ14(selectedOptions.get(13));
            result.setQ15(selectedOptions.get(14));
            result.setQ16(selectedOptions.get(15));
            result.setQ17(selectedOptions.get(16));
            result.setQ18(selectedOptions.get(17));
            result.setQ19(selectedOptions.get(18));
            result.setQ20(selectedOptions.get(19));
            result.setQ21(selectedOptions.get(20));
            result.setQ22(selectedOptions.get(21));
            result.setQ23(selectedOptions.get(22));
            result.setQ24(selectedOptions.get(23));
            result.setQ25(selectedOptions.get(24));
            result.setQ26(selectedOptions.get(25));
            result.setQ27(selectedOptions.get(26));
            result.setQ28(selectedOptions.get(27));
            result.setQ29(selectedOptions.get(28));
            result.setQ30(selectedOptions.get(29));

            result.setCorrect1(selectedOptions.get(0).equals(examAnswer.getQ1()));
            result.setCorrect2(selectedOptions.get(1).equals(examAnswer.getQ2()));
            result.setCorrect3(selectedOptions.get(2).equals(examAnswer.getQ3()));
            result.setCorrect4(selectedOptions.get(3).equals(examAnswer.getQ4()));
            result.setCorrect5(selectedOptions.get(4).equals(examAnswer.getQ5()));
            result.setCorrect6(selectedOptions.get(5).equals(examAnswer.getQ6()));
            result.setCorrect7(selectedOptions.get(6).equals(examAnswer.getQ7()));
            result.setCorrect8(selectedOptions.get(7).equals(examAnswer.getQ8()));
            result.setCorrect9(selectedOptions.get(8).equals(examAnswer.getQ9()));
            result.setCorrect10(selectedOptions.get(9).equals(examAnswer.getQ10()));
            result.setCorrect11(selectedOptions.get(10).equals(examAnswer.getQ11()));
            result.setCorrect12(selectedOptions.get(11).equals(examAnswer.getQ12()));
            result.setCorrect13(selectedOptions.get(12).equals(examAnswer.getQ13()));
            result.setCorrect14(selectedOptions.get(13).equals(examAnswer.getQ14()));
            result.setCorrect15(selectedOptions.get(14).equals(examAnswer.getQ15()));
            result.setCorrect16(selectedOptions.get(15).equals(examAnswer.getQ16()));
            result.setCorrect17(selectedOptions.get(16).equals(examAnswer.getQ17()));
            result.setCorrect18(selectedOptions.get(17).equals(examAnswer.getQ18()));
            result.setCorrect19(selectedOptions.get(18).equals(examAnswer.getQ19()));
            result.setCorrect20(selectedOptions.get(19).equals(examAnswer.getQ20()));
            result.setCorrect21(selectedOptions.get(20).equals(examAnswer.getQ21()));
            result.setCorrect22(selectedOptions.get(21).equals(examAnswer.getQ22()));
            result.setCorrect23(selectedOptions.get(22).equals(examAnswer.getQ23()));
            result.setCorrect24(selectedOptions.get(23).equals(examAnswer.getQ24()));
            result.setCorrect25(selectedOptions.get(24).equals(examAnswer.getQ25()));
            result.setCorrect26(selectedOptions.get(25).equals(examAnswer.getQ26()));
            result.setCorrect27(selectedOptions.get(26).equals(examAnswer.getQ27()));
            result.setCorrect28(selectedOptions.get(27).equals(examAnswer.getQ28()));
            result.setCorrect29(selectedOptions.get(28).equals(examAnswer.getQ29()));
            result.setCorrect30(selectedOptions.get(29).equals(examAnswer.getQ30()));

            result.setCorrect1(examAnswer.getQ1().equals(selectedOptions.get(0)));
            result.setCorrect2(examAnswer.getQ2().equals(selectedOptions.get(1)));
            result.setCorrect3(examAnswer.getQ3().equals(selectedOptions.get(2)));
            result.setCorrect4(examAnswer.getQ4().equals(selectedOptions.get(3)));
            result.setCorrect5(examAnswer.getQ5().equals(selectedOptions.get(4)));
            result.setCorrect6(examAnswer.getQ6().equals(selectedOptions.get(5)));
            result.setCorrect7(examAnswer.getQ7().equals(selectedOptions.get(6)));
            result.setCorrect8(examAnswer.getQ8().equals(selectedOptions.get(7)));
            result.setCorrect9(examAnswer.getQ9().equals(selectedOptions.get(8)));
            result.setCorrect10(examAnswer.getQ10().equals(selectedOptions.get(9)));
            result.setCorrect11(examAnswer.getQ11().equals(selectedOptions.get(10)));
            result.setCorrect12(examAnswer.getQ12().equals(selectedOptions.get(11)));
            result.setCorrect13(examAnswer.getQ13().equals(selectedOptions.get(12)));
            result.setCorrect14(examAnswer.getQ14().equals(selectedOptions.get(13)));
            result.setCorrect15(examAnswer.getQ15().equals(selectedOptions.get(14)));
            result.setCorrect16(examAnswer.getQ16().equals(selectedOptions.get(15)));
            result.setCorrect17(examAnswer.getQ17().equals(selectedOptions.get(16)));
            result.setCorrect18(examAnswer.getQ18().equals(selectedOptions.get(17)));
            result.setCorrect19(examAnswer.getQ19().equals(selectedOptions.get(18)));
            result.setCorrect20(examAnswer.getQ20().equals(selectedOptions.get(19)));
            result.setCorrect21(examAnswer.getQ21().equals(selectedOptions.get(20)));
            result.setCorrect22(examAnswer.getQ22().equals(selectedOptions.get(21)));
            result.setCorrect23(examAnswer.getQ23().equals(selectedOptions.get(22)));
            result.setCorrect24(examAnswer.getQ24().equals(selectedOptions.get(23)));
            result.setCorrect25(examAnswer.getQ25().equals(selectedOptions.get(24)));
            result.setCorrect26(examAnswer.getQ26().equals(selectedOptions.get(25)));
            result.setCorrect27(examAnswer.getQ27().equals(selectedOptions.get(26)));
            result.setCorrect28(examAnswer.getQ28().equals(selectedOptions.get(27)));
            result.setCorrect29(examAnswer.getQ29().equals(selectedOptions.get(28)));
            result.setCorrect30(examAnswer.getQ30().equals(selectedOptions.get(29)));
//
//            result.setCorrect1(selectedOptions.get(0).equals(examAnswer.getQ1()));
//            result.setCorrect2(selectedOptions.get(1).equals(examAnswer.getQ2()));
//            result.setCorrect3(selectedOptions.get(2).equals(examAnswer.getQ3()));
//            result.setCorrect4(selectedOptions.get(3).equals(examAnswer.getQ4()));
//            result.setCorrect5(selectedOptions.get(4).equals(examAnswer.getQ5()));
//            result.setCorrect6(selectedOptions.get(5).equals(examAnswer.getQ6()));
//            result.setCorrect7(selectedOptions.get(6).equals(examAnswer.getQ7()));
//            result.setCorrect8(selectedOptions.get(7).equals(examAnswer.getQ8()));
//            result.setCorrect9(selectedOptions.get(8).equals(examAnswer.getQ9()));
//            result.setCorrect10(selectedOptions.get(9).equals(examAnswer.getQ10()));
//            result.setCorrect11(selectedOptions.get(10).equals(examAnswer.getQ11()));
//            result.setCorrect12(selectedOptions.get(11).equals(examAnswer.getQ12()));
//            result.setCorrect13(selectedOptions.get(12).equals(examAnswer.getQ13()));
//            result.setCorrect14(selectedOptions.get(13).equals(examAnswer.getQ14()));
//            result.setCorrect15(selectedOptions.get(14).equals(examAnswer.getQ15()));
//            result.setCorrect16(selectedOptions.get(15).equals(examAnswer.getQ16()));
//            result.setCorrect17(selectedOptions.get(16).equals(examAnswer.getQ17()));
//            result.setCorrect18(selectedOptions.get(17).equals(examAnswer.getQ18()));
//            result.setCorrect19(selectedOptions.get(18).equals(examAnswer.getQ19()));
//            result.setCorrect20(selectedOptions.get(19).equals(examAnswer.getQ20()));
//            result.setCorrect21(selectedOptions.get(20).equals(examAnswer.getQ21()));
//            result.setCorrect22(selectedOptions.get(21).equals(examAnswer.getQ22()));
//            result.setCorrect23(selectedOptions.get(22).equals(examAnswer.getQ23()));
//            result.setCorrect24(selectedOptions.get(23).equals(examAnswer.getQ24()));
//            result.setCorrect25(selectedOptions.get(24).equals(examAnswer.getQ25()));
//            result.setCorrect26(selectedOptions.get(25).equals(examAnswer.getQ26()));
//            result.setCorrect27(selectedOptions.get(26).equals(examAnswer.getQ27()));
//            result.setCorrect28(selectedOptions.get(27).equals(examAnswer.getQ28()));
//            result.setCorrect29(selectedOptions.get(28).equals(examAnswer.getQ29()));
//            result.setCorrect30(selectedOptions.get(29).equals(examAnswer.getQ30()));



            int score = 0;
            if (result.getCorrect1() != null && result.getCorrect1()) score++;
            if (result.getCorrect2() != null && result.getCorrect2()) score++;
            if (result.getCorrect3() != null && result.getCorrect3()) score++;
            if (result.getCorrect4() != null && result.getCorrect4()) score++;
            if (result.getCorrect5() != null && result.getCorrect5()) score++;
            if (result.getCorrect6() != null && result.getCorrect6()) score++;
            if (result.getCorrect7() != null && result.getCorrect7()) score++;
            if (result.getCorrect8() != null && result.getCorrect8()) score++;
            if (result.getCorrect9() != null && result.getCorrect9()) score++;
            if (result.getCorrect10() != null && result.getCorrect10()) score++;
            if (result.getCorrect11() != null && result.getCorrect11()) score++;
            if (result.getCorrect12() != null && result.getCorrect12()) score++;
            if (result.getCorrect13() != null && result.getCorrect13()) score++;
            if (result.getCorrect14() != null && result.getCorrect14()) score++;
            if (result.getCorrect15() != null && result.getCorrect15()) score++;
            if (result.getCorrect16() != null && result.getCorrect16()) score++;
            if (result.getCorrect17() != null && result.getCorrect17()) score++;
            if (result.getCorrect18() != null && result.getCorrect18()) score++;
            if (result.getCorrect19() != null && result.getCorrect19()) score++;
            if (result.getCorrect20() != null && result.getCorrect20()) score++;
            if (result.getCorrect21() != null && result.getCorrect21()) score++;
            if (result.getCorrect22() != null && result.getCorrect22()) score++;
            if (result.getCorrect23() != null && result.getCorrect23()) score++;
            if (result.getCorrect24() != null && result.getCorrect24()) score++;
            if (result.getCorrect25() != null && result.getCorrect25()) score++;
            if (result.getCorrect26() != null && result.getCorrect26()) score++;
            if (result.getCorrect27() != null && result.getCorrect27()) score++;
            if (result.getCorrect28() != null && result.getCorrect28()) score++;
            if (result.getCorrect29() != null && result.getCorrect29()) score++;
            if (result.getCorrect30() != null && result.getCorrect30()) score++;

            result.setInferScore(score);
            inferExamResultRepository.save(result);
        }

        return ResponseEntity.ok("답안을 성공적으로 제출했습니다");
    }
}
