using System;
using System.Collections.Generic;

namespace Deadline.WebApi.Helpers
{
    public static class ListExtensions
    {
        public static T Pop<T>(this List<T> list, int index)
        {
            if (index < 0 || index >= list.Count)
            {
                throw new ArgumentOutOfRangeException(nameof(index));
            }

            T element = list[index];
            list.RemoveAt(index);
            return element;
        }
    }
}