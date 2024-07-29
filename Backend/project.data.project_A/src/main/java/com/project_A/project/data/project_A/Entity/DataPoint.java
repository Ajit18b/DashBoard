package com.project_A.project.data.project_A.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "data_points")
public class DataPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private Long R01;
    private Long R02;
    private Long R03;
    private Long R04;
    private Long R05;
    private Long R06;
    private Long R07;
    private Long R08;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getR01() {
        return R01;
    }

    public void setR01(Long r01) {
        R01 = r01;
    }

    public Long getR02() {
        return R02;
    }

    public void setR02(Long r02) {
        R02 = r02;
    }

    public Long getR03() {
        return R03;
    }

    public void setR03(Long r03) {
        R03 = r03;
    }

    public Long getR04() {
        return R04;
    }

    public void setR04(Long r04) {
        R04 = r04;
    }

    public Long getR05() {
        return R05;
    }

    public void setR05(Long r05) {
        R05 = r05;
    }

    public Long getR06() {
        return R06;
    }

    public void setR06(Long r06) {
        R06 = r06;
    }

    public Long getR07() {
        return R07;
    }

    public void setR07(Long r07) {
        R07 = r07;
    }

    public Long getR08() {
        return R08;
    }

    public void setR08(Long r08) {
        R08 = r08;
    }
}