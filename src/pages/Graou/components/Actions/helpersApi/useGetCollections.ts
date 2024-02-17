import { useEffect, useState } from 'react';
import axios from 'axios'; // Importez Axios

export const useGetCollectionsApi = () => {
  const [stakedTokens, setStakedTokens] = useState<string[]>([]);

  const getStakedTokens = async () => {
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
