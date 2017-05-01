using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.Repositories
{
    public class EmployeesRepository : IEmployeesRepository
    {
        public async Task<IEnumerable<Employees>> GetUnemployedAsync(GetUnemployedFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await db.Employees
                    .Where(employee =>
                        employee.CompanyId == null &&
                        filter.ExperienceIds.Contains(employee.ExperienceId) &&
                        filter.TypesIds.Contains(employee.TypeId))
                    .OrderBy(employee => employee.Id)
                    .Skip(filter.PageSize * (filter.PageNumber - 1))
                    .Take(filter.PageSize)
                    .ToListAsync();
            }
        }

        public async Task<int> GetUnemployedCountAsync(GetUnemployedFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await db.Employees
                    .Where(employee =>
                        employee.CompanyId == null &&
                        filter.ExperienceIds.Contains(employee.ExperienceId) &&
                        filter.TypesIds.Contains(employee.TypeId))
                    .CountAsync();
            }
        }

        public async Task<bool> HireAsync(int employeeId, int companyId)
        {
            using (var db = new DeadlineContext())
            {
                Employees dbEmployee = await db.Employees.SingleOrDefaultAsync(employee => employee.Id == employeeId);
                if (dbEmployee == null)
                {
                    return false;
                }
                dbEmployee.CompanyId = companyId;
                await db.SaveChangesAsync();
                return true;
            }
        }
    }
}