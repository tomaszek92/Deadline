using System.Collections.Generic;
using Deadline.WebApi.Dtos.Employees;

namespace Deadline.WebApi.Models.Responses.Employees
{
    public class GetUnemployedResponse : PagabableResponse
    {
        public IEnumerable<Employee> Employees { get; set; }

        public GetUnemployedResponse(int allCount, int pageSize) : base(allCount, pageSize)
        {
        }
    }
}