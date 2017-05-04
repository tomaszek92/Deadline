namespace Deadline.WebApi.Models.Filters
{
    public class GetUnessignedProjectsFilter : PageableFilter
    {
        public Range<int> RoundsToFinish { get; internal set; }
    }
}