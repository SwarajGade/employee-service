package com.example.employee_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name = "employee", schema = "emp")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
   @Column(name = "empId")
    private UUID empId;
    @Column(name = "name")
    private String name;
    @Column(name = "manager")
    private String manager;
    @Column(name = "salary")
    private  Integer salary;

}
