using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;
using Deadline.WebApi.Models.Filters.Employees;

namespace Deadline.WebApi.Repositories
{
    public class EmployeesRepository : IEmployeesRepository
    {
        public async Task<IEnumerable<Employees>> GetUnemployedAsync(GetUnemployedFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await GetUnemployedQuery(db, filter)
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
                return await GetUnemployedQuery(db, filter).CountAsync();
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

        public async Task<IEnumerable<Employees>> GetMyAsync(int companyId, GetMyEmployeesFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await GetMyEmployeesQuery(db, companyId, filter)
                    .Include(employee => employee.Projects)
                    .ToListAsync();
            }
        }

        public async Task<int> GetMyCountAsync(int companyId, GetMyEmployeesFilter filter)
        {
            using (var db = new DeadlineContext())
            {
                return await GetMyEmployeesQuery(db, companyId, filter).CountAsync();
            }
        }

        public async Task<bool> AssignAsync(int companyId, int employeeId, int projectId)
        {
            using (var db = new DeadlineContext())
            {
                Employees dbEmployee = await db.Employees.SingleOrDefaultAsync(employee => employee.Id == employeeId);
                if (dbEmployee?.CompanyId != companyId)
                {
                    return false;
                }
                dbEmployee.ProjectId = projectId;
                await db.SaveChangesAsync();
                return true;
            }
        }

        public async Task<bool> FireAsync(int companyId, int employeeId)
        {
            using (var db = new DeadlineContext())
            {
                Employees dbEmployee = await db.Employees.SingleOrDefaultAsync(employee => employee.Id == employeeId);
                if (dbEmployee?.CompanyId != companyId)
                {
                    return false;
                }
                dbEmployee.ProjectId = null;
                dbEmployee.CompanyId = null;
                await db.SaveChangesAsync();
                return true;
            }
        }

        public async Task<int> GetMyAmountAsync(int companyId)
        {
            using (var db = new DeadlineContext())
            {
                return await db.Employees
                    .CountAsync(employee =>
                        employee.CompanyId.HasValue &&
                        employee.CompanyId.Value == companyId);
            }
        }

        private static IQueryable<Employees> GetUnemployedQuery(DeadlineContext db, GetUnemployedFilter filter)
        {
            return db.Employees.Where(employee =>
                employee.CompanyId == null &&
                filter.ExperienceIds.Contains(employee.ExperienceId) &&
                filter.TypesIds.Contains(employee.TypeId));
        }

        private static IQueryable<Employees> GetMyEmployeesQuery(DeadlineContext db, int companyId,
            GetMyEmployeesFilter filter)
        {
            return db.Employees.Where(employee =>
                employee.CompanyId.HasValue && employee.CompanyId.Value == companyId &&
                employee.ProjectId.HasValue == filter.Assigned);
        }
    }
}