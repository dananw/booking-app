import { useQueryClient } from 'react-query';

import { managementHttpService } from 'utils/http';
import { Logger, LogLevel } from 'utils/logger';
import { useMutation } from 'shared/Suspense';

import { enterpriseQueryKey } from '../query';
import { ICreateEnterpriseDto, IEnterprise } from '../../application/types';

export const useCreateEnterprise = (enterpriseId?: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation<void, ICreateEnterpriseDto>(model => {
    if (enterpriseId) {
      return managementHttpService.put(`enterprises/${enterpriseId}`, model);
    }
    return managementHttpService.post(`enterprises`, model);
  });

  const handler = (model: ICreateEnterpriseDto) => {
    return mutateAsync(model)
      .then(async () => {
        if (!enterpriseId) return;

        await queryClient.setQueryData<IEnterprise | undefined>(enterpriseQueryKey(enterpriseId), input => {
          if (!input) return;

          return { ...input, ...model };
        });
      })
      .catch(e => {
        Logger.log({
          name: e.name,
          message: JSON.stringify(e),
          level: LogLevel.Error,
        });
        throw e;
      });
  };

  return [handler, isLoading] as const;
};
