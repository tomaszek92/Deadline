namespace Deadline.WebApi.Models.Filters.Projects
{
    public class GetUnessignedProjectsFilter : PageableFilter
    {
        public Range<int> RoundsToFinish { get; internal set; }
    }
}