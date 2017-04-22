using System.Data.Entity;
using System.Threading.Tasks;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.Repositories
{
    public class AspNetUsersRepository : IAspNetUsersRepository
    {
        public async Task<string> GetIdAsync(string email)
        {
            using (var db = new DeadlineContext())
            {
                var aspNetUser = await db.AspNetUsers.SingleOrDefaultAsync(dbUser => dbUser.Email == email);
                return aspNetUser.Id;
            }
        }
    }
}