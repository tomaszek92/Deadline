using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters;

namespace Deadline.WebApi.Repositories
{
    public class ProjectsRepository : IProjectsRepository
    {
        public async Task<IEnumerable<Projects>> GetUnassignedAsync(GetUnessignedProjectsFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await GetUnassignedAsyncQuery(db, filter)
                    .OrderBy(project => project.Id)
                    .Skip(filter.PageSize * (filter.PageNumber - 1))
                    .Take(filter.PageSize)
                    .ToListAsync();
            }
        }

        public async Task<int> GetUnassignedCountAsync(GetUnessignedProjectsFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await GetUnassignedAsyncQuery(db, filter).CountAsync();
            }
        }

        private static IQueryable<Projects> GetUnassignedAsyncQuery(DeadlineContext db,
            GetUnessignedProjectsFilter filter)
        {
            return db.Projects.Where(project =>
                project.CompanyId == null &&
                filter.RoundsToFinish.From <= project.RoundsToFinish &&
                project.RoundsToFinish <= filter.RoundsToFinish.To);
        }
    }
}