import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader } from '@chakra-ui/react';

import { Button } from 'shared/Button';
import { SubmitButton } from 'shared/Form';

import { useFacilityConsumer } from 'modules/context';
import { useAddEmployee } from 'modules/employees/infrastructure/command';

import { AddEmployeeForm, useAddEmployeeNotification } from '../../components';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddEmployeeModal = ({ isOpen, onClose }: IProps) => {
  const { facilityId } = useFacilityConsumer();

  const [handler, isLoading] = useAddEmployee(facilityId);
  const { showSuccessNotification, showFailureNotification } = useAddEmployeeNotification();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FormattedMessage id='add-new-employee' defaultMessage='Add new employee' />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AddEmployeeForm
            onSubmit={async model => {
              try {
                await handler(model);
                showSuccessNotification();
              } catch (e) {
                showFailureNotification();
              } finally {
                onClose();
              }
            }}
          />
        </ModalBody>
        <ModalFooter>
          <SubmitButton isLoading={isLoading} colorScheme='green' type='submit' form='add-employee-form' />
          <Button colorScheme='gray' ml={3} onClick={onClose}>
            <FormattedMessage id='close' defaultMessage='Close' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { AddEmployeeModal };
