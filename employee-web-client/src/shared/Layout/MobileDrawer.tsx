import React from 'react';
import {
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';

import { ToggleThemeButton, NavButton, useGetLinks } from './Navigation';

interface IProps {
  extended: boolean;
  toggle: () => void;
  facilityId?: string;
}

const MobileDrawer = ({ toggle, extended, facilityId }: IProps) => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const background = useColorModeValue('white', 'gray.800');
  const allLinks = useGetLinks();

  const links = facilityId ? allLinks : [allLinks[0]];

  return (
    <Drawer isOpen={extended} placement='right' onClose={toggle} size='xs'>
      <DrawerOverlay>
        <DrawerContent backgroundColor={background}>
          <DrawerCloseButton />
          <DrawerBody as={VStack} justify='space-between' width='100%' height='100%' pb={4} pt={16}>
            <VStack as='ul' px={2} spacing={2} align='flex-start' width='100%'>
              {links.map(({ label, to, path, signature }) => (
                <HStack w='100%' key={to} as='li'>
                  <NavButton onClick={() => push(`/${to}`)} path={path} isActive={pathname.includes(signature)}>
                    <Text pl={2} fontWeight='700' fontSize='md'>
                      {label}
                    </Text>
                  </NavButton>
                </HStack>
              ))}
            </VStack>
            <VStack align='flex-start' width='100%'>
              <HStack>
                <ToggleThemeButton extended={extended} fontSize='md' />
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export { MobileDrawer };
