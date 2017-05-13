using System.Collections.Generic;
using System.Threading.Tasks;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters.Projects;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface IProjectsRepository
    {
        Task<IEnumerable<Projects>> GetUnassignedAsync(GetUnessignedProjectsFilter filter);
        Task<int> GetUnassignedCountAsync(GetUnessignedProjectsFilter filter);
        Task<bool> TakeUpAsync(int companyId, int projectId);
        Task<IEnumerable<Projects>> GetMyAsync(int companyId);
    }
}