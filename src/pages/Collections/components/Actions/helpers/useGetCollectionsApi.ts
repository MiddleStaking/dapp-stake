import { useEffect, useState } from 'react';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { network } from 'config';
import { smartContract } from './smartContract';
import axios from 'axios';

const resultsParser = new ResultsParser();

export const useGetCollectionsApi = () => {
  const [stakedTokens, setStakedTokens] = useState<any>();
  const time = new Date();

  const getStakedTokens = async () => {
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('staked_collections_api_expire')
    );

    const item = localStorage.getItem('staked_api_collections');
    const storage = item && item !== 'undefined' ? JSON.parse(item) : null;

    setStakedTokens(storage ? storage : []);

    try {
      const { data } = await axios.get('https://test.mvx.fr/collections');
      if (data.length > 0) {
        setStakedTokens(data);
        // //storage of 15 minutes
        const expire = time.getTime() + 1000 * 60 * 1;
        // //const expire = time.getTime() + 1000 * 60 * 15;
        localStorage.setItem('staked_collections_api', JSON.stringify(data));

        localStorage.setItem(
          'staked_collections_api_expire',
          expire.toString()
        );
      }
    } catch (err) {
      console.error('Unable to call getStakedCollections from api', err);
    }
    if (time.getTime() < expire_test) {
      return;
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
