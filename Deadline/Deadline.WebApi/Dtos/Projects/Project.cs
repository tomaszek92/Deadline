namespace Deadline.WebApi.Dtos.Projects
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double RoundsToFinish { get; set; }
        public int? CompanyId { get; set; }
    }
}