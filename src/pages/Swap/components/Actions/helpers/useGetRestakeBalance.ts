import { useEffect, useState } from 'react';
import axios from 'axios';
import { contractRestake, local_network } from 'config';
import BigNumber from 'bignumber.js';
export const useGetRestakeBalance = () => {
  //const { network } = useGetNetworkConfig();
  const time = new Date();
  const [restakeData, setRestakeData] = useState<any>({});

  //https://devnet-api.multiversx.com/accounts/{}/delegation
  //   [
  //     {
  //       "address": "erd1qqqqqqqqqqqqqpgq3hgxpv4mrxzxs03s6rexh3ngtswxgl2rch9s83xchu",
  //       "contract": "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqz8llllsh6u4jp",
  //       "userUnBondable": "0",
  //       "userActiveStake": "115155941067124103059",
  //       "claimableRewards": "94527256264600604"
  //     }
  //   ]

  const getRestakeData = async () => {
    //using storage to reduce calls
    const expire_test = Number(localStorage.getItem('restake_expire'));
    const storage = JSON.parse(localStorage.getItem('restake_') as string);
    setRestakeData(storage);
    if (time.getTime() < expire_test) {
      return;
    }
    const url = '/accounts/' + contractRestake + '/delegation';
    try {
      const { data } = await axios.get<any[]>(url, {
        baseURL: local_network.apiAddress,
        params: {}
      });
      // if (data.data?.identifier != identifier) {
      //   return;
      // }
      if (data.length > 0) {
        setRestakeData(data[0]);
        const claimableRewards = new BigNumber(data[0].claimableRewards);

        if (claimableRewards.isGreaterThan(10 ** 18)) {
          console.info('Restake available');
        } else {
          //storage of 60 minutes
          const expire = time.getTime() + 1000 * 60 * 60;
          localStorage.setItem('restake_', JSON.stringify(data[0]));
          localStorage.setItem('restake_expire', expire.toString());
        }
      } else {
        console.error('No data available');
      }
    } catch (err) {
      console.error('Unable to fetch restake');
      setRestakeData({});
    }
  };

  useEffect(() => {
    getRestakeData();
  }, []);

  return restakeData;
};
