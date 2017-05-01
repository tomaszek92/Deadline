using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Dtos.Employees;
using Deadline.WebApi.Models;
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

            var response = new GetUnemployedResponse
            {
                Employees = employees.Select(e => e.Map<Employees, Employee>()),
                PageNumbers = (int) Math.Ceiling((double) employeesMatchingToFilter / PageSize)
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
    }
}