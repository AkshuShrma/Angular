using FirstAngularAPI.Context;
using FirstAngularAPI.models;
using Microsoft.EntityFrameworkCore;

namespace FirstAngularAPI.Repository
{
  public class EmployeeRepo:IEmployeeRepo
  {
    private readonly ApplicationDbContext _context;

    public EmployeeRepo(ApplicationDbContext context)
    {
      _context = context;
    }
    public async Task AddEmployee(Employee employee)
    {
      await _context.Employees.AddAsync(employee);
      await _context.SaveChangesAsync();
    }

    public async Task DeleteEmployee(int id)
    {
      var employeeInDb = await _context.Employees.FindAsync(id);
      _context.Employees.Remove(employeeInDb);
      await _context.SaveChangesAsync();
    }

    public async Task<Employee> GetEmployeeById(int id)
    {
      var emp = await (_context.Employees.Where(v => v.Id == id).FirstOrDefaultAsync());
      return emp;
    }

    public async Task<List<Employee>> GetEmployees()
    {
      return await _context.Employees.ToListAsync();
    }

    public async Task UpdateEmployee(int id, Employee employee)
    {
      _context.Employees.Update(employee);
      await _context.SaveChangesAsync();
    }
  }
}
