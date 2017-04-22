using Deadline.WebApi.Dtos.Companies;
using Deadline.WebApi.Models;
using ExpressMapper;

namespace Deadline.WebApi.App_Start
{
    public class MappingConfig
    {
        public static void Register()
        {
            Mapper.Register<Companies, Company>();
        }
    }
}