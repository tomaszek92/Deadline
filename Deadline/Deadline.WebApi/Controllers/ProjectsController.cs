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
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class ProjectsController : ApiController
    {
        private readonly IProjectsRepository _projectsRepository;
        private readonly IProjectsRequirementsRepository _projectsRequirementsRepository;
        private const int PageSize = 10;

        public ProjectsController(
            IProjectsRepository projectsRepository,
            IProjectsRequirementsRepository projectsRequirementsRepository)
        {
            _projectsRepository = projectsRepository;
            _projectsRequirementsRepository = projectsRequirementsRepository;
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
                NumberOfPages = (int) Math.Ceiling((double) projectsMatchingToFilter / PageSize)
            };
            return Ok(response);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetProjectRequirements(int projectId)
        {
            var dbProjectsRequirements = await _projectsRequirementsRepository.GetAsync(projectId);

            var projectRequirements = dbProjectsRequirements
                .Map<List<ProjectsRequirements>, List<ProjectRequirement>>();

            return Ok(projectRequirements);
        }

        [HttpPut]
        public async Task<IHttpActionResult> TakeUp(int companyId, int projectId)
        {
            bool isSuccess = await _projectsRepository.TakeUpAsync(companyId, projectId);
            if (!isSuccess)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}