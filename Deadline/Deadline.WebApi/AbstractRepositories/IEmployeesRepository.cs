using System.Collections.Generic;
using System.Threading.Tasks;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters.Employees;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface IEmployeesRepository
    {
        Task<IEnumerable<Employees>> GetUnemployedAsync(GetUnemployedFilter filter);
        Task<int> GetUnemployedCountAsync(GetUnemployedFilter filter);
        Task<bool> HireAsync(int employeeId, int companyId);
        Task<IEnumerable<Employees>> GetMyAsync(int companyId, GetMyEmployeesFilter filter);
        Task<int> GetMyCountAsync(int companyId, GetMyEmployeesFilter filter);
        Task<bool> AssignAsync(int companyId, int employeeId, int projectId);
        Task<bool> FireAsync(int companyId, int employeeId);
    }
}