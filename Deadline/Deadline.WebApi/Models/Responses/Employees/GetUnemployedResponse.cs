using System.Collections.Generic;
using Deadline.WebApi.Dtos.Employees;

namespace Deadline.WebApi.Models.Responses.Employees
{
    public class GetUnemployedResponse
    {
        public IEnumerable<Employee> Employees { get; set; }
        public int PageNumbers { get; set; }
    }
}