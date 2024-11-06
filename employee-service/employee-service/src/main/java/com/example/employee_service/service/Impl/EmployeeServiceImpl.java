package com.example.employee_service.service.Impl;

import com.example.employee_service.entity.Employee;
import com.example.employee_service.repository.EmployeeRepository;
import com.example.employee_service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return (List<Employee>) employeeRepository.findAll();
    }

    @Override
    public Employee getEmployeeById(UUID empId) {
        return employeeRepository.findById(empId).get();
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public String deleteEmployee(Employee employee) {

                employeeRepository.delete(employee);
                return "employee is deleted successfully"+employee.getEmpId();

    }
}
