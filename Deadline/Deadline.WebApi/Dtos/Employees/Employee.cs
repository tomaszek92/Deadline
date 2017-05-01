namespace Deadline.WebApi.Dtos.Employees
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public int ExperienceId { get; set; }
        public decimal Salary { get; set; }
        public int? CompanyId { get; set; }
    }
}