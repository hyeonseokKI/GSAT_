package com.skku.gsat.Report;

import com.skku.gsat.CustomUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.lang.Long.parseLong;

@Controller
@RequiredArgsConstructor
public class ReportController {
    private final ReportRepository reportRepository;
    private final S3Service s3Service;
    private final ReportLikeUserRepository likeUserRepository;


    @GetMapping("/reports")
    @ResponseBody
    public List<Report> questionlist() {
        return reportRepository.findAll();
    }

    @PostMapping("/presignedurl")
    @ResponseBody
    public Map<String, String> getPresignedUrl(@RequestBody Map<String, String> request) {
        String filename = request.get("filename");
        System.out.println("filename : " + filename);
        String url = s3Service.createPresignedUrl("test/" + filename);
        System.out.println("url : " + url);
        return Map.of("url", url);
    }

    @PostMapping("/reportadd")
    @ResponseBody
    public String reportadd(
            @RequestBody Map<String, String> request,
            Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        System.out.println(auth.getPrincipal());
        String username = customUser.getUserID();

        Report report = new Report();
        report.setAuthor(username);
        report.setContent((String) request.get("content"));
        report.setTitle((String) request.get("title"));
        report.setViews(parseLong(request.get("views")));
        report.setLikes(parseLong(request.get("likes")));
        String fileUrl = request.get("fileURL");
        String url = null;
        if (fileUrl != null && !fileUrl.isEmpty()) {
            report.setImageURL(fileUrl);
        }
        report.setCreatedDate(LocalDateTime.now());
        reportRepository.save(report);

        return url;
    }

    //현석이가 검색 버튼 구현하면 @RequestBody 변수 추가
    @GetMapping("/reportsearch/{text}")
    @ResponseBody
    public List<Report> reportSearch(@PathVariable String text){
        //String text = request.get("text");
        return reportRepository.fullTextReportSearch(text);
    }


    @DeleteMapping("/question-list/{id}")
    @ResponseBody
    public void deleteReport(@PathVariable Long id) {
        reportRepository.deleteById(id);
        return;
    }

    //문제 상황 : question-list/{id} 창에서 좋아요를 누르면 무지성으로 좋아요가 올라감 -> 확인하는 로직이 필요함
    @PostMapping("question-list/{id}/like")
    @ResponseBody
    public boolean likeReport(@PathVariable Long id, Authentication auth) {
        CustomUser customUser = (CustomUser) auth.getPrincipal();
        Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));

        List <ReportLikeUser> likeUsersList = likeUserRepository.findAll();
        for(ReportLikeUser likeUser : likeUsersList){
            if(likeUser.getUsername().equals(customUser.getUsername())){
                report.setLikes(report.getLikes() - 1);
                likeUserRepository.delete(likeUser);
                reportRepository.save(report);
                return true;
                //좋아요 1개 감소
            }
        }

        report.setLikes(report.getLikes() + 1);
        ReportLikeUser reportLikeUser = new ReportLikeUser();
        reportLikeUser.setUsername(customUser.getUsername());
        reportLikeUser.setReportId(id);
        likeUserRepository.save(reportLikeUser);
        reportRepository.save(report);
        return false;
        //좋아요 1개 증가
    }

    @PutMapping("question-list/{id}")
    @ResponseBody
    public void updateReport(@PathVariable Long id, @RequestBody Report request) {
        Report report = reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
        report.setTitle(request.getTitle());
        report.setContent(request.getContent());
        reportRepository.save(report);
        return;
    }

    @GetMapping("question-list/{id}")
    @ResponseBody
    public Report updateView(@PathVariable Long id){
        Report report = reportRepository.findById(id).orElseThrow(()->new RuntimeException("Report not found"));
        report.setViews(report.getViews() + 1);
        System.out.println(report.getViews());
        reportRepository.save(report);
        return report;
    }

    @GetMapping("question-list/{id}/detail")
    @ResponseBody
    public Report getReport(@PathVariable Long id) {
        System.out.println(reportRepository.findById(id));
        return reportRepository.findById(id).orElseThrow(() -> new RuntimeException("Report not found"));
    }

}
