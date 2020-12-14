using System;
using MediatR;

namespace Accessibility.Application.Schedules.GetScheduleById
{
    public class GetScheduleByIdQuery : IRequest<ScheduleDto>
    {
        public GetScheduleByIdQuery(Guid scheduleId)
        {
            ScheduleId = scheduleId;
        }

        public Guid ScheduleId { get; }
    }
}
