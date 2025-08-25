// import React from 'react';
// import { defaultToken } from 'config';
// import { useGetSwapedTokens } from './Actions/helpers';
// import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
// import { LiquidInfo } from './LiquidInfo';
// import { useGetAllLp } from 'pages/Swap/components/Actions/helpers';
// import './LiquidityLayout.css';
// import BigNumber from 'bignumber.js';

// export const LiquidityLayout = () => {
//   const swapedTokens: string[] = useGetSwapedTokens();
//   const allLp = useGetAllLp();
//   const userEsdtBalance = useGetUserESDT();

//   const sortedLp = allLp
//     ? [...allLp].sort((a, b) =>
//         new BigNumber(b.first_token_amount)
//           .minus(new BigNumber(a.first_token_amount))
//           .toNumber()
//       )
//     : [];

//   return (
//     <div className='center'>
//       <div className='liquidity-table'>
//         <div className='table-header'>
//           <div className='table-cell'>TOKEN</div>
//           <div className='table-cell'>LP1</div>
//           <div className='table-cell'>LP2</div>
//           <div className='table-cell'>VALUE1</div>
//           <div className='table-cell'>VALUE2</div>
//           <div className='table-cell'>DIFF</div>
//           <div className='table-cell'>ACTIONS</div>
//         </div>
//         {sortedLp &&
//           sortedLp.map((lp) => (
//             <LiquidInfo
//               userEsdtBalance={userEsdtBalance}
//               lp={lp}
//               key={lp.lp_token}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };
