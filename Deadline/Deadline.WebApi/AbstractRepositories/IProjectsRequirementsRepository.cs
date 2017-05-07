using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface IProjectsRequirementsRepository
    {
        Task<List<ProjectsRequirements>> GetAsync(int projectId);
    }
}