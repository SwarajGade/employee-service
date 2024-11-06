package com.example.employee_service.service;

import com.example.employee_service.entity.Employee;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {

    List<Employee> getAllEmployees();

    Employee getEmployeeById(UUID empId);

    Employee addEmployee(Employee employee);

    Employee updateEmployee(Employee employee);

    String deleteEmployee(Employee employee);

}
