import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'components/Design';
import Input from 'components/Design/Input';
import { useWindowDimensions } from 'components/DimensionScreen';
import toHex from 'helpers/toHex';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import { ActionStakeNft } from '../../Actions';
import './ModalStakeNft.scss';

export const ModalStakeNft = (props: any) => {
  const [qty, setQty] = React.useState(1);
  const [openAccordions, setOpenAccordions] = useState([false]);
  // Use state for MULTIPLE selected items
  const [selectedTokens, setSelectedTokens] = React.useState<any[]>([]);
  // Store quantities for each token: { [identifier]: amount }
  const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
    {}
  );

  const ModalRef: any = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        props.showMoal &&
        ModalRef.current &&
        !ModalRef.current.contains(e.target)
      ) {
        props.setShowMoal(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props.showMoal]);

  const { width } = useWindowDimensions();

  // Initialize selection
  useEffect(() => {
    if (props.userNFTBalance.length > 0 && selectedTokens.length === 0) {
      const first = props.userNFTBalance[0];
      setSelectedTokens([first]);
      // Default quantity for first item is max balance (or we could use 1)
      setQuantities({ [first.identifier]: Number(first.balance) });
      setQty(Number(first.balance)); // Sync bottom input
    }
  }, [props.userNFTBalance]);

  const toggleAccordion = (index: number) => {
    const newOpenAccordions = [...openAccordions];
    newOpenAccordions[index] = !newOpenAccordions[index];
    setOpenAccordions(newOpenAccordions);
  };

  function handleQtyChange(value: any) {
    // Only allow quantity change if SINGLE selection (Bottom input)
    if (selectedTokens.length !== 1) return;

    const token = selectedTokens[0];
    const max = Number(token?.balance);
    let newVal = value;
    if (value > max) newVal = max;
    if (value < 1) newVal = 1;

    setQty(newVal);
    // Update the dict as well
    setQuantities((prev) => ({ ...prev, [token.identifier]: newVal }));
  }

  const handleItemQtyChange = (identifier: string, value: any, max: number) => {
    let newVal = value;
    if (value > max) newVal = max;
    if (value < 1) newVal = 1;

    setQuantities((prev) => ({ ...prev, [identifier]: newVal }));

    // If this is the only selected item, sync bottom input too
    if (
      selectedTokens.length === 1 &&
      selectedTokens[0].identifier === identifier
    ) {
      setQty(newVal);
    }
  };

  // Toggle selection for a token
  const toggleSelection = (token: any) => {
    const isSelected = selectedTokens.some(
      (t) => t.identifier === token.identifier
    );
    if (isSelected) {
      setSelectedTokens(
        selectedTokens.filter((t) => t.identifier !== token.identifier)
      );
      // Optional: remove from quantities state, but not strictly needed
    } else {
      setSelectedTokens([...selectedTokens, token]);
      // Initialize quantity to MAX balance by default when selected
      setQuantities((prev) => ({
        ...prev,
        [token.identifier]: Number(token.balance)
      }));
    }
  };

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      setSelectedTokens([...props.userNFTBalance]);
      // Set all to max balance
      const newQuantities: any = {};
      props.userNFTBalance.forEach((t: any) => {
        newQuantities[t.identifier] = Number(t.balance);
      });
      setQuantities(newQuantities);
    } else {
      setSelectedTokens([]);
    }
  };

  return (
    <div className='centerStakeModal_Collection'>
      <div ref={ModalRef} className='backgroundStakeModal_Collection'>
        <div className='modalStakeModal_Collection'>
          <div className='contentStakeModal_Collection'>
            <div className='modalLabelStakeModal_Collection'>Stake Nft</div>
            <div className='wrapperTT'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '30px 0px'
                }}
              >
                {selectedTokens.length === 1 && selectedTokens[0]?.media ? (
                  <HexagoneNFT
                    format={
                      selectedTokens[0]?.media[0]?.fileType == 'video/mp4'
                        ? 'video/mp4'
                        : 'image'
                    }
                    url={selectedTokens[0]?.media[0]?.url}
                    width={200}
                    withBorder={true}
                    borderWidth={2.5}
                    borderColor='linear-gradient(to bottom, #1f67ff, #5e5ffe, #8356fa, #a249f4, #bd37ec)'
                    withShadow={true}
                  />
                ) : selectedTokens.length > 1 ? (
                  <div style={{ textAlign: 'center' }}>
                    <HexagoneGroupe
                      collectionInfo={selectedTokens}
                      width={100}
                    />
                    <div style={{ marginTop: '10px', color: 'white' }}>
                      {selectedTokens.length} items selected
                    </div>
                  </div>
                ) : props.userNFTBalance.length > 0 ? (
                  <div style={{ color: 'white' }}>Select items below</div>
                ) : (
                  <div style={{ color: 'white' }}>No NFTs found</div>
                )}
              </div>
            </div>

            {props.collectionReward.nonce > 0 ? (
              <a
                style={{ color: 'white', display: 'flex' }}
                target='_blank'
                rel='noreferrer'
                href={
                  'https://xoxno.com/nft/' +
                  props.collectionReward.collection +
                  '-' +
                  toHex(props.collectionReward.nonce)
                }
              >
                <u>
                  {props.collectionReward.collection +
                    '-' +
                    toHex(props.collectionReward.nonce)}
                </u>
              </a>
            ) : (
              <a
                style={{ color: 'white', display: 'flex' }}
                target='_blank'
                rel='noreferrer'
                href={
                  'https://xoxno.com/collection/' +
                  props.collectionReward.collection
                }
              >
                <u>{props.collectionReward.collection}</u>
              </a>
            )}

            <div className='pool-details_StakeModal_black_Collection'>
              <div className='GroupeDetails_StakeModal_black_Collection'>
                <div className='PoolDetails_StakeModal_black_Collection'>
                  <div className='DetailsInfo_black_Collection'>
                    <div className='LabelDetailsInfo_black_Collection'>
                      Select Nft :
                    </div>
                    <div className='ValueDetailsInfo_black_Collection'>
                      {/* Multi-Select List */}
                      <div
                        style={{
                          maxHeight: '150px',
                          overflowY: 'auto',
                          width: '260px', // Wider to fit input
                          border: '1px solid #695885',
                          borderRadius: '5px',
                          padding: '5px',
                          backgroundColor: 'rgba(0,0,0,0.2)'
                        }}
                      >
                        {props.userNFTBalance &&
                          props.userNFTBalance.length > 0 && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px 0',
                                borderBottom: '1px solid #444',
                                marginBottom: '5px'
                              }}
                            >
                              <input
                                type='checkbox'
                                checked={
                                  selectedTokens.length ===
                                    props.userNFTBalance.length &&
                                  props.userNFTBalance.length > 0
                                }
                                onChange={handleSelectAll}
                                style={{ marginRight: '5px' }}
                              />
                              <span
                                style={{ fontSize: '12px', color: 'white' }}
                              >
                                Select All
                              </span>
                            </div>
                          )}

                        {props.userNFTBalance ? (
                          props.userNFTBalance.map((item: any) => {
                            const isSelected = selectedTokens.some(
                              (t) => t.identifier === item.identifier
                            );
                            const balance = Number(item.balance);
                            return (
                              <div
                                key={item.identifier}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '4px 0',
                                  cursor: 'pointer'
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flex: 1
                                  }}
                                  onClick={() => toggleSelection(item)}
                                >
                                  <input
                                    type='checkbox'
                                    checked={isSelected}
                                    readOnly
                                    style={{ marginRight: '5px' }}
                                  />
                                  <span
                                    style={{
                                      fontSize: '12px',
                                      color: 'white',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      maxWidth: '120px'
                                    }}
                                    title={item.identifier}
                                  >
                                    {item.identifier}
                                  </span>
                                </div>
                                {isSelected && balance > 1 && (
                                  <div onClick={(e) => e.stopPropagation()}>
                                    <input
                                      type='number'
                                      value={
                                        quantities[item.identifier] || balance
                                      }
                                      onChange={(e) =>
                                        handleItemQtyChange(
                                          item.identifier,
                                          Number(e.target.value),
                                          balance
                                        )
                                      }
                                      style={{
                                        width: '60px',
                                        height: '20px',
                                        fontSize: '11px',
                                        background: '#2a1b3d',
                                        border: '1px solid #695885',
                                        color: 'white',
                                        borderRadius: '4px',
                                        paddingLeft: '4px'
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: '10px',
                                        color: '#888',
                                        marginLeft: '2px'
                                      }}
                                    >
                                      /{balance}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div style={{ color: 'white', fontSize: '12px' }}>
                            No items
                          </div>
                        )}
                      </div>
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
                    You can select one or multiple SFTs or NFTs inside your
                    wallet and stake them (Multi-Stake).
                  </div>
                </div>
              </div>

              {selectedTokens.length === 1 &&
                selectedTokens[0]?.balance > 1 && (
                  <div className='pool-details_StakeModal_black_Collection'>
                    <div className='GroupeDetails_StakeModal_black_input_Collection'>
                      <div className='PoolDetails_StakeModal_black_Collection'>
                        <div className='DetailsInfo_black_Collection'>
                          <div className='LabelDetailsInfo_black_Collection'>
                            Quantity :
                          </div>
                          <div>
                            <Input
                              inputHeight='25px'
                              inputWidth='179px'
                              borderRadius={6}
                              hasBorder={true}
                              BoxShadowActive={false}
                              hasBorderActive={true}
                              background={'transparent'}
                              value={qty}
                              onInputChange={handleQtyChange}
                              type='number'
                              placeholder={'number'}
                              fontSize={14}
                            />
                          </div>
                          <div
                            className='svgAccordeons'
                            onClick={() => toggleAccordion(3)}
                          >
                            <svg
                              width={'16px'}
                              height={'16px'}
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                              style={{
                                transform: openAccordions[3]
                                  ? 'rotate(180deg)'
                                  : 'none',
                                transition: 'transform 0.3s ease'
                              }}
                            >
                              <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M2.96967 5.21967C3.26256 4.92678 3.73744 4.92678 4.03033 5.21967L8 9.18934L11.9697 5.21967C12.2626 4.92678 12.7374 4.92678 13.0303 5.21967C13.3232 5.51256 13.3232 5.98744 13.0303 6.28033L8.53033 10.7803C8.23744 11.0732 7.76256 11.0732 7.46967 10.7803L2.96967 6.28033C2.67678 5.98744 2.67678 5.51256 2.96967 5.21967Z'
                                fill={openAccordions[3] ? 'green' : '#fff'}
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          className={`accordion-content ${
                            openAccordions[3] ? 'open' : ''
                          }`}
                        >
                          Only for SFT. This is the Quantity you want to stake
                          in one time.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            <div className='pool-details_StakeModal_Collection'>
              <div className='GroupeDetails_StakeModal_Collection'>
                {selectedTokens.length === 1 ? (
                  <div className='PoolDetails_StakeModal_Collection'>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>
                        royalties
                      </div>
                      <div className='ValueDetailsInfo_Collection'>
                        {selectedTokens[0]?.royalties}
                      </div>
                    </div>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>name</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {selectedTokens[0]?.name}
                      </div>
                    </div>
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>nonce</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {selectedTokens[0]?.nonce}
                      </div>
                    </div>
                    {selectedTokens[0]?.tags && (
                      <div className='DetailsInfo_Collection'>
                        <div className='LabelDetailsInfo_Collection'>tags</div>
                        <div className='ValueDetailsInfo_Collection'>
                          {selectedTokens[0]?.tags[0]?.length == 1 &&
                          selectedTokens[0]?.tags[0] == ''
                            ? 'no tags'
                            : selectedTokens[0]?.tags
                                ?.slice(
                                  0,
                                  selectedTokens[0]?.tags?.length < 3
                                    ? selectedTokens[0]?.tags?.length
                                    : 3
                                )
                                .map((tag: string) => tag + ' ')}
                        </div>
                      </div>
                    )}
                    <div className='DetailsInfo_Collection'>
                      <div className='LabelDetailsInfo_Collection'>type</div>
                      <div className='ValueDetailsInfo_Collection'>
                        {selectedTokens[0]?.type}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: 'white',
                      padding: '20px'
                    }}
                  >
                    {selectedTokens.length > 1 ? (
                      <div>
                        {selectedTokens.length} items selected for staking.
                      </div>
                    ) : (
                      <div>Select NFTs to view details</div>
                    )}
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
                  // Pass the full array for multi-stake with correct quantities
                  selectedTokens={selectedTokens.map((t) => ({
                    token: t,
                    amount: quantities[t.identifier] || 1 // Fallback to 1 if missing
                  }))}
                  pool_id={props.pool_id}
                  disabled={selectedTokens.length < 1}
                  isV2={props.isV2}
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
