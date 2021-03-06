import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Badge } from '@chakra-ui/react';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { FormattedDate } from 'shared/Date';

import { ISchedule } from 'modules/schedule/types';

interface IProps {
  index: number;
  schedule: ISchedule;
}

const Row = ({ index, schedule }: IProps) => {
  return (
    <GridItem>
      <TruncatedCell>{index}</TruncatedCell>
      <TruncatedCell>{schedule.name}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>
        <FormattedDate value={schedule.startDate} />
      </TruncatedCell>
      <TruncatedCell>
        <FormattedDate value={schedule.endDate} />
      </TruncatedCell>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>
        <FormattedDate value={schedule.creationDate} />
      </TruncatedCell>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>
        <Badge colorScheme='purple'>
          {schedule.availabilities.length} <FormattedMessage id='employees' defaultMessage='Employees' />
        </Badge>
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };
