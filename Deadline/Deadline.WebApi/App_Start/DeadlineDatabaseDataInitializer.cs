using System;
using System.Collections.Generic;
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

        public static void AddData()
        {
            using (var db = new DeadlineContext())
            {
                List<Employees> employees = new List<Employees>();
                Random rand = new Random();
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
        }
    }
}