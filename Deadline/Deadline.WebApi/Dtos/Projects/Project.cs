namespace Deadline.WebApi.Dtos.Projects
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rounds { get; set; }
        public int RoundsToFinish { get; set; }
        public int? CompanyId { get; set; }
    }
}