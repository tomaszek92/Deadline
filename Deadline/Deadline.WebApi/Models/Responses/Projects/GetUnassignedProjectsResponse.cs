using System.Collections.Generic;
using Deadline.WebApi.Dtos.Projects;

namespace Deadline.WebApi.Models.Responses.Projects
{
    public class GetUnassignedProjectsResponse
    {
        public int PageNumbers { get; set; }
        public IEnumerable<Project> Projects { get; set; }
    }
}