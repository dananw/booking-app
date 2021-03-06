import React from 'react';

import { PageWrapper } from 'shared/Layout';
import { withErrorBoundary } from 'shared/ErrorBoundary';
import { CustomersCollection } from 'modules/customers/presentation/CustomersCollection';

const Customers = () => {
  return (
    <PageWrapper>
      <CustomersCollection />
    </PageWrapper>
  );
};

export default withErrorBoundary(Customers);
