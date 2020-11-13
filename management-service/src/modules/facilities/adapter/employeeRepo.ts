import { Employee } from '../domain';
import { EmployeeEntity } from '../infra/entities';

export interface EmployeeRepo {
  exists(employeeId: string): Promise<boolean>;
  getEmployeeById(employeeId: string): Promise<Employee>;
  getAllEmployees(facilityId: string): Promise<Employee[]>;
  getRawAllEmployees(facilityId: string): Promise<EmployeeEntity[]>;
  persistModel(employee: Employee): Promise<void>;
  deleteEmployee(employeeId: string): Promise<void>;
}