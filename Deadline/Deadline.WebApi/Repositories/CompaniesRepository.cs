using System;
using System.Data.Entity;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.Repositories
{
    public class CompaniesRepository : ICompaniesRepository
    {
        public async Task AddAsync(Companies model)
        {
            using (var db = new DeadlineContext())
            {
                db.Companies.Add(new Companies
                {
                    AspNetUserId = model.AspNetUserId,
                    LogoUrl = model.LogoUrl,
                    Name = model.Name
                });
                await db.SaveChangesAsync();
            }
        }

        public async Task<Companies> GetAsync(string email)
        {
            using (var db = new DeadlineContext())
            {
                return await db.Companies.SingleOrDefaultAsync(company => company.AspNetUsers.Email == email);
            }
        }

        public async Task<Companies> GetAsync(Guid userId)
        {
            using (var db = new DeadlineContext())
            {
                return await db.Companies.SingleOrDefaultAsync(company => company.AspNetUsers.Id == userId.ToString());
            }
        }
    }
}