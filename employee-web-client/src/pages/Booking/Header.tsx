import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiCalendar } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

const Header = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const title = formatMessage({
    id: 'add-reservation',
    defaultMessage: 'Add reservation',
  });

  return (
    <Flex w='100%' justify='space-between'>
      <VStack as='header' align='flex-start'>
        <Heading as='h1' lineHeight={8} fontWeight='900'>
          <FormattedMessage id='bookings-heading' defaultMessage='Bookings' />
        </Heading>
        <Text as='h2' lineHeight={4}>
          <FormattedMessage id='bookings-subheading' defaultMessage='Manage yours bookings' />
        </Text>
      </VStack>
      {isMobileOnly ? (
        <IconButton
          onClick={() => push('add-booking')}
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiCalendar} color='gray.800' />}
        />
      ) : (
        <Button onClick={() => push('add-booking')} colorScheme='primary' leftIcon={<Icon path={mdiCalendar} />}>
          {title}
        </Button>
      )}
    </Flex>
  );
};

export { Header };
