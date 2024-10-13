package com.skku.gsat.Report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findById(Long id);

    @Query(value = "SELECT * FROM service.report WHERE MATCH(title) AGAINST(?1)",  nativeQuery = true)
    List<Report> fullTextReportSearch(String text);
}
