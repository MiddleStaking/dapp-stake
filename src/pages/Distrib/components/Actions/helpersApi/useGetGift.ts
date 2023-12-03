import { useEffect, useState } from 'react';
import axios from 'axios'; // Importez Axios

export const useGetGift = () => {
  const [stakedTokens, setStakedTokens] = useState<any>([]);

  const getStakedTokens = async () => {
    try {
      const response = await axios.get('https://test.mvx.fr/gift');

      if (response.status === 200 && response.data) {
        const tokens = response.data;
        setStakedTokens(tokens);
      }
    } catch (err) {
      console.error('Unable to call getGift', err);
    }
  };

  useEffect(() => {
    getStakedTokens();
  }, []);

  return stakedTokens;
};
