namespace Deadline.WebApi.Dtos.Companies
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
        public decimal AccountBalance { get; set; }
        public int LeftRounds { get; set; }
        public string UserId { get; set; }
    }
}