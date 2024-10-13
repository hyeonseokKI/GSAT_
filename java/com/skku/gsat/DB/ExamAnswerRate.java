package com.skku.gsat.DB;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class ExamAnswerRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long examID;

    private Float q1;
    private Float q2;
    private Float q3;
    private Float q4;
    private Float q5;
    private Float q6;
    private Float q7;
    private Float q8;
    private Float q9;
    private Float q10;
    private Float q11;
    private Float q12;
    private Float q13;
    private Float q14;
    private Float q15;
    private Float q16;
    private Float q17;
    private Float q18;
    private Float q19;
    private Float q20;
    private Float q21;
    private Float q22;
    private Float q23;
    private Float q24;
    private Float q25;
    private Float q26;
    private Float q27;
    private Float q28;
    private Float q29;
    private Float q30;
    private Float q31;
    private Float q32;
    private Float q33;
    private Float q34;
    private Float q35;
    private Float q36;
    private Float q37;
    private Float q38;
    private Float q39;
    private Float q40;
    private Float q41;
    private Float q42;
    private Float q43;
    private Float q44;
    private Float q45;
    private Float q46;
    private Float q47;
    private Float q48;
    private Float q49;
    private Float q50;

}
