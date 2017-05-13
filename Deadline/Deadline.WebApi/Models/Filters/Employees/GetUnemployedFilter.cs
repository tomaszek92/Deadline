namespace Deadline.WebApi.Models.Filters.Employees
{
    public class GetUnemployedFilter : PageableFilter
    {
        public int[] TypesIds { get; set; }
        public int[] ExperienceIds { get; set; }
    }
}