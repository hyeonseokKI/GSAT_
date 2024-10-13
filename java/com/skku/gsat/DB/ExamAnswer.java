package com.skku.gsat.DB;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
public class ExamAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long examID;

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
    private Integer q31;
    private Integer q32;
    private Integer q33;
    private Integer q34;
    private Integer q35;
    private Integer q36;
    private Integer q37;
    private Integer q38;
    private Integer q39;
    private Integer q40;
    private Integer q41;
    private Integer q42;
    private Integer q43;
    private Integer q44;
    private Integer q45;
    private Integer q46;
    private Integer q47;
    private Integer q48;
    private Integer q49;
    private Integer q50;

    
}
