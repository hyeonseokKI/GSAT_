package com.skku.gsat.DB;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;


@Entity
@ToString
@Getter
@Setter
public class InferExamResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userID;
    private Long examID;
    private Integer inferScore;

    private Integer q1;
    private Integer q2;
    private Integer q3;
    private Integer q4;
    private Integer q5;
    private Integer q6;
    private Integer q7;
    private Integer q8;
    private Integer q9;
    private Integer q10;
    private Integer q11;
    private Integer q12;
    private Integer q13;
    private Integer q14;
    private Integer q15;
    private Integer q16;
    private Integer q17;
    private Integer q18;
    private Integer q19;
    private Integer q20;
    private Integer q21;
    private Integer q22;
    private Integer q23;
    private Integer q24;
    private Integer q25;
    private Integer q26;
    private Integer q27;
    private Integer q28;
    private Integer q29;
    private Integer q30;


    private Boolean correct1;
    private Boolean correct2;
    private Boolean correct3;
    private Boolean correct4;
    private Boolean correct5;
    private Boolean correct6;
    private Boolean correct7;
    private Boolean correct8;
    private Boolean correct9;
    private Boolean correct10;
    private Boolean correct11;
    private Boolean correct12;
    private Boolean correct13;
    private Boolean correct14;
    private Boolean correct15;
    private Boolean correct16;
    private Boolean correct17;
    private Boolean correct18;
    private Boolean correct19;
    private Boolean correct20;
    private Boolean correct21;
    private Boolean correct22;
    private Boolean correct23;
    private Boolean correct24;
    private Boolean correct25;
    private Boolean correct26;
    private Boolean correct27;
    private Boolean correct28;
    private Boolean correct29;
    private Boolean correct30;

}
