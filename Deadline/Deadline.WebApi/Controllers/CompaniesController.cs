using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Dtos.Companies;
using Deadline.WebApi.Models;
using ExpressMapper.Extensions;

namespace Deadline.WebApi.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class CompaniesController : ApiController
    {
        private readonly ICompaniesRepository _companiesRepository;

        public CompaniesController(ICompaniesRepository companiesRepository)
        {
            _companiesRepository = companiesRepository;
        }

        [HttpGet]
        [Route("api/companies/{userId}")]
        [ResponseType(typeof(Company))]
        public async Task<IHttpActionResult> GetByUserId(string userId)
        {
            Guid userIdGuid = Guid.Parse(userId);
            var company = await _companiesRepository.GetAsync(userIdGuid);
            if (company == null)
            {
                return NotFound();
            }
            Company map = company.Map<Companies, Company>();
            return Ok(map);
        }
    }
}