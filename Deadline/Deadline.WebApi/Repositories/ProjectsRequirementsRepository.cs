using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.Repositories
{
    public class ProjectsRequirementsRepository : IProjectsRequirementsRepository
    {
        public async Task<List<ProjectsRequirements>> GetAsync(int projectId)
        {
            using (var db = new DeadlineContext())
            {
                return await db.ProjectsRequirements
                    .Where(projectRequrement => projectRequrement.ProjectId == projectId)
                    .ToListAsync();
            }
        }
    }
}