using System.Collections.Generic;
using Deadline.WebApi.Dtos.Employees;

namespace Deadline.WebApi.Models.Responses.Employees
{
    public class GetUnemployedResponse : PagabableResponse
    {
        public IEnumerable<Employee> Employees { get; set; }
    }
}