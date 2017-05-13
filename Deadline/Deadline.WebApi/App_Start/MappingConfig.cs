using System;
using Deadline.WebApi.Dtos.Companies;
using Deadline.WebApi.Dtos.Employees;
using Deadline.WebApi.Dtos.Projects;
using Deadline.WebApi.Models;
using ExpressMapper;

namespace Deadline.WebApi
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

            Mapper.Register<Employees, EmployeeWithProject>()
                .Member(dest => dest.ProjectId, src => src.ProjectId)
                .Function(dest => dest.ProjectName, src => src.ProjectId.HasValue ? src.Projects.Name : String.Empty);
        }
    }
}