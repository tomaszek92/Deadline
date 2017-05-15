using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Dtos.Projects;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters.Projects;
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

            var response = new GetUnassignedProjectsResponse(projectsMatchingToFilter, PageSize)
            {
                Projects = projects.Select(project => project.Map<Projects, Project>())
            };
            return Ok(response);
        }

        [HttpGet]
        [ResponseType(typeof(IEnumerable<ProjectRequirement>))]
        public async Task<IHttpActionResult> GetProjectRequirements(int projectId)
        {
            var dbProjectsRequirements = await _projectsRequirementsRepository.GetAsync(projectId);

            IEnumerable<ProjectRequirement> projectRequirements = dbProjectsRequirements
                .Map<List<ProjectsRequirements>, List<ProjectRequirement>>();

            return Ok(projectRequirements);
        }

        [HttpGet]
        [ResponseType(typeof(IEnumerable<Project>))]
        public async Task<IHttpActionResult> GetMy(int companyId)
        {
            IEnumerable<Projects> dbProjects = await _projectsRepository.GetMyAsync(companyId);
            IEnumerable<Project> projects = dbProjects.Select(project => project.Map<Projects, Project>());
            return Ok(projects);
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