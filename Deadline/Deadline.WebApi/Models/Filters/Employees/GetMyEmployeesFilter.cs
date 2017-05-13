namespace Deadline.WebApi.Models.Filters.Employees
{
    public class GetMyEmployeesFilter : PageableFilter
    {
        public bool Assigned { get; set; }
    }
}