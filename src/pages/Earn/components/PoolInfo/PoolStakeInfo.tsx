import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import StakeModal from './../StakeModal';
import UnstakeModal from './../UnstakeModal';
import { ActionClaimRewards, ActionStakeRewards } from './../Actions';
import { Button } from './../../../../components/Design';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';

export const PoolStakeInfo = ({
  address,
  stakedToken,
  rewardedToken,
  stakingPosition,
  staked_esdt_info,
  rewarded_esdt_info,
  my_staked_value,
  rest,
  balance,
  image1,
  image2,
  sdecimals,
  rdecimals,
  stakingPositionRewards,
  my_rewards_value,
  canBeStaked,
  userEsdtBalance
}: any) => {
  const [showStake, setShowStake] = useState(false);
  const [showUnstake, setShowUnstake] = useState(false);
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  return (
    <>
      <StakeModal
        userEsdtBalance={userEsdtBalance}
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={balance}
        decimals={sdecimals}
        onClose={() => {
          setHeaderMenu(true), setShowStake(false);
        }}
        show={showStake}
        image1={image1}
        image2={image2}
      />
      <UnstakeModal
        userEsdtBalance={userEsdtBalance}
        rewardedToken={rewardedToken}
        stakedToken={stakedToken}
        balance={stakingPosition.stake_amount}
        decimals={sdecimals}
        onClose={() => {
          setHeaderMenu(true), setShowUnstake(false);
        }}
        show={showUnstake}
      />

      {!address ? (
        <div className='my-stake-section3 '>
          <Link
            className='center'
            to={routeNames.unlock + `/stake/${stakedToken}`}
            data-testid='loginBtn'
          >
            <Button
              borderRadius={40}
              background={'#000000'}
              borderColor={'black'}
              text='Login'
            />
          </Link>
        </div>
      ) : (
        <>
          {stakingPosition.stake_amount < 1 ? (
            <div className='my-stake-section3'>
              <div className='my-stake5'>
                <div className='my-stake6'>My Stake</div>

                <div className='content'>
                  <div className='you-have-no-mex-earned-for-the-moment'>
                    Stake now to earn {rewardedToken}
                  </div>
                </div>
              </div>

              <div className='buttons'>
                <Button
                  borderRadius={40}
                  hasBorder={true}
                  background={'black'}
                  borderColor={['#BD37EC', '#1F67FF']}
                  text={'Stake ' + stakedToken}
                  buttonWidth={'100%'}
                  onClick={() => {
                    setHeaderMenu(false);
                    setShowStake(true);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className='my-stake-section'>
              <div className='my-stake'>
                <div className='my-stake2'>My Stake</div>

                <div className='data'>
                  <div className='left3'>
                    <div className='_18-853-74'>
                      <FormatAmount
                        value={stakingPosition.stake_amount.toString()}
                        decimals={Number(
                          staked_esdt_info?.decimals
                            ? staked_esdt_info?.decimals
                            : 0
                        )}
                        egldLabel={' '}
                        data-testid='staked'
                        digits={2}
                      />
                    </div>

                    {my_staked_value > 0 && (
                      <div className='dollars'>
                        <div className='_98-75'>
                          ${' '}
                          <>
                            {my_staked_value.toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}{' '}
                          </>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='_1-42'>{rest} %</div>
                </div>
              </div>

              <div className='buttons'>
                <Button
                  borderRadius={40}
                  background={'#000000'}
                  borderColor={'black'}
                  text='Stake'
                  onClick={() => {
                    setShowStake(true);
                    setHeaderMenu(false);
                  }}
                />
                <Button
                  borderRadius={40}
                  background={'#000000'}
                  borderColor={'black'}
                  text='Unstake'
                  onClick={() => {
                    setHeaderMenu(false), setShowUnstake(true);
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
      {stakingPositionRewards > 0 && (
        <div className='rewards-section'>
          <div className='top5'>
            <div className='availabled-rewards'>Available rewards</div>

            <div className='left6'>
              <div className='_18-853-744'>
                <FormatAmount
                  value={stakingPositionRewards.toString()}
                  decimals={Number(rdecimals)}
                  egldLabel={' '}
                  data-testid='balance'
                  digits={2}
                />
              </div>
              {rewarded_esdt_info?.price && (
                <div className='dollars3'>
                  <div className='_98-754'>
                    ${' '}
                    {my_rewards_value.toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='illustration'>
            <div className='line-8'></div>

            <div className='line-6'></div>

            <div className='line-7'></div>

            <svg
              className='coin'
              width='50'
              height='30'
              viewBox='0 0 50 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M37.16 26.6624C30.5515 30.4998 19.5691 30.3443 12.6302 26.315C9.2722 24.365 7.47653 21.8653 7.2664 19.3696C6.9446 17.8079 6.91338 16.1674 7.05287 13.461L9.47901 13.9948C10.1692 13.3057 11.0199 12.6585 12.0319 12.0709C18.6404 8.2334 29.6228 8.38894 36.5617 12.4183C37.7665 13.1178 38.7701 13.8882 39.5716 14.7037L41.992 14.156C42.0946 16.2044 42.1494 18.3283 41.9432 20.0518C41.8636 22.4784 40.2763 24.8528 37.16 26.6624Z'
                fill='url(#paint0_linear_1702_1789)'
              />
              <path
                d='M12.3712 22.2965C19.4412 26.4019 30.6558 26.5712 37.4191 22.6439C44.1825 18.7165 43.8908 12.2044 36.8208 8.09895C29.7509 3.99355 18.5363 3.82417 11.7729 7.75154C5.00958 11.6789 5.30126 18.1911 12.3712 22.2965Z'
                fill='url(#paint1_linear_1702_1789)'
                stroke='#062039'
                strokeWidth='0.599071'
              />
              <path
                d='M36.9572 22.3756C30.47 26.1427 19.6695 25.998 12.8331 22.0282C5.9968 18.0585 5.7476 11.7868 12.2348 8.01977C18.7221 4.25273 29.5226 4.39744 36.3589 8.36719C43.1953 12.3369 43.4445 18.6086 36.9572 22.3756Z'
                fill='url(#paint2_linear_1702_1789)'
              />
              <path
                d='M36.9572 22.3756C30.47 26.1427 19.6695 25.998 12.8331 22.0282C5.9968 18.0585 5.7476 11.7868 12.2348 8.01977C18.7221 4.25273 29.5226 4.39744 36.3589 8.36719C43.1953 12.3369 43.4445 18.6086 36.9572 22.3756Z'
                fill='url(#paint3_linear_1702_1789)'
              />
              <path
                d='M36.9572 22.3756C30.47 26.1427 19.6695 25.998 12.8331 22.0282C5.9968 18.0585 5.7476 11.7868 12.2348 8.01977C18.7221 4.25273 29.5226 4.39744 36.3589 8.36719C43.1953 12.3369 43.4445 18.6086 36.9572 22.3756Z'
                stroke='#062039'
                strokeWidth='0.469246'
              />
              <path
                d='M18.1277 19.3637C17.346 18.9097 16.7485 18.4006 16.3353 17.8364C15.9444 17.2722 15.7601 16.6918 15.7825 16.0952C15.816 15.505 16.0672 14.9311 16.5363 14.3734L19.6187 15.0543C19.2501 15.6315 19.144 16.1924 19.3004 16.7372C19.4679 17.2884 19.8867 17.7586 20.5568 18.1477C20.9142 18.3552 21.2771 18.5011 21.6457 18.5854C22.0142 18.6697 22.366 18.6989 22.7011 18.673C23.0473 18.6406 23.3544 18.5465 23.6224 18.3909C23.9128 18.2223 24.0692 18.0277 24.0915 17.8072C24.125 17.5802 24.0133 17.3208 23.7565 17.029L22.1148 15.1418C21.4447 14.3766 21.1543 13.6762 21.2436 13.0407C21.3442 12.3986 21.8132 11.8344 22.6508 11.3481C23.3879 10.92 24.2143 10.6477 25.1301 10.5309C26.0571 10.4207 27.0008 10.4628 27.9612 10.6574C28.9329 10.8584 29.8431 11.2054 30.6918 11.6982C31.4401 12.1327 32.0041 12.6094 32.3838 13.1282C32.7635 13.647 32.9478 14.1756 32.9366 14.7138C32.9366 15.2586 32.7244 15.7904 32.3 16.3092L29.2344 15.638C29.5806 15.1645 29.6811 14.6976 29.5359 14.2372C29.4019 13.7702 29.0334 13.3617 28.4303 13.0115C28.0841 12.8104 27.7211 12.6645 27.3414 12.5737C26.9617 12.4829 26.5931 12.457 26.2358 12.4959C25.8896 12.5283 25.5824 12.6224 25.3144 12.778C25.024 12.9466 24.8621 13.1509 24.8286 13.3909C24.8063 13.6243 24.9235 13.887 25.1804 14.1788L26.8053 16.0173C27.4866 16.7891 27.7825 17.4862 27.6932 18.1088C27.615 18.7378 27.1571 19.2956 26.3195 19.7819C25.5936 20.2035 24.756 20.4694 23.8067 20.5796C22.8686 20.6834 21.9026 20.6347 20.9086 20.4337C19.937 20.2327 19.01 19.876 18.1277 19.3637ZM15.8327 19.743L31.6634 10.5504L33.1711 11.4259L17.3404 20.6185L15.8327 19.743Z'
                fill='#062039'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1702_1789'
                  x1='6.91832'
                  y1='24.902'
                  x2='42.0913'
                  y2='25.44'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop offset='0.0113601' stopColor='#AF82FE' />
                  <stop offset='0.264769' stopColor='#4743F6' />
                  <stop
                    offset='0.63236'
                    stopColor='#5DE5F7'
                    stopOpacity='0.901075'
                  />
                  <stop
                    offset='0.81041'
                    stopColor='#59CAF7'
                    stopOpacity='0.917802'
                  />
                  <stop offset='1' stopColor='#868BFF' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_1702_1789'
                  x1='11.7973'
                  y1='8.03819'
                  x2='24.4702'
                  y2='29.8623'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#BD37EC' />
                  <stop offset='1' stopColor='#1F67FF' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_1702_1789'
                  x1='11.7973'
                  y1='8.03819'
                  x2='24.4702'
                  y2='29.8623'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#BD00FF' />
                  <stop offset='1' stopColor='#1F67FF' />
                </linearGradient>
                <linearGradient
                  id='paint3_linear_1702_1789'
                  x1='16.6238'
                  y1='5.88834'
                  x2='37.9465'
                  y2='11.9536'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white' stopOpacity='0.72' />
                  <stop offset='1' stopColor='white' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>

            <svg
              className='coin2'
              width='68'
              height='40'
              viewBox='0 0 68 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M50.8097 35.4399C41.7611 40.6943 26.7238 40.4813 17.2228 34.9642C12.6248 32.2943 10.1661 28.8714 9.87855 25.4541C9.43795 23.3159 9.39521 21.0696 9.5862 17.3641L12.9083 18.095C13.8533 17.1515 15.0181 16.2654 16.4036 15.4608C25.4521 10.2065 40.4895 10.4195 49.9905 15.9365C51.6399 16.8943 53.014 17.949 54.1114 19.0656L57.4258 18.3155C57.5663 21.1205 57.6413 24.0286 57.359 26.3885C57.2499 29.7111 55.0766 32.9622 50.8097 35.4399Z'
                fill='url(#paint0_linear_1702_1797)'
              />
              <path
                d='M16.9629 29.4059C26.5949 34.9991 41.8645 35.2259 51.0679 29.8816C60.2713 24.5374 59.8807 15.6705 50.2487 10.0774C40.6167 4.48426 25.3471 4.25746 16.1437 9.60171C6.94034 14.946 7.33093 23.8128 16.9629 29.4059Z'
                fill='url(#paint1_linear_1702_1797)'
                stroke='#062039'
                strokeWidth='0.599071'
              />
              <path
                d='M50.606 29.6134C41.6787 34.7973 26.8232 34.5952 17.4248 29.1377C8.02647 23.6802 7.67836 15.0539 16.6057 9.86994C25.5329 4.68601 40.3884 4.88815 49.7868 10.3456C59.1852 15.8031 59.5333 24.4294 50.606 29.6134Z'
                fill='url(#paint2_linear_1702_1797)'
              />
              <path
                d='M50.606 29.6134C41.6787 34.7973 26.8232 34.5952 17.4248 29.1377C8.02647 23.6802 7.67836 15.0539 16.6057 9.86994C25.5329 4.68601 40.3884 4.88815 49.7868 10.3456C59.1852 15.8031 59.5333 24.4294 50.606 29.6134Z'
                fill='url(#paint3_linear_1702_1797)'
              />
              <path
                d='M50.606 29.6134C41.6787 34.7973 26.8232 34.5952 17.4248 29.1377C8.02647 23.6802 7.67836 15.0539 16.6057 9.86994C25.5329 4.68601 40.3884 4.88815 49.7868 10.3456C59.1852 15.8031 59.5333 24.4294 50.606 29.6134Z'
                stroke='#062039'
                strokeWidth='0.469246'
              />
              <path
                d='M24.7492 25.4457C23.6788 24.8242 22.8607 24.1271 22.2949 23.3546C21.7597 22.5821 21.5074 21.7873 21.538 20.9704C21.5838 20.1624 21.9279 19.3765 22.5702 18.6129L26.7906 19.5452C26.286 20.3355 26.1407 21.1036 26.3548 21.8495C26.5842 22.6043 27.1576 23.248 28.0751 23.7808C28.5645 24.065 29.0614 24.2647 29.5661 24.3802C30.0707 24.4956 30.5524 24.5356 31.0111 24.5001C31.4852 24.4557 31.9057 24.3269 32.2727 24.1138C32.6703 23.8829 32.8843 23.6165 32.9149 23.3146C32.9608 23.0038 32.8079 22.6487 32.4562 22.2491L30.2083 19.6651C29.2908 18.6173 28.8932 17.6583 29.0156 16.7881C29.1532 15.9091 29.7954 15.1365 30.9423 14.4706C31.9516 13.8845 33.0831 13.5116 34.337 13.3517C35.6062 13.2008 36.8984 13.2585 38.2135 13.5249C39.5438 13.8002 40.7901 14.2752 41.9523 14.9501C42.9768 15.545 43.749 16.1976 44.2689 16.908C44.7889 17.6184 45.0412 18.3421 45.0259 19.0791C45.0259 19.825 44.7353 20.5531 44.1543 21.2634L39.9567 20.3444C40.4307 19.6962 40.5684 19.0569 40.3696 18.4264C40.1861 17.7871 39.6815 17.2277 38.8557 16.7482C38.3817 16.4729 37.8847 16.2731 37.3648 16.1488C36.8449 16.0245 36.3402 15.989 35.8509 16.0423C35.3769 16.0867 34.9564 16.2154 34.5894 16.4285C34.1918 16.6594 33.97 16.9391 33.9242 17.2676C33.8936 17.5873 34.0541 17.9469 34.4059 18.3465L36.6308 20.8639C37.5636 21.9205 37.9688 22.8751 37.8465 23.7275C37.7394 24.5889 37.1125 25.3525 35.9656 26.0185C34.9716 26.5956 33.8248 26.9597 32.525 27.1107C31.2405 27.2527 29.9178 27.1861 28.5568 26.9109C27.2264 26.6356 25.9572 26.1472 24.7492 25.4457ZM21.6068 25.9652L43.2826 13.3784L45.347 14.5771L23.6712 27.1639L21.6068 25.9652Z'
                fill='#062039'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1702_1797'
                  x1='9.40196'
                  y1='33.0296'
                  x2='57.5617'
                  y2='33.7662'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop offset='0.0113601' stopColor='#AF82FE' />
                  <stop offset='0.264769' stopColor='#4743F6' />
                  <stop
                    offset='0.63236'
                    stopColor='#5DE5F7'
                    stopOpacity='0.901075'
                  />
                  <stop
                    offset='0.81041'
                    stopColor='#59CAF7'
                    stopOpacity='0.917802'
                  />
                  <stop offset='1' stopColor='#868BFF' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_1702_1797'
                  x1='16.0815'
                  y1='9.93867'
                  x2='33.4335'
                  y2='39.8208'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#BD37EC' />
                  <stop offset='1' stopColor='#1F67FF' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_1702_1797'
                  x1='16.0815'
                  y1='9.93867'
                  x2='33.4335'
                  y2='39.8208'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#BD00FF' />
                  <stop offset='1' stopColor='#1F67FF' />
                </linearGradient>
                <linearGradient
                  id='paint3_linear_1702_1797'
                  x1='22.6901'
                  y1='6.99504'
                  x2='51.8857'
                  y2='15.2997'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white' stopOpacity='0.72' />
                  <stop offset='1' stopColor='white' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>

            <svg
              className='coin3'
              width='37'
              height='22'
              viewBox='0 0 37 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M28.0157 19.4121C23.1991 22.209 15.1946 22.0956 10.1372 19.1589C7.68856 17.737 6.37971 15.9139 6.22767 14.094C5.99366 12.9566 5.97103 11.7612 6.07261 9.79032L7.84065 10.1794C8.34369 9.67709 8.96369 9.20543 9.70119 8.77718C14.5178 5.98027 22.5222 6.09364 27.5796 9.03039C28.4576 9.54026 29.1891 10.1017 29.7733 10.6961L31.5379 10.2968C31.6129 11.7923 31.6528 13.343 31.5016 14.6003C31.4411 16.3667 30.2843 18.0947 28.0157 19.4121Z'
                fill='url(#paint0_linear_1702_1805)'
              />
              <path
                d='M9.8787 16.2707C15.0671 19.2835 23.3038 19.4107 28.2752 16.5239C33.2466 13.6371 33.0275 8.85418 27.8391 5.84136C22.6507 2.82854 14.414 2.70134 9.44264 5.58815C4.47125 8.47496 4.6903 13.2579 9.8787 16.2707Z'
                fill='url(#paint1_linear_1702_1805)'
                stroke='#062039'
                strokeWidth='0.599071'
              />
              <path
                d='M27.8132 16.2557C23.1179 18.9821 15.2954 18.8796 10.3406 16.0024C5.38584 13.1253 5.20927 8.58287 9.90457 5.85638C14.5999 3.12989 22.4224 3.23243 27.3772 6.10959C32.332 8.98676 32.5086 13.5292 27.8132 16.2557Z'
                fill='url(#paint2_linear_1702_1805)'
              />
              <path
                d='M27.8132 16.2557C23.1179 18.9821 15.2954 18.8796 10.3406 16.0024C5.38584 13.1253 5.20927 8.58287 9.90457 5.85638C14.5999 3.12989 22.4224 3.23243 27.3772 6.10959C32.332 8.98676 32.5086 13.5292 27.8132 16.2557Z'
                fill='url(#paint3_linear_1702_1805)'
              />
              <path
                d='M27.8132 16.2557C23.1179 18.9821 15.2954 18.8796 10.3406 16.0024C5.38584 13.1253 5.20927 8.58287 9.90457 5.85638C14.5999 3.12989 22.4224 3.23243 27.3772 6.10959C32.332 8.98676 32.5086 13.5292 27.8132 16.2557Z'
                stroke='#062039'
                strokeWidth='0.469246'
              />
              <path
                d='M14.144 14.0923C13.5742 13.7614 13.1387 13.3904 12.8376 12.9791C12.5527 12.5679 12.4184 12.1449 12.4347 11.71C12.4591 11.2799 12.6422 10.8616 12.9841 10.4551L15.2307 10.9514C14.962 11.3721 14.8847 11.7809 14.9987 12.178C15.1208 12.5797 15.426 12.9224 15.9144 13.206C16.1749 13.3573 16.4394 13.4636 16.708 13.5251C16.9766 13.5865 17.233 13.6078 17.4772 13.5889C17.7296 13.5652 17.9534 13.4967 18.1488 13.3833C18.3604 13.2604 18.4744 13.1186 18.4906 12.9579C18.5151 12.7924 18.4337 12.6034 18.2464 12.3907L17.0499 11.0152C16.5615 10.4575 16.3499 9.94701 16.415 9.4838C16.4883 9.01586 16.8301 8.60465 17.4406 8.25015C17.9778 7.93819 18.5802 7.73968 19.2476 7.6546C19.9232 7.57424 20.611 7.60497 21.3111 7.74677C22.0192 7.89329 22.6826 8.14617 23.3012 8.50539C23.8466 8.82207 24.2577 9.16948 24.5344 9.54761C24.8112 9.92574 24.9455 10.311 24.9373 10.7033C24.9373 11.1003 24.7827 11.4879 24.4734 11.866L22.239 11.3768C22.4913 11.0318 22.5646 10.6915 22.4588 10.3559C22.3611 10.0155 22.0925 9.71777 21.6529 9.46253C21.4006 9.31601 21.1361 9.20966 20.8593 9.14348C20.5826 9.07731 20.3139 9.0584 20.0535 9.08676C19.8011 9.1104 19.5773 9.17893 19.3819 9.29237C19.1703 9.41526 19.0523 9.56415 19.0279 9.73904C19.0116 9.9092 19.097 10.1006 19.2843 10.3133L20.4686 11.6533C20.9651 12.2158 21.1808 12.7239 21.1157 13.1777C21.0587 13.6361 20.725 14.0426 20.1145 14.3971C19.5854 14.7044 18.975 14.8982 18.2831 14.9785C17.5993 15.0541 16.8952 15.0187 16.1708 14.8722C15.4626 14.7256 14.787 14.4657 14.144 14.0923ZM12.4713 14.3688L24.0094 7.66878L25.1083 8.30687L13.5701 15.0069L12.4713 14.3688Z'
                fill='#062039'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_1702_1805'
                  x1='5.97454'
                  y1='18.1291'
                  x2='31.6103'
                  y2='18.5212'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop offset='0.0113601' stopColor='#AF82FE' />
                  <stop offset='0.264769' stopColor='#4743F6' />
                  <stop
                    offset='0.63236'
                    stopColor='#5DE5F7'
                    stopOpacity='0.901075'
                  />
                  <stop
                    offset='0.81041'
                    stopColor='#59CAF7'
                    stopOpacity='0.917802'
                  />
                  <stop offset='1' stopColor='#868BFF' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_1702_1805'
                  x1='9.53067'
                  y1='5.83786'
                  x2='18.7672'
                  y2='21.7442'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#BD37EC' />
                  <stop offset='1' stopColor='#1F67FF' />
                </linearGradient>
                <linearGradient
                  id='paint2_linear_1702_1805'
                  x1='9.53067'
                  y1='5.83786'
                  x2='18.7672'
                  y2='21.7442'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#BD00FF' />
                  <stop offset='1' stopColor='#1F67FF' />
                </linearGradient>
                <linearGradient
                  id='paint3_linear_1702_1805'
                  x1='13.0484'
                  y1='4.27096'
                  x2='28.5893'
                  y2='8.69155'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='white' stopOpacity='0.72' />
                  <stop offset='1' stopColor='white' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <ActionClaimRewards
            stakedToken={stakedToken}
            rewardedToken={rewardedToken}
            rewardsAmount={stakingPositionRewards}
          />{' '}
          {stakedToken == rewardedToken && (
            <ActionStakeRewards
              stakedToken={stakedToken}
              rewardedToken={rewardedToken}
              rewardsAmount={stakingPositionRewards}
            />
          )}
        </div>
      )}
      {canBeStaked && (
        <>
          {' '}
          <Link
            to={routeNames.stake + `/${rewardedToken}`}
            className='butLine bouton-visiter'
            data-testid='loginBtn'
          >
            Stake {rewardedToken}
          </Link>
        </>
      )}
    </>
  );
};
