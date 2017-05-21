namespace Deadline.WebApi.Models.Filters.Projects
{
    public class GetMyProjectsFilter : PageableFilter
    {
        public int CompanyId { get; set; }
    }
}