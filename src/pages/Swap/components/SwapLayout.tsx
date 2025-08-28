import React, { useEffect, FC } from 'react';
import {
  faArrowsLeftRight,
  faArrowRight,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo, useGetIsLoggedIn } from 'lib';
import { useGetPendingTransactions } from 'lib';
import DropdownMenu from 'components/Design/DropdownMenu';
import Input from 'components/Design/Input';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import notFound from './../../../assets/img/notfoundc.svg';
import { Button } from './../../../components/Design';
import { ActionSwap } from './Actions';
import { useGetESDTInformations } from './Actions/helpers';
import { useGetPoolPosition } from './Actions/helpers';
import './StakeModal.scss';
import BigNumber from 'bignumber.js';
import { useGetEgldBalance } from './Actions/helpers/useGetEgldBalance';
import { contractSwap } from 'config';
import { contractRestake } from 'config';
import { ActionRestake } from './Actions/ActionRestake';
import { useGetRestakeBalance } from './Actions/helpers/useGetRestakeBalance';
import { ActionClaim } from './Actions/ActionClaim';

interface SwapLayoutProps {
  firstToken: string;
  secondToken: string;
  defaultToken: string;
  userEsdtBalance: Array<any>;
  all_lp: any[];
}
export const SwapLayout: FC<SwapLayoutProps> = ({
  firstToken,
  secondToken,
  defaultToken,
  userEsdtBalance,
  all_lp
}) => {
  const pending = useGetPendingTransactions();
  const hasPendingTransactions = pending.length > 0;
  const [inBalance, setInBalance] = React.useState(new BigNumber(0));
  const [outBalance, setOutBalance] = React.useState(new BigNumber(0));
  const [in_token, setInToken] = React.useState(firstToken);
  const [out_token, setOutToken] = React.useState(secondToken);
  const [tokenAmount, setTokenAmount] = React.useState(0);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [swap_amount, setSwapAmount] = React.useState(new BigNumber(0));

  const { account } = useGetAccountInfo();
  const egld_balance = BigInt(
    Number(account?.balance) > 0 ? account?.balance : 0
  );
  const contract_swap_egld_balance = useGetEgldBalance(contractSwap);
  const contract_restake_egld_balance = useGetEgldBalance(contractRestake);
  const restake_balance = useGetRestakeBalance();
  //montant mini avant de proposer le restake décentralisé
  const min_restake = new BigNumber(1 * 10 ** 18);
  const min_claim_stake = new BigNumber(1 * 10 ** 17);

  let out_amount = new BigNumber(0);
  let out_fees = new BigNumber(0);
  let price_impact = 0;
  let dual_price_impact = 0;

  const token_list = all_lp;

  //append MID to swappable array
  const find = token_list.find((element) => {
    return element.swaped_token === defaultToken;
  });
  if (!find) {
    token_list.push({ swaped_token: defaultToken });
  }

  token_list.sort(function (a, b) {
    if (a.swaped_token?.toLowerCase() < b.swaped_token?.toLowerCase())
      return -1;
    if (a.swaped_token?.toLowerCase() > b.swaped_token?.toLowerCase()) return 1;
    return 0;
  });

  const isLoggedIn = useGetIsLoggedIn();
  const in_esdt_info = useGetESDTInformations(in_token);
  const out_esdt_info = useGetESDTInformations(out_token);
  const def_esdt_info = useGetESDTInformations(defaultToken);

  const first_image = in_esdt_info?.assets?.svgUrl
    ? in_esdt_info?.assets?.svgUrl
    : notFound;
  const second_image = out_esdt_info?.assets?.svgUrl
    ? out_esdt_info?.assets?.svgUrl
    : notFound;

  let isDual = false;
  if (in_token != defaultToken && out_token != defaultToken) {
    isDual = true;
  }

  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    in_token == defaultToken ? out_token : in_token,
    true,
    true
  );
  const secondPoolPosition = useGetPoolPosition(
    defaultToken,
    out_token,
    true,
    isDual
  );

  //généralement le mid
  const first_esdt_info = useGetESDTInformations(firstPoolPosition.first_token);
  //entrant
  const second_esdt_info = useGetESDTInformations(
    firstPoolPosition.second_token
  );
  //sortant
  const third_esdt_info = useGetESDTInformations(
    secondPoolPosition.second_token
  );
  const first_decimals = first_esdt_info?.decimals
    ? first_esdt_info?.decimals
    : 0;
  const second_decimals = second_esdt_info?.decimals
    ? second_esdt_info?.decimals
    : 0;
  const third_decimals = third_esdt_info?.decimals
    ? third_esdt_info?.decimals
    : 0;

  const in_balance =
    in_token === 'EGLD-000000'
      ? { balance: egld_balance }
      : userEsdtBalance.find((item: any) => item.identifier === in_token);

  const out_balance =
    out_token === 'EGLD-000000'
      ? { balance: egld_balance }
      : userEsdtBalance.find((item: any) => item.identifier === out_token);

  useEffect(() => {
    setInBalance(
      in_balance?.balance
        ? new BigNumber(in_balance?.balance)
        : new BigNumber(0)
    );
    setOutBalance(
      out_balance?.balance
        ? new BigNumber(out_balance?.balance)
        : new BigNumber(0)
    );
    if (in_token == out_token) {
      setInToken('EGLD-000000');
      setOutToken(defaultToken);
    }

    const url = new URL(window.location.href);
    url.searchParams.set('firstToken', in_token);
    url.searchParams.set('secondToken', out_token);
    window.history.pushState({}, '', url.toString());
  }, [in_token, out_token, userEsdtBalance]);

  function inverse() {
    const first = in_token;
    const second = out_token;
    setInToken(second);
    setOutToken(first);
    setTokenAmount(0);
    setSwapAmount(new BigNumber(0));
    setRangeValue(0);

    const url = new URL(window.location.href);
    url.searchParams.set('firstToken', second);
    url.searchParams.set('secondToken', first);
    window.history.pushState({}, '', url.toString());
  }
  function setToMax() {
    setTokenAmount(Number(inBalance) / Number(BigInt(10 ** in_decimals)));
    setSwapAmount(inBalance);
    setRangeValue(100);
  }
  const in_decimals = in_esdt_info?.decimals ? in_esdt_info?.decimals : 0;
  const out_decimals = out_esdt_info?.decimals ? out_esdt_info?.decimals : 0;

  function handleTokenAmountChange(value: any) {
    const amount = new BigNumber(value).multipliedBy(10 ** in_decimals);

    if (amount.isLessThan(0)) {
      setTokenAmount(0);
      setSwapAmount(new BigNumber(0));
    } else {
      setTokenAmount(value);
      const output = new BigNumber(value).multipliedBy(10 ** in_decimals);
      setSwapAmount(new BigNumber(output));
    }
    const percentage = Number(
      amount
        .multipliedBy(100)
        .dividedBy(inBalance ? inBalance : amount ? amount : 1)
        .integerValue(BigNumber.ROUND_FLOOR)
        .toFixed()
    );
    setRangeValue(percentage);
  }

  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (inBalance.isGreaterThan(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      const big_amount = new BigNumber(inBalance)
        .multipliedBy(percentage)
        .dividedBy(100);
      setTokenAmount(Number(big_amount) / Number(BigInt(10 ** in_decimals)));
      setSwapAmount(big_amount);
    } else {
      setRangeValue(0);
    }
  }
  if (in_token == defaultToken || out_token == defaultToken) {
    //Simple Swap
    const k_pool = new BigNumber(
      firstPoolPosition.first_token_amount.toString()
    ).multipliedBy(firstPoolPosition.second_token_amount.toString());

    if (defaultToken == in_token) {
      //******* */
      const in_fees = new BigNumber(swap_amount)
        .multipliedBy(firstPoolPosition.first_fee.toString())
        .dividedBy(10000)
        .integerValue(BigNumber.ROUND_FLOOR);

      const y_amount = k_pool
        .dividedBy(
          new BigNumber(firstPoolPosition.first_token_amount.toString())
            .plus(swap_amount)
            .minus(in_fees)
        )
        .integerValue(BigNumber.ROUND_FLOOR);

      out_amount = new BigNumber(
        firstPoolPosition.second_token_amount.toString()
      ).minus(y_amount);
      out_fees = firstPoolPosition.second_fee.isGreaterThan(0)
        ? new BigNumber(out_amount)
            .multipliedBy(firstPoolPosition.second_fee.toString())
            .dividedBy(10000)
            .integerValue(BigNumber.ROUND_FLOOR)
        : new BigNumber(0);

      price_impact =
        (Number(swap_amount) / Number(firstPoolPosition.first_token_amount)) *
        100;
    } else {
      //******* */
      const in_fees = new BigNumber(swap_amount)
        .multipliedBy(firstPoolPosition.first_fee.toString())
        .dividedBy(10000)
        .integerValue(BigNumber.ROUND_FLOOR);
      const x_amount = k_pool
        .dividedBy(
          new BigNumber(firstPoolPosition.second_token_amount.toString())
            .plus(swap_amount)
            .minus(in_fees)
        )
        .integerValue(BigNumber.ROUND_FLOOR);

      out_amount = new BigNumber(
        firstPoolPosition.first_token_amount.toString()
      ).minus(x_amount);
      out_fees = firstPoolPosition.second_fee.isGreaterThan(0)
        ? new BigNumber(out_amount)
            .multipliedBy(10000)
            .dividedBy(firstPoolPosition.second_fee.toString())
            .integerValue(BigNumber.ROUND_FLOOR)
            .dividedBy(10000)
            .integerValue(BigNumber.ROUND_FLOOR)
        : new BigNumber(0);

      price_impact =
        (Number(swap_amount.toString()) /
          Number(firstPoolPosition.second_token_amount.toString())) *
        100;
    }
  } else {
    //DualSwap

    //Ratio des deux pools
    //MID EGLD
    const first_k_pool = new BigNumber(
      firstPoolPosition.first_token_amount.toString()
    ).multipliedBy(firstPoolPosition.second_token_amount.toString());

    //MID USDC
    const second_k_pool = new BigNumber(
      secondPoolPosition.first_token_amount.toString()
    ).multipliedBy(secondPoolPosition.second_token_amount.toString());

    //LP_FEE 1
    const first_in_fees = new BigNumber(swap_amount)
      .multipliedBy(firstPoolPosition.first_fee.toString())
      .dividedBy(10000)
      .integerValue(BigNumber.ROUND_FLOOR);

    const first_in_amount = new BigNumber(swap_amount).minus(first_in_fees);

    const first_x_amount = first_k_pool
      .dividedBy(
        new BigNumber(firstPoolPosition.second_token_amount.toString()).plus(
          first_in_amount
        )
      )
      .integerValue(BigNumber.ROUND_FLOOR);

    const first_out_amount = new BigNumber(
      firstPoolPosition.first_token_amount.toString()
    ).minus(first_x_amount);

    //LP_FEE 2
    const second_in_fees = new BigNumber(first_out_amount)
      .multipliedBy(secondPoolPosition.first_fee.toString())
      .dividedBy(10000)
      .integerValue(BigNumber.ROUND_FLOOR);
    const second_in_amount = new BigNumber(first_out_amount).minus(
      second_in_fees
    );

    price_impact =
      (Number(swap_amount.toString()) /
        Number(firstPoolPosition.second_token_amount.toString())) *
      100;
    const second_y_amount = second_k_pool
      .dividedBy(
        new BigNumber(secondPoolPosition.first_token_amount.toString()).plus(
          second_in_amount
        )
      )
      .integerValue(BigNumber.ROUND_FLOOR);
    out_amount = new BigNumber(
      secondPoolPosition?.second_token_amount?.toString()
    ).minus(second_y_amount);

    //Out fees
    out_fees = secondPoolPosition?.second_fee?.isGreaterThan(0)
      ? new BigNumber(out_amount)
          .multipliedBy(10000)
          .dividedBy(secondPoolPosition.second_fee.toString())
          .integerValue(BigNumber.ROUND_FLOOR)
          .dividedBy(10000)
          .integerValue(BigNumber.ROUND_FLOOR)
      : new BigNumber(0);

    dual_price_impact =
      (Number(second_in_amount.toString()) /
        Number(secondPoolPosition.first_token_amount.toString())) *
      100;

    // }
  }

  //Slippage :
  const min_out = out_amount
    .minus(out_fees)
    .multipliedBy(99)
    .dividedBy(100)
    .integerValue(BigNumber.ROUND_FLOOR);

  const percentage = rangeValue / 100;

  const first_amount = firstPoolPosition.first_token_amount
    ? new BigNumber(firstPoolPosition.first_token_amount.toString()).dividedBy(
        10 ** 18
      )
    : new BigNumber(0);
  const second_amount = secondPoolPosition.first_token_amount
    ? new BigNumber(secondPoolPosition.first_token_amount.toString()).dividedBy(
        10 ** 18
      )
    : new BigNumber(0);
  const first_price = def_esdt_info?.price
    ? new BigNumber(def_esdt_info.price)
    : new BigNumber(1);

  const lp_value1 = first_amount
    .multipliedBy(first_price)
    .integerValue(BigNumber.ROUND_FLOOR);

  const lp_value2 = second_amount
    .multipliedBy(first_price)
    .integerValue(BigNumber.ROUND_FLOOR);

  const { setHeaderMenu } = React.useContext(HeaderMenuContext);
  setHeaderMenu(true);
  return (
    <div
      style={{
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          borderRadius: '32px',
          color: 'var(--neutral-white, #fff)'
        }}
      >
        <div className='backgroundStakeModal'>
          <div className='modalStakeModal'>
            <div className='contentStakeModal'>
              <div className='modalLabelStakeModal'>Swap tokens</div>
              <div className='logosStakeModal'>
                <div className='LogoStakeModalGroupe'>
                  <div className='LogoStake'>
                    <img src={first_image} />
                  </div>
                  <div className='LogoArrow'>
                    <div className='LogoInverseArrow'>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{
                          fontSize: '20px'
                        }}
                      />
                    </div>
                  </div>
                  <div className='LogoEarn'>
                    <img src={second_image} />
                  </div>
                </div>
              </div>
              <div className='pool-details_StakeModal'>
                <div className='this-pool-already-exists_StakeModal'>
                  Pool informations
                </div>

                {!isDual ? (
                  <div className='GroupeDetails_StakeModal'>
                    <div className='LogosDetails_StakeModal'>
                      <div className='logosStakeModal'>
                        <div className='logo2StakeModal'>
                          <div className='image_2StakeModal'>
                            <img
                              className='img_2StakeModal'
                              src={second_image}
                            />
                          </div>
                        </div>

                        <div className='logo1StakeModal'>
                          <div className='image_1StakeModal'>
                            <img
                              className='img_1StakeModal'
                              src={first_image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='PoolDetails_StakeModal'>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>{defaultToken}</div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            firstPoolPosition.first_token_amount
                              .dividedBy(10 ** first_decimals)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {in_token == defaultToken ? out_token : in_token}
                        </div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            firstPoolPosition.second_token_amount
                              .dividedBy(10 ** second_decimals)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                        </div>
                      </div>
                      {(in_token == 'EGLD-000000' ||
                        out_token == 'EGLD-000000') &&
                        restake_balance && (
                          <div className='DetailsInfo'>
                            <div className='LabelDetailsInfo'>
                              Restaked
                              <a
                                href='https://explorer.multiversx.com/accounts/erd1qqqqqqqqqqqqqpgq4mudu4n6kqqa6agtek3s2jmr7j5tqjwctxfqphra6x/staking'
                                target='_BLANK'
                                rel='noreferrer'
                              >
                                <FontAwesomeIcon
                                  icon={faLink}
                                  style={{
                                    fontSize: '12px',
                                    marginLeft: '5px',
                                    color: '#7195df'
                                  }}
                                />
                              </a>
                            </div>
                            <div className='ValueDetailsInfo'>
                              {Number(
                                restake_balance?.userActiveStake
                                  ? new BigNumber(
                                      restake_balance.userActiveStake
                                    )
                                      .dividedBy(10 ** 18)
                                      .toFixed(2)
                                  : 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}{' '}
                            </div>
                          </div>
                        )}
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>in_fee</div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            firstPoolPosition.first_fee
                              .dividedBy(100)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>out_fee</div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            firstPoolPosition.second_fee
                              .dividedBy(100)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>LP value</div>
                        <div className='ValueDetailsInfo'>
                          {Number(lp_value1.toFixed(2)).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }
                          )}{' '}
                          $
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='GroupeDetails_StakeModal'>
                    <div className='LogosDetails_StakeModal'>
                      <div className='logosStakeModal'>
                        <div className='logo2StakeModal'>
                          <div className='image_2StakeModal'>
                            <img
                              className='img_2StakeModal'
                              src={second_image}
                            />
                          </div>
                        </div>

                        <div className='logo1StakeModal'>
                          <div className='image_1StakeModal'>
                            <img
                              className='img_1StakeModal'
                              src={first_image}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='PoolDetails_StakeModal'>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {defaultToken.split('-')[0]} :{' '}
                          {in_token.split('-')[0]}
                        </div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            firstPoolPosition.first_token_amount
                              .dividedBy(10 ** first_decimals)
                              .toFixed(2)
                          ).toLocaleString()}{' '}
                          :{' '}
                          {Number(
                            firstPoolPosition.second_token_amount
                              .dividedBy(10 ** second_decimals)
                              .toFixed(2)
                          ).toLocaleString()}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>lp_fee_1</div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            firstPoolPosition.first_fee
                              .dividedBy(100)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          %
                        </div>
                      </div>{' '}
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          {defaultToken.split('-')[0]} :{' '}
                          {out_token.split('-')[0]}
                        </div>
                        <div className='ValueDetailsInfo'>
                          {' '}
                          {Number(
                            secondPoolPosition.first_token_amount
                              .dividedBy(10 ** first_decimals)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          :{' '}
                          {Number(
                            secondPoolPosition.second_token_amount
                              .dividedBy(10 ** third_decimals)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>lp_fee_2</div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            secondPoolPosition.first_fee
                              .dividedBy(100)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>stake_fee</div>
                        <div className='ValueDetailsInfo'>
                          {Number(
                            secondPoolPosition.second_fee
                              .dividedBy(100)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          %
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>LP value 1</div>
                        <div className='ValueDetailsInfo'>
                          {Number(lp_value1.toFixed(2)).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }
                          )}{' '}
                          $
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>LP value 2</div>
                        <div className='ValueDetailsInfo'>
                          {Number(lp_value2.toFixed(2)).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }
                          )}{' '}
                          $
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {contract_restake_egld_balance.isGreaterThan(min_restake) && (
                <>
                  <ActionRestake amount={contract_restake_egld_balance} />
                </>
              )}
              {restake_balance &&
                new BigNumber(restake_balance.claimableRewards).isGreaterThan(
                  min_claim_stake
                ) && (
                  <>
                    <ActionClaim
                      amount={new BigNumber(restake_balance.claimableRewards)}
                    />
                  </>
                )}

              <div className='dropDownGroupeStakeModal'>
                <div className='dropDownStake'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Send</div>
                  </div>
                  <DropdownMenu
                    BoxShadowActive={true}
                    BoxShadowActiveColor='0 0 24px 0 rgba(182,57,237,.64)'
                    BoxShadowColor='0 0 24px 0 rgba(182,57,237,.64)'
                    inputHeight={'40px'}
                    inputWidth='179px'
                    borderRadius='54'
                    hasBorder={true}
                    borderColor='#695885'
                    borderRadiusOptions='5px'
                    options={
                      all_lp
                        ? token_list.map((item: any) => ({
                            text:
                              item.swaped_token == 'EGLD-000000'
                                ? 'EGLD'
                                : item.swaped_token,
                            value: item.swaped_token
                          }))
                        : [{ text: in_token, value: in_token }]
                    }
                    defaultValue={in_token == 'EGLD-000000' ? 'EGLD' : in_token}
                    disableOption={false}
                    onSelect={function (value: any): void {
                      setInToken(value);
                    }}
                  />
                </div>
                <div className='dropDownArrow' onClick={inverse}>
                  <div className='InverseArrow'>
                    <FontAwesomeIcon
                      icon={faArrowsLeftRight}
                      style={{
                        fontSize: '20px'
                      }}
                    />
                  </div>
                </div>
                <div className='dropDownEarn'>
                  <div className='GroupeLabelDropdoownFormatAmount'>
                    <div className='LabelDropdoown'>Receive</div>
                  </div>
                  <DropdownMenu
                    BoxShadowActive={false}
                    BoxShadowActiveColor='none'
                    BoxShadowColor='none'
                    inputHeight={'40px'}
                    inputWidth='179px'
                    borderRadius='54'
                    hasBorder={true}
                    borderRadiusOptions='5px'
                    borderColor='#695885'
                    options={
                      all_lp
                        ? token_list.map((item: any) => ({
                            text:
                              item.swaped_token == 'EGLD-000000'
                                ? 'EGLD'
                                : item.swaped_token,
                            value: item.swaped_token
                          }))
                        : [{ text: out_token, value: out_token }]
                    }
                    defaultValue={
                      out_token == 'EGLD-000000' ? 'EGLD' : out_token
                    }
                    disableOption={false}
                    onSelect={function (value: any): void {
                      setOutToken(value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className='AmountRageGroupeSwap'>
                  <div className='label6'>amount</div>
                  <div>
                    <input
                      type='range'
                      id='slider'
                      min='0'
                      max='100'
                      step='1'
                      value={rangeValue}
                      onChange={handleRangeValueChange}
                      style={{
                        appearance: 'none',
                        width: '100%',
                        height: '8px',
                        background: `linear-gradient(to right, #1F67FF 0%, #BD37EC ${
                          percentage * 100
                        }%, white ${percentage * 100}%, white 100%)`,
                        outline: 'none',
                        opacity: '0.7',
                        transition: 'opacity .2s',
                        borderRadius: '5px'
                      }}
                    />
                  </div>
                  <div className='label6'>{rangeValue}%</div>
                </div>
                {!isDual ? (
                  <div className='label6'>
                    price_impact {price_impact.toFixed(2).toString()}%
                  </div>
                ) : (
                  <div className='label6'>
                    price_impact 1 {price_impact.toFixed(2).toString()}%
                    <br />
                    price_impact 2 {dual_price_impact.toFixed(2).toString()}%
                  </div>
                )}
              </div>
              <div className='AmountInputGroupe'>
                <div className='FormatAmountStaked'>
                  <div className='LabelDropdoownFormatAmount'>
                    {Number(
                      inBalance.dividedBy(10 ** in_decimals).toFixed(2)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{' '}
                    {in_token == 'EGLD-000000' ? 'EGLD' : in_token}
                  </div>
                  <Input
                    inputHeight='40px'
                    inputWidth='100%'
                    borderColor='rgb(105, 88, 133)'
                    value={tokenAmount}
                    onInputChange={handleTokenAmountChange}
                    rightHtml={
                      <Button
                        textColor='#1F67FF'
                        buttonWidth={'15px'}
                        buttonHeight={'15px'}
                        hasBorder={false}
                        borderRadius={40}
                        background={'transparent'}
                        fontSize='10px'
                        text='MAX'
                        onClick={setToMax}
                      />
                    }
                    type='number'
                    placeholder={'number'}
                    fontSize={14}
                    decimal={Number(first_decimals.toString())}
                  />
                </div>
                <div className='FormatAmountStaked'>
                  <div className='LabelDropdoownFormatAmount'>
                    {Number(
                      outBalance.dividedBy(10 ** out_decimals).toFixed(2)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}{' '}
                    {out_token == 'EGLD-000000' ? 'EGLD' : out_token}
                  </div>
                  <Input
                    inputHeight='40px'
                    inputWidth='100%'
                    borderColor='rgb(105, 88, 133)'
                    disabled={true}
                    value={new Intl.NumberFormat(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(
                      Number(
                        out_amount
                          .minus(out_fees)
                          .div(10 ** out_decimals)
                          .toFixed(2)
                      )
                    )}
                    type='number'
                    placeholder={'number'}
                    fontSize={14}
                  />
                </div>{' '}
                <div>
                  <div className='LabelDropdoownFormatAmount'>Slippage(1%)</div>
                  {Number(
                    min_out.dividedBy(10 ** out_decimals).toFixed(2)
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}{' '}
                </div>
              </div>
              <div className='bottomGroupeModal'>
                <div className='bottomModal'>
                  {out_token == 'EGLD-000000' &&
                  contract_swap_egld_balance.isLessThan(
                    out_amount.toString()
                  ) ? (
                    <div
                      style={{
                        padding: '15px',
                        backgroundColor: '#2a1b4b',
                        color: '#d1c4e9',
                        fontFamily: 'Arial, sans-serif',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        textAlign: 'center',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                        lineHeight: '1.5'
                      }}
                    >
                      <strong style={{ color: '#e0e0e0', fontSize: '16px' }}>
                        Swap Unavailable
                      </strong>
                      <p>
                        This swap cannot be executed because part of the amount
                        is currently locked in restaking. Please select a
                        different token, reduce the amount, or wait until the
                        restaking process is complete. Availaible :
                        {contract_swap_egld_balance
                          .dividedBy(10 ** 18)
                          .toFixed(2)}{' '}
                        EGLD
                      </p>
                    </div>
                  ) : (
                    <ActionSwap
                      isLoggedIn={isLoggedIn}
                      first_token={
                        in_token == defaultToken
                          ? in_token
                          : out_token == defaultToken
                          ? out_token
                          : in_token
                      }
                      second_token={
                        out_token == defaultToken ? in_token : out_token
                      }
                      in_token={in_token}
                      in_balance={inBalance}
                      swap_amount={swap_amount}
                      min_out={min_out}
                      price_impact={
                        price_impact > dual_price_impact
                          ? price_impact
                          : dual_price_impact
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            <div style={{ zIndex: 0 }} className='neon-border-stack'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
