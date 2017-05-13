using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters.Projects;

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

        public async Task<bool> TakeUpAsync(int companyId, int projectId)
        {
            using (var db = new DeadlineContext())
            {
                Projects dbProject = await db.Projects.SingleOrDefaultAsync(project => project.Id == projectId);
                if (dbProject == null)
                {
                    return false;
                }

                dbProject.CompanyId = companyId;
                await db.SaveChangesAsync();
                return true;
            }
        }

        public async Task<IEnumerable<Projects>> GetMyAsync(int companyId)
        {
            using (var db = new DeadlineContext())
            {
                return await db.Projects
                    .Where(project => project.CompanyId.HasValue && project.CompanyId.Value == companyId)
                    .ToListAsync();
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