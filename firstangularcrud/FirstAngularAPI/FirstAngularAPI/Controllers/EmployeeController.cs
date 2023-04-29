using FirstAngularAPI.models;
using FirstAngularAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace FirstAngularAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class EmployeeController : ControllerBase
  {
    private readonly IEmployeeRepo _employee;

    public EmployeeController(IEmployeeRepo employee)
    {
      _employee = employee;
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var employees = await _employee.GetEmployees();
      if (employees == null) return NotFound("You Have to Add Employees");
      return Ok(employees);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var emp = await _employee.GetEmployeeById(id);
      if (emp == null) return BadRequest("No Data Found in DB");
      return Ok(emp);
    }
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Employee employee)
    {
      await _employee.AddEmployee(employee);
      if (employee == null) return BadRequest("Data Not Added");
      return Ok(employee);
    }
    [HttpPut("{id}")]
    public async Task Update(int id, [FromBody] Employee employee)
    {
      await _employee.UpdateEmployee(id, employee);
    }
    [HttpDelete("{id}")]
    public async Task Delete(int id)
    {
      await _employee.DeleteEmployee(id);
    }
  }
}
