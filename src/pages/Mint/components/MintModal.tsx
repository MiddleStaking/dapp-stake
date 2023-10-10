import React, { useEffect } from 'react';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';
import './StakeModal.scss';
import { ActionMint } from './Actions';
import notFound from './../../../assets/img/notfoundc.svg';
import { Button } from '../../../components/Design';
import Input from 'components/Design/Input';
import DropdownMenu from 'components/Design/DropdownMenu';
import { useGetNonces } from './Actions/helpers';
import { useGetNft } from 'pages/Collections/components/Actions/helpers/useGetNft';
import HexagoneNFT from 'pages/Collections/components/hexagoneNFT';
import HexagoneGroupe from 'pages/Collections/components/Modal/AddCollection/hexagoneGroupe';
import { useGetCollectionInformations } from 'pages/Collections/components/Actions/helpers';
import { sftCollection } from 'config';
const MintModal = (props: any) => {
  const userEsdtBalance = props.userEsdtBalance;
  const [balance, setBalance] = React.useState(BigInt(0));
  // const tokenPosition = useGetTokenPosition(stoken, rtoken);
  const tokenPosition = props.token_position;
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [bigAmount, setBigAmount] = React.useState(BigInt('10000000000000000'));
  const nft: any = useGetNft(sftCollection, 1, true);
  const getCollectionInformations = useGetCollectionInformations(sftCollection);

  // const nonces = useGetNonces();
  useEffect(() => {
    setBigAmount(BigInt('10000000000000000'));
    setTokenAmount(0.01);
  }, []);

  function handleTokenAmountChange(value: any) {
    const amount = BigInt(Number(value) * 10 ** 18);
    if (amount < BigInt(0)) {
      setTokenAmount(0);
      setBigAmount(BigInt(0));
    } else if (amount > balance) {
      setTokenAmount(Number(BigInt(balance)) / Number(BigInt(10 ** 18)));
      setBigAmount(balance);
    } else {
      setTokenAmount(Number(value));
      const output = toBigAmount(Number(value), Number(18));
      setBigAmount(BigInt(output));
    }
    const percentage = Number((BigInt(amount) * BigInt(100)) / BigInt(balance));
    setRangeValue(percentage);
  }

  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (balance > BigInt(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      const big_amount = BigInt(
        (BigInt(balance) * BigInt(percentage)) / BigInt(100)
      );
      setTokenAmount(Number(BigInt(big_amount)) / Number(BigInt(10 ** 18)));
      setBigAmount(big_amount);
    } else {
      setRangeValue(0);
    }
  }

  function toBigAmount(invalue: number, indec: number) {
    let fixed = '';
    let dec = '';
    let vir = false;
    const sNumber = invalue.toString();
    for (
      let i = 0, len = sNumber.length;
      i < len && (dec.length < indec || indec === 0);
      i += 1
    ) {
      if (!vir) {
        if (sNumber.charAt(i) === '.') {
          vir = true;
        } else {
          fixed = fixed + sNumber.charAt(i);
        }
      } else if (indec > dec.length) {
        dec = dec + sNumber.charAt(i);
      }
    }
    let output = fixed + dec;
    for (let i = 0; dec.length < indec; i += 1) {
      output = output + '0';
      dec = dec + '0';
    }
    return output;
  }

  if (!props.show) {
    return null;
  }

  const percentage = rangeValue / 100;

  return (
    <>
      <div className='centerStakeModal'>
        <div className='backgroundStakeModal'>
          <div className='modalStakeModal'>
            <div className='contentStakeModal'>
              <div className='modalLabelStakeModal'>Mint SFT</div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '30px 0px'
                }}
              >
                {getCollectionInformations &&
                  Object.keys(getCollectionInformations).length > 0 && (
                    <HexagoneGroupe
                      collectionInfo={getCollectionInformations}
                    />
                  )}
              </div>

              <div className='staked-rewarded-tokens-StakeModal'>
                <div className='do-you-want-to-add-it-rewarded-tokens-StakeModal'>
                  Mint one random SFT from collection
                </div>

                <div>
                  <div className='AmountInputGroupe'>
                    <Input
                      inputHeight='40px'
                      inputWidth='180px'
                      borderColor='rgb(105, 88, 133)'
                      value={tokenAmount}
                      onInputChange={handleTokenAmountChange}
                      type='number'
                      placeholder={'number'}
                      fontSize={14}
                      disabled={true}
                      rightHtml={'EGLD'}
                    />
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
                      <ActionMint
                        staked_token={props.staked_token}
                        rewarded_token={props.rewarded_token}
                        user_fund={bigAmount}
                      />
                    </div>
                  </div>
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
            <div className='neon-border-stack'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintModal;
