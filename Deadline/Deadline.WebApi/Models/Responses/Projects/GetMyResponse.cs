using System.Collections.Generic;
using Deadline.WebApi.Dtos.Projects;

namespace Deadline.WebApi.Models.Responses.Projects
{
    public class GetMyResponse : PagabableResponse
    {
        public IEnumerable<Project> Projects { get; set; }

        public GetMyResponse(int allCount, int pageSize) : base(allCount, pageSize)
        {
        }
    }
}