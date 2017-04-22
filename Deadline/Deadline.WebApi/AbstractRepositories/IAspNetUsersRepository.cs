using System.Threading.Tasks;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface IAspNetUsersRepository
    {
        Task<string> GetIdAsync(string email);
    }
}