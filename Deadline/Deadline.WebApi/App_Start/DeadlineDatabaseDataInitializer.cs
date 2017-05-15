using System;
using System.Collections.Generic;
using Deadline.WebApi.Helpers;
using Deadline.WebApi.Models;

namespace Deadline.WebApi
{
    public class DeadlineDatabaseDataInitializer
    {
        private static readonly IEnumerable<string> Names = new List<string>
        {
            "Freddy Russaw",
            "Chanel Ostrander",
            "Jasmin Carignan",
            "Elijah Neece",
            "Collene Andrea",
            "Caridad Plotkin",
            "Terra Bonifacio",
            "Daysi Purtee",
            "Roseanne Rodriquez",
            "Kristyn Hibbitts",
            "Sofia Kitamura",
            "Thomas Thurgood",
            "Isis Alejandre",
            "Lynne Cotton",
            "Gail Wix",
            "Karri Koser",
            "Glenna Konen",
            "Refugia Lettinga",
            "Sid Cefalu",
            "Holley Gethers",
            "Lyle Sagar",
            "Niesha Hallmark",
            "Brice Cohn",
            "Shena Heppner",
            "Voncile Satterwhite",
            "Sebrina Rase",
            "Adalberto Labella",
            "Neil Champine",
            "Antone Lawerence",
            "Mona Lagunas",
            "Mao Coronado",
            "Lyndon Jarrett",
            "Stanton Sabine",
            "Shantae Greenwalt",
            "Eldridge Silvestri",
            "Twila Mongillo",
            "Norene Ruston",
            "April Valtierra",
            "Veola Rowlands",
            "Livia Laughton",
            "Luna Lepine",
            "Myung Rubenstein",
            "Bridgett Wolter",
            "Alycia Salido",
            "Shaunte Palka",
            "Laurene Hucks",
            "Jeffry Suchan",
            "Krista Propes",
            "Sasha Crumpton",
            "Elvin Waltman",
            "Ross Rains",
            "Mathew Severt",
            "Ronny Quinto",
            "Abraham Caster",
            "Homer Valerio",
            "Perry Escamilla",
            "Heriberto Rippy",
            "Elwood Nedeau",
            "Dominick Doolittle",
            "Jim Felts",
            "Trinidad Macaraeg",
            "Ali Vazguez",
            "Chet Giglio",
            "Ted Huang",
            "Hong Sikorski",
            "Danial Wigfall",
            "Kelley Shoup",
            "Devon Stella",
            "Man Wickert",
            "Luke Mcswain",
            "Terrence Dedeaux",
            "Logan Helm",
            "Gail Tabarez",
            "Bradley Prestidge",
            "Adrian Fils",
            "Bradford Dortch",
            "Bud Lipscomb",
            "Jose Fells",
            "Terrance Scheetz",
            "Brock Lesko",
            "Gerardo Yun",
            "Ellis Duck",
            "Gustavo Hertel",
            "Jasper Cooney",
            "Phillip Stump",
            "Frankie Rameau",
            "Ervin Primer",
            "Raymundo Cheever",
            "Ken Melgar",
            "Josue Plaster",
            "Conrad Heidecker",
            "Lawrence Eichenlaub",
            "Vincent Winford",
            "Claud Merced",
            "Mary Putman",
            "Jon Pereyra",
            "Stephen Lacasse",
            "Raul Hafner",
            "Ezequiel Crippen",
            "Grover Stfleur"
        };

        private static readonly string ProjectDesciption =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non ullamcorper odio, et semper quam. Ut in ante vel dolor lacinia aliquam. Suspendisse potenti. Vestibulum iaculis volutpat nunc, viverra volutpat eros consectetur in. Fusce auctor elit tellus, in vulputate turpis varius et. Donec laoreet nulla at elit hendrerit, vitae suscipit urna pretium. Nunc sed semper sem. Suspendisse porta, eros in mattis hendrerit, risus turpis condimentum sapien, et suscipit mauris odio eget sem. Sed vitae felis tempus, rhoncus leo a, egestas ante. Ut ac tortor sodales, condimentum felis non, pretium felis. Maecenas pulvinar tortor euismod, pellentesque nulla non, tristique tellus. Aliquam hendrerit erat vitae purus pharetra, eget iaculis nulla varius. Fusce et est diam. Integer hendrerit cursus enim, tempor blandit metus fermentum ac. Curabitur tincidunt lobortis eros, non laoreet nunc tempor gravida."
            ;

        public static void AddData()
        {
            using (var db = new DeadlineContext())
            {
                //AddEmployees(db);
                //AddProjects(db);
            }
        }

        private static void AddEmployees(DeadlineContext db)
        {
            var employees = new List<Employees>();
            var rand = new Random();
            foreach (string name in Names)
            {
                int experienceId = rand.Next(1, 5);
                employees.Add(new Employees
                {
                    Name = name,
                    ExperienceId = experienceId,
                    TypeId = rand.Next(1, 4),
                    Salary = experienceId * rand.Next(100, 201)
                });
            }
            db.Employees.AddRange(employees);
            db.SaveChanges();
        }

        private static void AddProjects(DeadlineContext db)
        {
            var projects = new List<Projects>();
            var rand = new Random();
            for (int i = 0; i < 100; i++)
            {
                var employeeTypeIds = new List<int> {1, 2, 3};

                int rounds = rand.Next(10, 100);
                projects.Add(new Projects
                {
                    Name = $"Test Name{i}",
                    Description = ProjectDesciption,
                    Rounds = rounds,
                    RoundsToFinish = rounds,
                    ProjectsRequirements = new List<ProjectsRequirements>
                    {
                        new ProjectsRequirements
                        {
                            EmployeeTypeId = employeeTypeIds.Pop(rand.Next(0, 3)),
                            EmployeesNumber = rand.Next(1, 10)
                        },
                        new ProjectsRequirements
                        {
                            EmployeeTypeId = employeeTypeIds.Pop(rand.Next(0, 2)),
                            EmployeesNumber = rand.Next(1, 10)
                        }
                    }
                });
            }
            db.Projects.AddRange(projects);
            db.SaveChanges();
        }
    }
}