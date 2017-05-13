using System.Collections.Generic;
using Deadline.WebApi.Dtos.Employees;

namespace Deadline.WebApi.Models.Responses.Employees
{
    public class GetMyEmployeesResponse : PagabableResponse
    {
        public IEnumerable<EmployeeWithProject> EmployeesWithProject { get; set; }

        public GetMyEmployeesResponse(int allCount, int pageSize) : base(allCount, pageSize)
        {
        }
    }
}