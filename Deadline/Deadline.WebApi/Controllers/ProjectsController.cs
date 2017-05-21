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
        private readonly IEmployeesRepository _employeesRepository;
        private const int PageSize = 10;

        public ProjectsController(
            IProjectsRepository projectsRepository,
            IProjectsRequirementsRepository projectsRequirementsRepository,
            IEmployeesRepository employeesRepository)
        {
            _projectsRepository = projectsRepository;
            _projectsRequirementsRepository = projectsRequirementsRepository;
            _employeesRepository = employeesRepository;
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
        [Route("api/Projects/GetProjectRequirements")]
        public async Task<IHttpActionResult> GetProjectRequirements(int projectId)
        {
            var dbProjectsRequirements = await _projectsRequirementsRepository.GetAsync(projectId);

            IEnumerable<ProjectRequirement> projectRequirements = dbProjectsRequirements
                .Map<List<ProjectsRequirements>, List<ProjectRequirement>>();

            return Ok(projectRequirements);
        }

        [HttpGet]
        [ResponseType(typeof(IEnumerable<ProjectRequirementWithAssignedEmployees>))]
        [Route("api/Projects/GetProjectRequirementsWithAssignedEmployees")]
        public async Task<IHttpActionResult> GetProjectRequirementsWithAssignedEmployees(int projectId)
        {
            var dbProjectsRequirements = await _projectsRequirementsRepository.GetAsync(projectId);
            var dbEmployeeses = (await _employeesRepository.GetAssignedToProjectAsync(projectId)).ToList();

            IEnumerable<ProjectRequirementWithAssignedEmployees> projectRequirements = dbProjectsRequirements
                .Map<List<ProjectsRequirements>, List<ProjectRequirementWithAssignedEmployees>>();

            foreach (ProjectRequirementWithAssignedEmployees projectRequirement in projectRequirements)
            {
                projectRequirement.AssignedEmployees =
                    dbEmployeeses.Count(employee => employee.ProjectId == projectRequirement.ProjectId);
            }

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

        [HttpGet]
        [ResponseType(typeof(IEnumerable<GetMyResponse>))]
        public async Task<IHttpActionResult> GetMy(int companyId, int pageNumber)
        {
            var filter = new GetMyProjectsFilter
            {
                CompanyId = companyId,
                PageNumber = pageNumber,
                PageSize = PageSize
            };
            IEnumerable<Projects> dbProjects = await _projectsRepository.GetMyAsync(filter);
            int projectCount = await _projectsRepository.GetMyCountAsync(filter);
            var response = new GetMyResponse(projectCount, PageSize)
            {
                Projects = dbProjects.Select(project => project.Map<Projects, Project>())
            };
            return Ok(response);
        }

        [HttpPut]
        [Route("api/Projects/TakeUp")]
        public async Task<IHttpActionResult> TakeUp(int companyId, int projectId)
        {
            bool isSuccess = await _projectsRepository.TakeUpAsync(companyId, projectId);
            if (!isSuccess)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut]
        [Route("api/Projects/TurnDown")]
        public async Task<IHttpActionResult> TurnDown(int companyId, int projectId)
        {
            bool isSuccess = await _projectsRepository.TurnDownAsync(companyId, projectId);
            if (!isSuccess)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}