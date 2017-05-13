using System;

namespace Deadline.WebApi.Models.Responses
{
    public abstract class PagabableResponse
    {
        public int NumberOfPages { get; }

        protected PagabableResponse(int allCount, int pageSize)
        {
            NumberOfPages = (int) Math.Ceiling((double) allCount / pageSize);
        }
    }
}