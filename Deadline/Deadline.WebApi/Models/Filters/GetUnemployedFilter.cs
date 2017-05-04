namespace Deadline.WebApi.Models.Filters
{
    public class GetUnemployedFilter : PageableFilter
    {
        public int[] TypesIds { get; set; }
        public int[] ExperienceIds { get; set; }
    }
}