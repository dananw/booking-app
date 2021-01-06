import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { State } from './State';
import image from '../../assets/images/server-error.png';
import { HomeButton } from './HomeButton';

const ServerErrorState = () => {
  const { formatMessage } = useIntl();

  return (
    <State
      image={image}
      alt={formatMessage({
        id: 'server-error',
        defaultMessage: 'Boom!',
      })}
      header={<FormattedMessage id='server-error-header' defaultMessage='Unexpected server error' />}
      description={
        <FormattedMessage
          id='server-error-description'
          defaultMessage='An unexpected error has occurred on the server side. Contact the administrators for more information.'
        />
      }
      mt={{ base: 20, md: 40, lg: 20 }}
    >
      <HomeButton mt={4} />
    </State>
  );
};

export { ServerErrorState };
