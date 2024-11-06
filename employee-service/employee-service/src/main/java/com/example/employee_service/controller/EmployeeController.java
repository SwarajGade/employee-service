package com.example.employee_service.controller;

import com.example.employee_service.entity.Employee;
import com.example.employee_service.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(maxAge = 3360)
@Controller
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees(){
        return  ResponseEntity.ok(employeeService.getAllEmployees());
    }
    @GetMapping("/employees/{empId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("empId") UUID empId){
        return  ResponseEntity.ok(employeeService.getEmployeeById(empId));
    }
    @PostMapping("/employees")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        return  ResponseEntity.ok(employeeService.addEmployee(employee));
    }
    @PatchMapping("/employees/{empId}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee , @PathVariable ( "empId") UUID empId){
        Employee empObj =employeeService.getEmployeeById(empId);
        if (empObj!=null){
            empObj.setName(employee.getName());
            empObj.setManager(employee.getManager());
            empObj.setSalary(employee.getSalary());
        }
        return  ResponseEntity.ok(employeeService.updateEmployee(employee));
    }
    @DeleteMapping("/employees/{empId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable ( "empId") UUID empId){
        Employee empObj=employeeService.getEmployeeById(empId);
        String deleteMsg=null;
        if(empObj!=null){
            deleteMsg=employeeService.deleteEmployee(empObj);
        }
        return ResponseEntity.ok(deleteMsg);
    }
}
