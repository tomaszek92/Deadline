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

        [ResponseType(typeof(Company))]
        public async Task<IHttpActionResult> Get(string email)
        {
            var company = await _companiesRepository.GetAsync(email);
            if (company == null)
            {
                return NotFound();
            }
            Company map = company.Map<Companies, Company>();
            return Ok(map);
        }
    }
}