import React, { FC, useState } from 'react';
import './accordionEmpty.scss';
import MyStakeSection from 'pages/CollectionDetail/components/CardOfCollection/component/MyStakeSection';
import notFound from '../../../../../../assets/img/notfoundc.svg';
import { useWindowDimensions } from 'components/DimensionScreen';
import SandClock from 'pages/CollectionDetail/components/AccordionWrap/component/SandClock';

interface CardPoolrops {
  userStakedNft: any[];
  address: string;
  collection_identifier: string;
  pool_id: number;
}

const Accordion: FC<CardPoolrops> = ({
  userStakedNft,
  address,
  collection_identifier,
  pool_id
}) => {
  // const [nFtCanStake, setNFtCanStake] = useState([]);
  // const [showMoal, setShowMoal] = useState(false);
  // const [myTokenStakedNumber, setMyTokenStakedNumber] = useState(0);

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
                (item: any) => item?.staked_nft?.unbound < item?.current_block
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: width > 855 ? 'row' : 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    className='Label_Details_Collection'
                  >
                    <div
                      style={{
                        borderRadius: '50px',
                        width: '28px',
                        height: '28px',
                        background: 'black'
                      }}
                    >
                      <img
                        style={{
                          borderRadius: '50px',
                          width: '28px',
                          height: '28px'
                        }}
                        src={notFound}
                        alt=''
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: width > 855 ? 'row' : 'row',
                      gap: '10px'
                    }}
                  ></div>
                </div>
                <hr
                  style={{
                    margin: '5px 0 ',
                    width: '100%',
                    height: '0px',
                    marginTop: 0,
                    marginBottom: 0,
                    border: ' 1px solid #634ACB99'
                  }}
                />
                <div
                  className='accordion-contents-buttons'
                  style={{
                    display: 'flex',
                    flexDirection: width > 855 ? 'row' : 'column',
                    gap: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      textAlign: width > 855 ? 'center' : 'center'
                    }}
                  ></div>
                </div>
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
