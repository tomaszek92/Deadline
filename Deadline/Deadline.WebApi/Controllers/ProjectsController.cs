using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Dtos.Projects;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters;
using Deadline.WebApi.Models.Responses.Projects;
using ExpressMapper.Extensions;

namespace Deadline.WebApi.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ProjectsController : ApiController
    {
        private readonly IProjectsRepository _projectsRepository;
        private const int PageSize = 10;

        public ProjectsController(IProjectsRepository projectsRepository)
        {
            _projectsRepository = projectsRepository;
        }


        [HttpGet]
        [ResponseType(typeof(GetUnassignedProjectsResponse))]
        public async Task<IHttpActionResult> GetUnassigned(
            int pageNumber,
            int roundsToFinishMin,
            int roundsToFinishMax)
        {
            var filter = new GetUnessignedProjectsFilter
            {
                PageNumber = pageNumber,
                PageSize = PageSize,
                RoundsToFinish = new Range<int> {From = roundsToFinishMin, To = roundsToFinishMax}
            };

            IEnumerable<Projects> projects = await _projectsRepository.GetUnassignedAsync(filter);
            int projectsMatchingToFilter = await _projectsRepository.GetUnassignedCountAsync(filter);

            var response = new GetUnassignedProjectsResponse
            {
                Projects = projects.Select(project => project.Map<Projects, Project>()),
                PageNumbers = (int) Math.Ceiling((double) projectsMatchingToFilter / PageSize)
            };
            return Ok(response);
        }

        // GET: api/Projects/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Projects
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Projects/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
        }
    }
}