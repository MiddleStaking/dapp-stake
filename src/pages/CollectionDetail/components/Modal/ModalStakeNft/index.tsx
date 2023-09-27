import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Button } from 'components/Design';
import DropdownMenu from 'components/Design/DropdownMenu';
import { defaultToken } from 'config';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import React, { useState, useEffect } from 'react';
import { ActionStakeNft } from '../../Actions';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';

export const ModalStakeNft = (props: any) => {
  const [openAccordions, setOpenAccordions] = useState([false]);
  const { address } = useGetAccountInfo();

  console.log(props.userNFTBalance);

  const [stoken, setStoken] = React.useState<any>([]);
  useEffect(() => {
    if (props.userNFTBalance.length == 1) {
      setStoken(props.userNFTBalance);
    }
  }, []);

  const toggleAccordion = (index: number) => {
    const newOpenAccordions = [...openAccordions];
    newOpenAccordions[index] = !newOpenAccordions[index];
    setOpenAccordions(newOpenAccordions);
  };

  return (
    <div className='centerStakeModal_Collection'>
      <div
        // style={{
        //   minHeight: '470px'
        // }}
        className='backgroundStakeModal_Collection'
      >
        <div className='modalStakeModal_Collection'>
          <div className='contentStakeModal_Collection'>
            <div className='modalLabelStakeModal_Collection'>Stake Nft</div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '30px 0px'
              }}
            >
              {/* <HexagoneGroupe collectionInfo={getCollectionInformations} /> */}

              {stoken[0]?.media && stoken.length == 1 ? (
                <HexagoneNFT
                  format={
                    stoken[0]?.media[0]?.fileType == 'video/mp4'
                      ? 'video/mp4'
                      : 'image'
                  }
                  url={stoken[0]?.media[0]?.url}
                  width={100}
                  withBorder={true}
                  borderWidth={2.5}
                  borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                  withShadow={true}
                />
              ) : (
                <HexagoneGroupe collectionInfo={props.userNFTBalance} />
              )}
            </div>

            <div className='pool-details_StakeModal_black_Collection'>
              <div className='GroupeDetails_StakeModal_black_Collection'>
                <div className='PoolDetails_StakeModal_black_Collection'>
                  <div className='DetailsInfo_black_Collection'>
                    <div className='LabelDetailsInfo_black_Collection'>
                      Select Nft :
                    </div>
                    <div className='ValueDetailsInfo_black_Collection'>
                      <DropdownMenu
                        BoxShadowActive={false}
                        BoxShadowColor='transparent'
                        BoxShadowActiveColor='0 0 24px 0 '
                        inputHeight={'15px'}
                        inputWidth='179px'
                        borderRadius='54'
                        hasBorder={false}
                        borderColor='#695885'
                        borderRadiusOptions='5px'
                        options={
                          props.userNFTBalance
                            ? props.userNFTBalance.map((item: any) => ({
                                text: item.identifier,
                                value: item
                              }))
                            : []
                        }
                        defaultValue={
                          props.userNFTBalance.length == 1
                            ? stoken[0]?.identifier
                            : 'select collection'
                        }
                        disableOption={false}
                        onSelect={function (value: any): void {
                          setStoken([value]);
                        }}
                      />
                    </div>
                    <div
                      className='svgAccordeons'
                      onClick={() => toggleAccordion(0)}
                    >
                      <svg
                        width={'16px'}
                        height={'16px'}
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        style={{
                          transform: openAccordions[0]
                            ? 'rotate(180deg)'
                            : 'none',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                          fill={openAccordions[0] ? 'green' : '#fff'}
                        />
                      </svg>
                    </div>
                  </div>
                  <div
                    className={`accordion-content ${
                      openAccordions[0] ? 'open' : ''
                    }`}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sit, expedita magnam velit quidem fugiat nulla voluptatibus,
                    quisquam vel at doloribus reiciendis tenetur! Ea quas
                    consequuntur ipsam modi natus saepe obcaecati?
                  </div>
                </div>
              </div>
            </div>
            <div className='pool-details_StakeModal_Collection'>
              <div className='GroupeDetails_StakeModal_Collection'>
                {stoken.length == 1 ? (
                  <div className='PoolDetails_StakeModal_Collection'>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>
                        royalties
                      </div>
                      <div className='ValueDetailsInfo_Collection'>
                        {stoken[0]?.royalties}
                      </div>
                    </div>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>name</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {stoken[0]?.name}
                      </div>
                    </div>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>nonce</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {stoken[0]?.nonce}
                      </div>
                    </div>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>tags</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {stoken[0]?.tags[0] == '' &&
                        stoken[0]?.tags?.length == 1
                          ? 'no tags'
                          : stoken[0]?.tags
                              ?.slice(
                                0,
                                stoken[0]?.tags?.length < 3
                                  ? stoken[0]?.tags?.length
                                  : 3
                              )
                              .map((tag: string) => tag + ' ')}
                      </div>
                    </div>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>type</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {stoken[0]?.type}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center'
                    }}
                  >
                    aucun nft
                  </div>
                )}
              </div>
            </div>
            <div className='bottomGroupeModal' onClick={props.onClose}>
              <div className='bottomModal'>
                <Button
                  buttonWidth='100%'
                  hasBorder={true}
                  borderRadius={40}
                  background={'black'}
                  borderColor={['#BD37EC', '#1F67FF']}
                  text='Cancel'
                  onClick={props.onClose}
                />
              </div>

              <div className='bottomModal'>
                <ActionStakeNft
                  address={address}
                  stakedNFT={stoken[0]?.collection}
                  user_fund={1}
                  pool_id={props.pool_id}
                  nft_nonce={stoken[0]?.nonce}
                />
              </div>
            </div>
          </div>
          <svg
            className='closeStakeModal'
            onClick={props.onClose}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M13.4099 12.0002L17.7099 7.71019C17.8982 7.52188 18.004 7.26649 18.004 7.00019C18.004 6.73388 17.8982 6.47849 17.7099 6.29019C17.5216 6.10188 17.2662 5.99609 16.9999 5.99609C16.7336 5.99609 16.4782 6.10188 16.2899 6.29019L11.9999 10.5902L7.70994 6.29019C7.52164 6.10188 7.26624 5.99609 6.99994 5.99609C6.73364 5.99609 6.47824 6.10188 6.28994 6.29019C6.10164 6.47849 5.99585 6.73388 5.99585 7.00019C5.99585 7.26649 6.10164 7.52188 6.28994 7.71019L10.5899 12.0002L6.28994 16.2902C6.19621 16.3831 6.12182 16.4937 6.07105 16.6156C6.02028 16.7375 5.99414 16.8682 5.99414 17.0002C5.99414 17.1322 6.02028 17.2629 6.07105 17.3848C6.12182 17.5066 6.19621 17.6172 6.28994 17.7102C6.3829 17.8039 6.4935 17.8783 6.61536 17.9291C6.73722 17.9798 6.86793 18.006 6.99994 18.006C7.13195 18.006 7.26266 17.9798 7.38452 17.9291C7.50638 17.8783 7.61698 17.8039 7.70994 17.7102L11.9999 13.4102L16.2899 17.7102C16.3829 17.8039 16.4935 17.8783 16.6154 17.9291C16.7372 17.9798 16.8679 18.006 16.9999 18.006C17.132 18.006 17.2627 17.9798 17.3845 17.9291C17.5064 17.8783 17.617 17.8039 17.7099 17.7102C17.8037 17.6172 17.8781 17.5066 17.9288 17.3848C17.9796 17.2629 18.0057 17.1322 18.0057 17.0002C18.0057 16.8682 17.9796 16.7375 17.9288 16.6156C17.8781 16.4937 17.8037 16.3831 17.7099 16.2902L13.4099 12.0002Z' />
          </svg>
          <div
            style={{
              height: '90%'
            }}
            className='neon-border-stack'
          ></div>
        </div>
      </div>
    </div>
  );
};
