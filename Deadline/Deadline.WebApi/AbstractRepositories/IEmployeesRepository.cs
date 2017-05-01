using System.Collections.Generic;
using System.Threading.Tasks;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface IEmployeesRepository
    {
        Task<IEnumerable<Employees>> GetUnemployedAsync(GetUnemployedFilter filter);
        Task<int> GetUnemployedCountAsync(GetUnemployedFilter filter);
    }
}