import React from 'react';

import { Grid } from 'shared/Grid';
import { Pagination } from 'shared/Pagination';
import { FetchBoundary } from 'shared/Suspense';
import { getCustomers, getCustomersKey } from 'modules/customers/api';
import { useQueryParams } from 'shared/Params';
import { CustomerCollection } from 'modules/customers/types';

import { Header } from './Header';
import { Row } from './Row';

interface IProps {
  facilityId: string;
}

const Table = ({ facilityId }: IProps) => {
  const { params } = useQueryParams();

  return (
    <FetchBoundary<CustomerCollection> queryKey={getCustomersKey(facilityId, params)} queryFn={() => getCustomers(facilityId, params)}>
      {({ data: { collection, meta } }) => (
        <>
          <Grid
            itemsCount={collection.length}
            rowGap={1}
            templateColumns={{
              base: '80px repeat(2, 1fr) max(120px)',
              md: '80px repeat(4, 1fr) max(120px)',
              lg: '80px repeat(5, 1fr) max(120px)',
            }}
            mb={4}
          >
            <Header />
            {collection.map((customer, index) => (
              <Row index={index + 1} key={customer.customerId} customer={customer} />
            ))}
          </Grid>
          <Pagination limit={meta.limit} total={meta.total} />
        </>
      )}
    </FetchBoundary>
  );
};

export { Table };