using System.Collections.Generic;
using System.Threading.Tasks;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface IEmployeesRepository
    {
        Task<IEnumerable<Employees>> GetUnemployedAsync(GetUnemployedFilter filter);
        Task<int> GetUnemployedCountAsync(GetUnemployedFilter filter);
        Task<bool> HireAsync(int employeeId, int companyId);
    }
}