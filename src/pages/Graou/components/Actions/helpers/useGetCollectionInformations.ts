// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { local_network } from 'config';
// export const useGetCollectionInformations = (
//   identifier: string,
//   size: number = 5
// ) => {
//   //const { network } = useGetNetworkConfig();
//   const time = new Date();
//   const [esdtInfo, setEsdtInfo] = useState<any>([]);

//   // https://api.multiversx.com/collections/HYPEY-794a10/nfts?from=0&size=5&withSupply=true&withScamInfo=true&sort=nonce&order=asc;

//   const url =
//     '/collections/' +
//     identifier +
//     '/nfts?from=0&size=' +
//     size +
//     '&withSupply=true&withScamInfo=true&sort=nonce&order=asc';
//   const getEsdtInfo = async () => {
//     if (!identifier) {
//       return;
//     }
//     //using storage to reduce calls
//     const expire_test = Number(
//       localStorage.getItem('collection_info_' + identifier + size + '_expire')
//     );
//     const storage = JSON.parse(
//       localStorage.getItem('collection_info_' + identifier + size) as string
//     );
//     setEsdtInfo(storage);
//     if (time.getTime() < expire_test) {
//       return;
//     }

//     try {
//       const { data } = await axios.get<[]>(url, {
//         baseURL: local_network.apiAddress,
//         params: {}
//       });
//       // if (data.data?.identifier != identifier) {
//       //   return;
//       // }
//       setEsdtInfo(data);
//       //storage of 10 minutes
//       const expire = time.getTime() + 1000 * 60 * 10;
//       localStorage.setItem(
//         'collection_info_' + identifier + size,
//         JSON.stringify(data)
//       );
//       localStorage.setItem(
//         'collection_info_' + identifier + size + '_expire',
//         expire.toString()
//       );
//     } catch (err) {
//       console.error('Unable to fetch Collections');
//       setEsdtInfo([]);
//     }
//   };

//   useEffect(() => {
//     getEsdtInfo();
//   }, [identifier]);

//   return esdtInfo;
// };
