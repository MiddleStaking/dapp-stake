import { useEffect, useState } from 'react';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers';
import {
  Abi,
  Address,
  ContractFunction,
  decodeString,
  DevnetEntrypoint
} from '@multiversx/sdk-core';
import { useGetNetworkConfig } from 'lib';

type AgencyMeta = { name: string; website: string; keybase: string };

export const useAgencyMetaData = (delegationContractBech32: string) => {
  const { network } = useGetNetworkConfig();
  const [data, setData] = useState<AgencyMeta | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>(
    'idle'
  );
  const [error, setError] = useState<unknown>(null);

  const entrypoint = new DevnetEntrypoint({ url: network.apiAddress });
  const abi = Abi.create({
    endpoints: [
      {
        name: 'getMetaData',
        inputs: [],
        outputs: [
          { name: 'name', type: 'string' },
          { name: 'website', type: 'string' },
          { name: 'keybase', type: 'string' }
        ]
      }
    ]
  });
  const controller = entrypoint.createSmartContractController(abi);

  const fetchMeta = async () => {
    setStatus('loading');
    setError(null);
    try {
      const provider = new ApiNetworkProvider(network.apiAddress);

      const contractAddress = Address.newFromBech32(delegationContractBech32);

      const res = await controller.query({
        contract: contractAddress,
        function: 'getMetaData',
        arguments: [] // vue sans args
      });

      // Retour = bytes[]; on map -> string
      // const [name, website, keybase] = res
      //   .getReturnDataParts()
      //   .map(decodeString);
      // setData({ name, website, keybase });
      setStatus('loaded');
    } catch (e) {
      console.error('[useAgencyMetaData] getMetaData failed', e);
      setError(e);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!data) void fetchMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delegationContractBech32, network.apiAddress]);

  return { data, status, error, refetch: fetchMeta };
};
