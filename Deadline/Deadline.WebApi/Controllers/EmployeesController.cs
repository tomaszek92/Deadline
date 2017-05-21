using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Dtos.Employees;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters.Employees;
using Deadline.WebApi.Models.Responses.Employees;
using ExpressMapper.Extensions;

namespace Deadline.WebApi.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class EmployeesController : ApiController
    {
        private readonly IEmployeesRepository _employeesRepository;
        private const int PageSize = 10;

        public EmployeesController(IEmployeesRepository employeesRepository)
        {
            _employeesRepository = employeesRepository;
        }

        [HttpGet]
        [ResponseType(typeof(GetUnemployedResponse))]
        [Route("api/employees/unemployeed")]
        public async Task<IHttpActionResult> GetUnemployed(
            [FromUri] int[] typesIds,
            [FromUri] int[] experienceIds,
            int pageNumber)
        {
            var filter = new GetUnemployedFilter
            {
                ExperienceIds = experienceIds,
                TypesIds = typesIds,
                PageNumber = pageNumber,
                PageSize = PageSize
            };

            IEnumerable<Employees> employees = await _employeesRepository.GetUnemployedAsync(filter);
            int employeesMatchingToFilter = await _employeesRepository.GetUnemployedCountAsync(filter);

            var response = new GetUnemployedResponse(employeesMatchingToFilter, PageSize)
            {
                Employees = employees.Select(e => e.Map<Employees, Employee>())
            };
            return Ok(response);
        }

        [HttpGet]
        [ResponseType(typeof(GetMyEmployeesResponse))]
        [Route("api/employees/{companyId}/{assigned}/{pageNumber}")]
        public async Task<IHttpActionResult> GetMy(int companyId, bool assigned, int pageNumber)
        {
            var filter = new GetMyEmployeesFilter
            {
                PageNumber = pageNumber,
                PageSize = PageSize,
                Assigned = assigned
            };

            IEnumerable<Employees> employees = await _employeesRepository.GetMyAsync(companyId, filter);
            int myEmployeesCount = await _employeesRepository.GetMyCountAsync(companyId, filter);

            var response = new GetMyEmployeesResponse(myEmployeesCount, PageSize)
            {
                EmployeesWithProject = employees.Select(employee => employee.Map<Employees, EmployeeWithProject>())
            };

            return Ok(response);
        }

        [HttpGet]
        [ResponseType(typeof(GetMyAmountResponse))]
        [Route("api/employees/{companyId}/amount")]
        public async Task<IHttpActionResult> GetMyAmount(int companyId)
        {
            int amount = await _employeesRepository.GetMyAmountAsync(companyId);
            var response = new GetMyAmountResponse
            {
                Amount = amount
            };
            return Ok(response);
        }

        [HttpPut]
        [Route("api/employees/{companyId}/hires/{employeeId}")]
        public async Task<IHttpActionResult> Hire(int employeeId, int companyId)
        {
            bool isSuccess = await _employeesRepository.HireAsync(employeeId, companyId);
            if (!isSuccess)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPut]
        [Route("api/employees/{employeeId}/{companyId}/assignes/{projectId}")]
        public async Task<IHttpActionResult> Assign(int companyId, int employeeId, int projectId)
        {
            bool isSuccess = await _employeesRepository.AssignAsync(companyId, employeeId, projectId);
            if (!isSuccess)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut]
        [Route("api/employees/{companyId}/fires/{employeeId}")]
        public async Task<IHttpActionResult> Fire(int companyId, int employeeId)
        {
            bool isSuccess = await _employeesRepository.FireAsync(companyId, employeeId);
            if (!isSuccess)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}