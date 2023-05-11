import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import axios from 'axios';

export const useGetESDTCompute = (identifier: string) => {
  const { network } = useGetNetworkConfig();
  const time = new Date();
  const [esdtInfo, setEsdtInfo] = useState<any>({});
  // {
  //   type: 'FungibleESDT',
  //   identifier: 'STAKE-1c6362',
  //   name: 'MiddleStaking',
  //   ticker: 'MID',
  //   owner: 'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs',
  //   minted: '0',
  //   burnt: '243400000000000000000000000',
  //   initialMinted: '250000000000000000000000000',
  //   decimals: 18,
  //   isPaused: false,
  //   assets: {
  //     website: 'https://middlestaking.fr',
  //     description:
  //       'The $MID is a service Token allowing users to get involved into staking without a full EGLD.',
  //     status: 'active',
  //     pngUrl: 'https://media.elrond.com/tokens/asset/MID-ecb7bf/logo.png',
  //     svgUrl: 'https://media.elrond.com/tokens/asset/MID-ecb7bf/logo.svg',
  //     social: {
  //       email: 'esdt@middlestaking.fr',
  //       twitter: 'https://twitter.com/MiddleStaking',
  //       whitepaper: 'https://files.middlestaking.fr/mid-whitepaper.pdf'
  //     }
  //   },
  //   transactions: 4210,
  //   accounts: 5989,
  //   canUpgrade: true,
  //   canMint: true,
  //   canBurn: true,
  //   canChangeOwner: true,
  //   canPause: true,
  //   canFreeze: true,
  //   canWipe: true,
  //   supply: '6600000',
  //   circulatingSupply: '6600000',
  //   roles: [
  //     {
  //       canLocalMint: true,
  //       canLocalBurn: true,
  //       roles: ['ESDTRoleLocalBurn', 'ESDTRoleLocalMint'],
  //       address:
  //         'erd1c3nfhvj5jgulw62yndr6fgh0fcmut34fful733tl998zpt9s2k5qrxumhs'
  //     }
  //   ]
  // }
  const baseURL = 'https://api.middlestaking.fr';
  const url = '/tokens.php?var1=' + identifier;
  const getEsdtInfo = async () => {
    if (!identifier || identifier != 'MIDUSDC-3d93f4') {
      return;
    }
    //using storage to reduce calls
    const expire_test = Number(
      localStorage.getItem('esdtc_' + identifier + '_expire')
    );
    const storage = JSON.parse(
      localStorage.getItem('esdtc_' + identifier) as string
    );
    setEsdtInfo(storage);
    if (time.getTime() < expire_test) {
      return;
    }

    try {
      const { data } = await axios.get<[]>(url, {
        baseURL: baseURL,
        params: {}
      });
      setEsdtInfo(data);
      //storage of 60 minutes
      const expire = time.getTime() + 1000 * 60 * 60;
      localStorage.setItem('esdtc_' + identifier, JSON.stringify(data));
      localStorage.setItem(
        'esdtc_' + identifier + '_expire',
        expire.toString()
      );
    } catch (err) {
      console.error('Unable to fetch Tokens');
      setEsdtInfo([]);
    }
  };

  useEffect(() => {
    getEsdtInfo();
  }, [identifier]);

  return esdtInfo;
};
