namespace Deadline.WebApi.Dtos.Employees
{
    public class EmployeeWithProject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public int ExperienceId { get; set; }
        public decimal Salary { get; set; }
        public int? ProjectId { get; set; }
        public string ProjectName { get; set; }
    }
}