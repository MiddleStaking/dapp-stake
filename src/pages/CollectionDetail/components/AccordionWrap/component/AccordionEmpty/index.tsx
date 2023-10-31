import React, { FC, useState } from 'react';
import './accordionEmpty.scss';
import { useWindowDimensions } from 'components/DimensionScreen';
import SandClock from 'pages/CollectionDetail/components/AccordionWrap/component/SandClock';
import MyStakeSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyStakeSection';

interface CardPoolrops {
  userStakedNft: any[];
  address: string;
  collection_identifier: string;
  pool_id: number;
}

const Accordion: FC<CardPoolrops> = ({ userStakedNft, pool_id }) => {
  const [isOpen, setIsOpen] = useState(true);

  // useEffect(() => {
  //   if (
  //     userStakedNft.filter(
  //       (item) =>
  //         item.staked_nft.pool_id.toString() ==
  //         collectionReward?.pool_id.toString()
  //     ).length > 0
  //   ) {
  //     setIsOpen(true);
  //   }
  // }, [userStakedNft]);

  // const rewarded_esdt_info = useGetESDTInformations(rtoken);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // const my_token_staked_number = userStakedNft.filter(
  //   (item: any) =>
  //     item?.staked_nft?.pool_id.toString() ==
  //     collectionReward?.pool_id.toString()
  // ).length;

  // in collectionReward : {
  // block_to_max
  // identifier : token rewards
  // last_fund_block : ne sert a rien
  // nonce : all nfts if token == 0 else nonce token == nonce
  // paused : false ou true (empeche les personnes de staked)
  // pool_id : id unique de la pool
  // rewards : nombre de token qui en attente de destribution
  // total_rewarded : nombre de token destrib
  // total_staked : nombre de nft au total stake dans la pool
  // unbounding
  // vesting
  //}

  const { width } = useWindowDimensions();

  return (
    <>
      {/* ORPHAN NFT after pool deletion  */}
      <div className='pool-details_Collection'>
        {userStakedNft
          .filter((item: any) => item?.staked_nft?.unbound > 0)
          .map((item) => Number(item.staked_nft.unbound)).length > 0 && (
          <div
            style={{
              position: 'relative',
              width: '120px',
              backgroundColor: 'black',
              borderRadius: '8px',
              border: '1px solid #695885',
              height: '32px',
              marginBottom: '-10px',
              marginLeft: '10px',
              paddingLeft: '11px'
            }}
          >
            Unbounding{' '}
            {userStakedNft
              .filter(
                (item: any) =>
                  item?.staked_nft?.unbound < item?.current_block &&
                  item?.staked_nft?.unbound > 0
              )
              .map((item) => Number(item.staked_nft.unbound)).length > 0 ? (
              <>✅</>
            ) : (
              <SandClock />
            )}
          </div>
        )}
        <div className={`Groupe_Details_Collection ${isOpen ? 'open' : ''}`}>
          <div className='Pool_Details_Collection'>
            <div className='Details_Collection'>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: width > 855 ? 'calc(100% - 10px)' : '100%',
                  gap: '10px',
                  textAlign: 'center'
                }}
              >
                Oprhan&apos;s NFT (no more pool&apos;s rewards)
              </div>
              <div className='svgAccordeons' onClick={toggleAccordion}>
                {/* ~ 1,5/NFT/Day{' '} */}
                <svg
                  width={'16px'}
                  height={'16px'}
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                    fill={isOpen ? 'green' : '#fff'}
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={`accordion-contents ${isOpen ? 'open' : ''}`}>
          {/* <div className={`accord-contents ${openAccordion ? 'open' : ''}`}> */}
          <div className={'NftWrapContent'}>
            {/* {userNftBalance && userNftBalance.length > 0 && (
              <MyNftSection
                pool_nonce={collectionReward?.nonce}
                pool_id={collectionReward?.pool_id}
                nft_balance={userNftBalance}
              />
            )} */}
            {userStakedNft && userStakedNft.length > 0 && (
              <MyStakeSection
                isOpen={isOpen}
                pool={pool_id}
                unbounding={1}
                staked_balance={userStakedNft}
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Accordion;
