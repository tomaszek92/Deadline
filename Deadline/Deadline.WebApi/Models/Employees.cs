//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Deadline.WebApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Employees
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
        public int ExperienceId { get; set; }
        public decimal Salary { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public Nullable<int> ProjectId { get; set; }
    
        public virtual EmployeesExperiences EmployeesExperiences { get; set; }
        public virtual EmployeesTypes EmployeesTypes { get; set; }
        public virtual Companies Companies { get; set; }
        public virtual Projects Projects { get; set; }
    }
}
