export interface ICreateScheduleDto {
  name: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  availabilities: Array<IAddAvailableEmployeeDto>;
}

export interface IAddAvailableEmployeeDto {
  employeeId: string;
  startTime: string;
  endTime: string;
  creatorId: string;
}
