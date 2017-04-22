using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Deadline.WebApi.AbstractRepositories;
using Deadline.WebApi.Repositories;

namespace Deadline.WebApi
{
    public class AutofacContainerConfig
    {
        public static void Register()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<AspNetUsersRepository>().As<IAspNetUsersRepository>();
            builder.RegisterType<CompaniesRepository>().As<ICompaniesRepository>();

            var container = builder.Build();
            var config = GlobalConfiguration.Configuration;
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}