namespace Deadline.WebApi.Models
{
    public class GetUnemployedFilter
    {
        public int[] TypesIds { get; set; }
        public int[] ExperienceIds { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}