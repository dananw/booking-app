using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Accessibility.Application.Schedules.Queries.GetAvailabilites
{
    public class GetAvailabilitiesQueryHandler : IRequestHandler<GetAvailabilitiesQuery, IEnumerable<AvailabilityDto>>
    {
        private readonly IScheduleQueryRepository repository;

        public GetAvailabilitiesQueryHandler(IScheduleQueryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<AvailabilityDto>> Handle(GetAvailabilitiesQuery request, CancellationToken cancellationToken)
        {
            if (request.EmployeeId is null)
            {
                return await repository.GetAvailabilities(
                    request.FacilityId,
                    request.ScheduleId,
                    request.StartTime??DateTime.Now,
                    request.EndTime??DateTime.MaxValue);
            }
            
            return await repository.GetAvailabilities(
                request.FacilityId,
                request.ScheduleId,
                request.StartTime??DateTime.Now,
                request.EndTime??DateTime.MaxValue,
                request.EmployeeId);
        }
    }
}
