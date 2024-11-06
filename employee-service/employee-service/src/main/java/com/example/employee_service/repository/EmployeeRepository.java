package com.example.employee_service.repository;

import com.example.employee_service.entity.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee , UUID> {

}
