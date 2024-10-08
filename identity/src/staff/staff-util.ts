export  class StaffUtil {


 /**
  * employeeTree
  */
 public static employeeTree(data, parentPath = "") {
        const flattenedEmployees = [];
      
        for (const employee of data.employees) {
          const currentPath = parentPath ? `${parentPath}.` : "";
          const flattenedEmployee = { ...employee }; // Create a copy to avoid modifying the original
      
          // Remove unnecessary properties
          delete flattenedEmployee.employees;
      
          // Add path information
          console.log(data.id);
          
            flattenedEmployee.managerId = currentPath? `${currentPath}${employee.id}`:`${data.id}` ;
      
          flattenedEmployees.push(flattenedEmployee);
      
          // Recursively flatten nested employees
          if (employee.employees && employee.employees.length > 0) {
            flattenedEmployees.push(...this.employeeTree(employee, `${currentPath}${employee.id}`));
          }
        }
      
        return flattenedEmployees;
      }
      
 }

