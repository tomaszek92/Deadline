namespace Deadline.WebApi.Dtos.Projects
{
    public class ProjectRequirement
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int EmployeeTypeId { get; set; }
        public int EmployeesNumber { get; set; }
    }
}