using FirstAngularAPI.models;

namespace FirstAngularAPI.Repository
{
  public interface IEmployeeRepo
  {
    Task<List<Employee>> GetEmployees();
    Task<Employee> GetEmployeeById(int id);
    Task AddEmployee(Employee employee);
    Task UpdateEmployee(int id, Employee employee);
    Task DeleteEmployee(int id);
  }
}
