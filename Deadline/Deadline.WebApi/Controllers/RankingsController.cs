using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Responses.Rankings;

namespace Deadline.WebApi.Controllers
{
    [Authorize]
    [EnableCors("*", "*", "*")]
    public class RankingsController : ApiController
    {
        [HttpGet]
        [ResponseType(typeof(GetPositionResponse))]
        [Route("api/rankings/{companyId}/{rankingPeriod}")]
        public async Task<IHttpActionResult> GetPosition(int companyId, RankingPeriod rankingPeriod)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(150));
            var response = new GetPositionResponse
            {
                Position = 4319
            };
            return Ok(response);
        }
    }
}