import { useEffect, useState } from 'react';
import axios from 'axios';
import { local_network } from 'config';
import toHex from 'helpers/toHex';
export const useGetNft = (
  collection: string,
  nonce: number,
  isOpen: boolean
) => {
  const [nft, setNft] = useState<any>({});
  const noncetoHex = toHex(nonce);
  const identifier: string = collection;
  const load: any = localStorage.getItem(identifier + '-' + noncetoHex);
  const storage = JSON.parse(load);
  const time = new Date();
  const getNft = async () => {
    if (!isOpen) {
      return;
    }
    if (time.getTime() < storage?.expire) {
      // const load: any = localStorage.getItem(identifier + '-' + noncetoHex);
      // const storage = JSON.parse(load);
      setNft(storage);
      return;
    }
    if (nonce < 1 || !identifier) {
      setNft([]);
      return;
    }
    const url = '/nfts/' + identifier + '-' + noncetoHex;
    try {
      const { data } = await axios.get<any>(url, {
        baseURL: local_network.apiAddress,
        params: {}
      });
      setNft({ media: data?.media });
      localStorage.setItem(
        identifier + '-' + noncetoHex,
        JSON.stringify({
          media: data?.media,
          expire: time.getTime() + 1000 * 60 * 60 * 24 * 30
        })
      );
    } catch (err) {
      console.error('Unable to fetch Tokens');
      setNft([]);
    }
  };

  useEffect(() => {
    getNft();
  }, [nonce, collection, isOpen]);

  return nft;
};
