﻿using System.Collections.Generic;
using Deadline.WebApi.Dtos.Projects;

namespace Deadline.WebApi.Models.Responses.Projects
{
    public class GetUnassignedProjectsResponse : PagabableResponse
    {
        public IEnumerable<Project> Projects { get; set; }
    }
}