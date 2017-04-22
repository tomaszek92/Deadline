using System;
using System.Threading.Tasks;
using Deadline.WebApi.Models;

namespace Deadline.WebApi.AbstractRepositories
{
    public interface ICompaniesRepository
    {
        Task AddAsync(Companies company);
        Task<Companies> GetAsync(string email);
        Task<Companies> GetAsync(Guid userId);
    }
}