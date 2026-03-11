import { useEffect, useState } from 'react';
import axios from 'axios'; // Importez Axios
import { environment } from 'config';

export const useGetCollectionsApi = () => {
  const [stakedTokens, setStakedTokens] = useState<string[]>([]);

  const getStakedTokens = async () => {
    if (environment !== 'mainnet') {
      setStakedTokens([]);
      return;
    }
    try {
      const response = await axios.get('https://test.mvx.fr/collections');

      if (response.status === 200 && response.data) {
        const tokens = response.data;
        setStakedTokens(tokens);
      }
    } catch (err) {
      console.error('Unable to call getStakedCollections', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
