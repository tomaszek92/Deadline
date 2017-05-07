using Deadline.WebApi.Dtos.Companies;
using Deadline.WebApi.Dtos.Employees;
using Deadline.WebApi.Dtos.Projects;
using Deadline.WebApi.Models;
using ExpressMapper;

namespace Deadline.WebApi.App_Start
{
    public class MappingConfig
    {
        public static void Register()
        {
            Mapper.Register<Companies, Company>()
                .Member(dest => dest.UserId, src => src.AspNetUserId);

            Mapper.Register<Employees, Employee>();

            Mapper.Register<Projects, Project>();

            Mapper.Register<ProjectsRequirements, ProjectRequirement>();
        }
    }
}