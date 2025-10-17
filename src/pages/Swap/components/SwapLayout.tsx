import React, { useEffect, FC } from 'react';
import {
  faArrowsLeftRight,
  faArrowRight,
  faLink
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from 'lib';
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
import { Tooltip2 } from 'components/Tooltip/Tooltip2';

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
  const BN = BigNumber;
  //montants dans le wallet sans les décimales
  const [inBalance, setInBalance] = React.useState(new BN(0));
  const [outBalance, setOutBalance] = React.useState(new BN(0));
  //identifiants des tokens sélectionnés
  const [in_token, setInToken] = React.useState(firstToken);
  const [out_token, setOutToken] = React.useState(secondToken);
  //Montant tapé dans l'input (avec les décimales)
  const [tokenAmount, setTokenAmount] = React.useState(0);
  //Valeur du slider en pourcentage (0-100) (balance user)
  const [rangeValue, setRangeValue] = React.useState(0);
  //Montant à swapper (sans les décimales)
  const [swap_amount, setSwapAmount] = React.useState(new BN(0));

  const [slippage, setSlippage] = React.useState(1);
  //Information sur le compte connecté
  const { account } = useGetAccountInfo();
  //Balance EGLD du compte connecté en wei
  const egld_balance = new BN(account?.balance ? account?.balance : 0);

  //Balance EGLD du contrat swap en wei
  const contract_swap_egld_balance = useGetEgldBalance(contractSwap);
  //Balance EGLD du contrat restake en wei
  const contract_restake_egld_balance = useGetEgldBalance(contractRestake);
  //Montant EGLD staké via le contrat restake
  const restake_balance = useGetRestakeBalance();

  //montant mini avant de proposer le restake décentralisé
  //On attends d'avoir au moins 1 EGLD sur le contrat pour proposer le restake
  const min_restake = new BN(1 * 10 ** 18);
  //Pas de claim en dessous de 0.1 EGLD
  const min_claim_stake = new BN(1 * 10 ** 17);

  //init values to calculate swap
  let out_amount = new BN(0); //montant sortant (avant fees)
  let out_fees = new BN(0); //fees sur le montant sortant
  let price_impact = 0; //price impact du swap sur la pool
  let dual_price_impact = 0; //price impact du dualswap sur la pool

  //liste des tokens swappable
  const token_list = all_lp;

  const tokens = React.useMemo(() => {
    const arr = [...all_lp];
    if (!arr.find((el) => el.swaped_token === defaultToken)) {
      arr.push({ swaped_token: defaultToken });
    }
    // tri sans muter la source
    return arr
      .slice()
      .sort(
        (a, b) =>
          a.swaped_token
            ?.toLowerCase()
            .localeCompare(b.swaped_token?.toLowerCase())
      );
  }, [all_lp, defaultToken]);

  //ajout du token MID qui n'est pas "swappable" mais qui est le token de référence
  const find = token_list.find((element) => {
    return element.swaped_token === defaultToken;
  });
  if (!find) {
    token_list.push({ swaped_token: defaultToken });
  }

  //Tri alphabétique
  token_list.sort(function (a, b) {
    if (a.swaped_token?.toLowerCase() < b.swaped_token?.toLowerCase())
      return -1;
    if (a.swaped_token?.toLowerCase() > b.swaped_token?.toLowerCase()) return 1;
    return 0;
  });

  //Informations sur les tokens sélectionnés (DECIMALES, et logos etc)
  const in_esdt_info = useGetESDTInformations(in_token); //token vendu
  const out_esdt_info = useGetESDTInformations(out_token); //token acheté
  const def_esdt_info = useGetESDTInformations(defaultToken); //token de référence (MID)

  //Images des tokens
  const first_image = in_esdt_info?.assets?.svgUrl
    ? in_esdt_info?.assets?.svgUrl
    : notFound;
  const second_image = out_esdt_info?.assets?.svgUrl
    ? out_esdt_info?.assets?.svgUrl
    : notFound;

  //Est-ce un dual swap (aucun des deux tokens n'est le token de référence)
  let isDual = false;
  if (in_token != defaultToken && out_token != defaultToken) {
    isDual = true;
  }

  //Informations sur les pools utilisées pour le swap
  const firstPoolPosition = useGetPoolPosition(
    defaultToken,
    in_token == defaultToken ? out_token : in_token,
    true,
    true
  );
  //Uniquement utilisé pour le dual swap (pas appelé si pas dual)
  const secondPoolPosition = useGetPoolPosition(
    defaultToken,
    out_token,
    true,
    isDual
  );

  //MID always present
  const def_decimals = def_esdt_info?.decimals ? def_esdt_info?.decimals : 0;
  //entrant
  const in_decimals = in_esdt_info?.decimals ? in_esdt_info?.decimals : 0;
  //sortant
  const out_decimals = out_esdt_info?.decimals ? out_esdt_info?.decimals : 0;

  //si le token d'entrée est EGLD, on prend la balance EGLD
  //sinon on cherche dans les ESDT du user
  const in_balance =
    in_token === 'EGLD-000000'
      ? { balance: egld_balance }
      : userEsdtBalance.find((item: any) => item.identifier === in_token);

  //si le token de sortie est EGLD, on prend la balance EGLD
  //sinon on cherche dans les ESDT du user
  const out_balance =
    out_token === 'EGLD-000000'
      ? { balance: egld_balance }
      : userEsdtBalance.find((item: any) => item.identifier === out_token);

  useEffect(() => {
    //on refresh tout ca dès que l'utilisateur fait un changement
    setInBalance(in_balance?.balance ? new BN(in_balance?.balance) : new BN(0));
    setOutBalance(
      out_balance?.balance ? new BN(out_balance?.balance) : new BN(0)
    );
    //si les tokens sont identiques, on reset
    if (in_token == out_token) {
      setInToken('EGLD-000000');
      setOutToken(defaultToken);
    }
    //on modifie l'url pour partage / refresh
    const url = new URL(window.location.href);
    url.searchParams.set('firstToken', in_token);
    url.searchParams.set('secondToken', out_token);
    window.history.pushState({}, '', url.toString());
  }, [in_token, out_token, userEsdtBalance]);

  //inversion des tokens selectionnés et reset des montants
  function inverse() {
    const first = in_token;
    const second = out_token;
    setInToken(second);
    setOutToken(first);
    setTokenAmount(0);
    setSwapAmount(new BN(0));
    setRangeValue(0);

    const url = new URL(window.location.href);
    url.searchParams.set('firstToken', second);
    url.searchParams.set('secondToken', first);
    window.history.pushState({}, '', url.toString());
  }
  //prends la balande de l'utilisateur pour le token d'entrée
  function setToMax() {
    let amount = new BN(0);
    if (in_token === 'EGLD-000000') {
      amount = new BN(inBalance).minus(10000000000000000); //on laisse 0.01 EGLD de côté pour les frais
    } else {
      amount = inBalance;
    }
    setTokenAmount(
      amount.isGreaterThan(0)
        ? Number(amount) / Number(BigInt(10 ** in_decimals))
        : 0
    );
    setSwapAmount(amount.isGreaterThan(0) ? amount : new BN(0));
    setRangeValue(100);
  }

  function handleTokenAmountChange(value: any) {
    const amount = new BN(value).multipliedBy(10 ** in_decimals);

    if (amount.isLessThan(0)) {
      setTokenAmount(0);
      setSwapAmount(new BN(0));
    } else {
      setTokenAmount(value);
      const output = new BN(value).multipliedBy(10 ** in_decimals);
      setSwapAmount(new BN(output));
    }
    const percentage = Number(
      amount
        .multipliedBy(100)
        .dividedBy(inBalance ? inBalance : amount ? amount : 1)
        .integerValue(BN.ROUND_FLOOR)
        .toFixed()
    );
    setRangeValue(percentage);
  }

  //selectionne un pourcentage de la balance de l'utilisateur en fonction du slider
  function handleRangeValueChange(e: React.ChangeEvent<any>) {
    if (inBalance.isGreaterThan(0)) {
      setRangeValue(e.target.value);
      const percentage = Number(e.target.value).toFixed();
      console.log('handleRangeValueChange', percentage, inBalance.toString());
      const big_amount = new BN(inBalance.isGreaterThan(0) ? inBalance : 0)
        .multipliedBy(percentage)
        .dividedBy(100);
      console.log('big_amount', big_amount.toString());
      setTokenAmount(Number(big_amount) / Number(BigInt(10 ** in_decimals)));
      setSwapAmount(big_amount);
    } else {
      setRangeValue(0);
    }
  }

  //si le mid est impliqué, on utilise la pool MID/XXX et pas le dual swap
  if (in_token == defaultToken || out_token == defaultToken) {
    // Simple Swap K = X * Y
    //base points system
    const bps = new BN(10000);

    const X = new BN(firstPoolPosition.first_token_amount.toFixed());
    const Y = new BN(firstPoolPosition.second_token_amount.toFixed());
    const k_pool = X.multipliedBy(Y);

    if (defaultToken == in_token) {
      //******* on rentre du MID (on paye le first/MID, on reçoit le second) *******
      const amountIn = new BN(swap_amount || 0);
      const feeInBps = new BN(firstPoolPosition.first_fee.toFixed());
      const feeOutBps = new BN(firstPoolPosition.second_fee.toFixed());

      if (amountIn.lte(0) || X.lte(0) || Y.lte(0)) {
        out_amount = new BN(0);
        out_fees = new BN(0);
        price_impact = 0;
      } else {
        // frais d'entrée
        const in_fees = amountIn
          .multipliedBy(feeInBps)
          .dividedBy(bps)
          .integerValue(BN.ROUND_FLOOR);
        const x_amount = amountIn.minus(in_fees);
        if (x_amount.lte(0)) {
          out_amount = new BN(0);
          out_fees = new BN(0);
          price_impact = 0;
        } else {
          // CFMM: input sur X -> output sur Y
          // newY = k / (X + x_amount)
          const denom = X.plus(x_amount);
          const Y_after = k_pool.dividedBy(denom).integerValue(BN.ROUND_FLOOR);
          let out_gross = Y.minus(Y_after); // avant frais de sortie
          if (out_gross.lte(0)) out_gross = new BN(0);

          // frais de sortie
          out_fees = feeOutBps.gt(0)
            ? out_gross
                .multipliedBy(feeOutBps)
                .dividedBy(bps)
                .integerValue(BN.ROUND_FLOOR)
            : new BN(0);

          out_amount = out_gross.minus(out_fees);
          if (out_amount.lt(0)) out_amount = new BN(0);

          // impact de prix
          price_impact = (Number(amountIn) / Number(X)) * 100;
        }
      }
    } else {
      // ******* on sort du MID (on paye le second, on reçoit le first/MID) *******
      const BN = BigNumber;
      const bps = new BN(10000);

      const feeInBps = new BN(firstPoolPosition.first_fee.toFixed());
      const feeOutBps = new BN(firstPoolPosition.second_fee.toFixed());
      const amountIn = new BN(swap_amount || 0);

      if (amountIn.lte(0) || X.lte(0) || Y.lte(0)) {
        out_amount = new BN(0);
        out_fees = new BN(0);
        price_impact = 0;
      } else {
        const in_fees = amountIn
          .multipliedBy(feeInBps)
          .dividedBy(bps)
          .integerValue(BN.ROUND_FLOOR);
        const x_amount = amountIn.minus(in_fees);

        if (x_amount.lte(0)) {
          out_amount = new BN(0);
          out_fees = new BN(0);
          price_impact = 0;
        } else {
          // CFMM: input sur Y -> output sur X
          // newX = k / (Y + x_amount)
          const denom = Y.plus(x_amount);
          const X_after = k_pool.dividedBy(denom).integerValue(BN.ROUND_FLOOR);
          let out_gross = X.minus(X_after); // avant frais de sortie
          if (out_gross.lte(0)) out_gross = new BN(0);

          out_fees = feeOutBps.gt(0)
            ? out_gross
                .multipliedBy(feeOutBps)
                .dividedBy(bps)
                .integerValue(BN.ROUND_FLOOR)
            : new BN(0);

          out_amount = out_gross.minus(out_fees);
          if (out_amount.lt(0)) out_amount = new BN(0);

          // impact (formule robuste vs spot)
          const P0 = X.dividedBy(Y);
          const Pe = out_gross.gt(0)
            ? out_gross.dividedBy(x_amount)
            : new BN(0);
          const impact = P0.isZero()
            ? new BN(0)
            : P0.minus(Pe).dividedBy(P0).multipliedBy(100);
          price_impact = Number(impact.toFixed(6));
        }
      }
    }
  } else {
    // DualSwap: in_token -> (Pool1 via MID) -> MID -> (Pool2 via MID) -> out_token

    const BN = BigNumber;
    const bps = new BN(10000);

    // MID / EGLD
    const X1 = new BN(firstPoolPosition.first_token_amount.toString()); // MID
    const Y1 = new BN(firstPoolPosition.second_token_amount.toString()); // EGLD (exemple)
    const k1 = X1.multipliedBy(Y1);

    // MID / USDC
    const X2 = new BN(secondPoolPosition.first_token_amount.toString()); // MID
    const Y2 = new BN(secondPoolPosition.second_token_amount.toString()); // USDC (exemple)
    const k2 = X2.multipliedBy(Y2);

    const fee1_in_bps = new BN(firstPoolPosition.first_fee.toString());
    const fee1_out_bps = new BN(firstPoolPosition.second_fee.toString());
    const fee2_in_bps = new BN(secondPoolPosition.first_fee.toString());
    const fee2_out_bps = new BN(secondPoolPosition.second_fee.toString());

    const amountIn = new BN(swap_amount || 0);

    if (amountIn.lte(0) || X1.lte(0) || Y1.lte(0) || X2.lte(0) || Y2.lte(0)) {
      out_amount = new BN(0);
      out_fees = new BN(0);
      price_impact = 0;
      dual_price_impact = 0;
    } else {
      // ===== Leg 1 : in_token -> MID (pool1)
      const fee1_in = amountIn
        .multipliedBy(fee1_in_bps)
        .dividedBy(bps)
        .integerValue(BN.ROUND_FLOOR);
      const leg1_in = amountIn.minus(fee1_in);
      // output = X1 - k1/(Y1 + leg1_in)  (on reçoit du MID)
      const X1_after = k1
        .dividedBy(Y1.plus(leg1_in))
        .integerValue(BN.ROUND_FLOOR);
      let leg1_out_gross = X1.minus(X1_after);
      if (leg1_out_gross.lte(0)) leg1_out_gross = new BN(0);

      // frais de sortie leg1
      const leg1_out_fees = fee1_out_bps.gt(0)
        ? leg1_out_gross
            .multipliedBy(fee1_out_bps)
            .dividedBy(bps)
            .integerValue(BN.ROUND_FLOOR)
        : new BN(0);
      const leg1_out = leg1_out_gross.minus(leg1_out_fees); // MID reçu

      // Impact approximatif sur leg1
      price_impact =
        (Number(amountIn.toString()) / Number(Y1.toString())) * 100;

      // ===== Leg 2 : MID -> out_token (pool2)
      const fee2_in = leg1_out
        .multipliedBy(fee2_in_bps)
        .dividedBy(bps)
        .integerValue(BN.ROUND_FLOOR);
      const leg2_in = leg1_out.minus(fee2_in); // MID net qui entre dans le 2e pool

      const Y2_after = k2
        .dividedBy(X2.plus(leg2_in))
        .integerValue(BN.ROUND_FLOOR);
      let leg2_out_gross = Y2.minus(Y2_after);
      if (leg2_out_gross.lte(0)) leg2_out_gross = new BN(0);

      // >>> CORRECTION: out_fees = gross * fee / 10000
      out_fees = fee2_out_bps.gt(0)
        ? leg2_out_gross
            .multipliedBy(fee2_out_bps)
            .dividedBy(bps)
            .integerValue(BN.ROUND_FLOOR)
        : new BN(0);

      out_amount = leg2_out_gross.minus(out_fees);
      if (out_amount.lt(0)) out_amount = new BN(0);

      // Impact approximatif sur leg2
      dual_price_impact =
        (Number(leg2_in.toString()) / Number(X2.toString())) * 100;
    }
  }
  const userSlippage = new BigNumber(slippage).dividedBy(100);

  //Slippage :
  const min_out = out_amount
    .minus(out_fees)
    .multipliedBy(new BigNumber(1).minus(userSlippage))
    .integerValue(BN.ROUND_FLOOR);

  const percentage = rangeValue / 100;
  const pct = `${rangeValue}%`;

  const first_amount = firstPoolPosition.first_token_amount
    ? new BN(firstPoolPosition.first_token_amount.toString()).dividedBy(
        10 ** 18
      )
    : new BN(0);
  const second_amount = secondPoolPosition.first_token_amount
    ? new BN(secondPoolPosition.first_token_amount.toString()).dividedBy(
        10 ** 18
      )
    : new BN(0);
  const first_price = def_esdt_info?.price
    ? new BN(def_esdt_info.price)
    : new BN(1);

  const lp_value1 = first_amount
    .multipliedBy(first_price)
    .integerValue(BN.ROUND_FLOOR);

  const lp_value2 = second_amount
    .multipliedBy(first_price)
    .integerValue(BN.ROUND_FLOOR);

  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  React.useEffect(() => {
    setHeaderMenu(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // utils
  const formatSymbol = (tid: any) => (tid === 'EGLD-000000' ? 'EGLD' : tid);

  // composant
  const TokenSelect = ({
    value,
    onChange,
    token_list,
    all_lp = true,
    inputWidth = '179px',
    inputHeight = '40px',
    hasShadow = false,
    borderColor = '#695885'
  }) => {
    const options = React.useMemo(() => {
      if (!all_lp || !token_list) return [{ text: formatSymbol(value), value }];
      return token_list.map((item: any) => ({
        text: formatSymbol(item.swaped_token),
        value: item.swaped_token
      }));
    }, [all_lp, token_list, value]);

    return (
      <DropdownMenu
        BoxShadowActive={hasShadow}
        BoxShadowActiveColor={
          hasShadow ? '0 0 24px 0 rgba(182,57,237,.64)' : 'none'
        }
        BoxShadowColor={hasShadow ? '0 0 24px 0 rgba(182,57,237,.64)' : 'none'}
        inputHeight={inputHeight}
        inputWidth={inputWidth}
        borderRadius='54'
        borderRadiusOptions='5px'
        hasBorder={true}
        borderColor={borderColor}
        options={options}
        defaultValue={formatSymbol(value)}
        disableOption={false}
        onSelect={(v) => onChange(v)}
      />
    );
  };

  console.log('render SwapLayout', swap_amount.toString());
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
                              .dividedBy(10 ** def_decimals)
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
                              .dividedBy(
                                10 **
                                  (in_token == defaultToken
                                    ? out_decimals
                                    : in_decimals)
                              )
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
                                  ? new BN(restake_balance.userActiveStake)
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
                        <div className='LabelDetailsInfo'>
                          <Tooltip2 content={'Fee for liquidity provider'}>
                            Lp fee
                          </Tooltip2>
                        </div>
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
                        <div className='LabelDetailsInfo'>
                          {' '}
                          <Tooltip2 content={'Fee for staking rewards'}>
                            Staking fee
                          </Tooltip2>
                        </div>
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
                              .dividedBy(10 ** def_decimals)
                              .toFixed(2)
                          ).toLocaleString()}{' '}
                          :{' '}
                          {Number(
                            firstPoolPosition.second_token_amount
                              .dividedBy(
                                10 **
                                  (in_token == defaultToken
                                    ? out_decimals
                                    : in_decimals)
                              )
                              .toFixed(2)
                          ).toLocaleString()}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          <Tooltip2 content={'Fee for liquidity provider'}>
                            Lp fee #1
                          </Tooltip2>
                        </div>
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
                              .dividedBy(10 ** def_decimals)
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                          :{' '}
                          {Number(
                            secondPoolPosition.second_token_amount
                              .dividedBy(
                                10 **
                                  (out_token == defaultToken
                                    ? def_decimals
                                    : out_decimals)
                              )
                              .toFixed(2)
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}{' '}
                        </div>
                      </div>
                      <div className='DetailsInfo'>
                        <div className='LabelDetailsInfo'>
                          <Tooltip2 content={'Fee for liquidity provider'}>
                            Lp fee #2
                          </Tooltip2>
                        </div>
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
                        <div className='LabelDetailsInfo'>
                          <Tooltip2 content={'Fee for staking rewards'}>
                            Staking fee
                          </Tooltip2>
                        </div>
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
                new BN(restake_balance.claimableRewards).isGreaterThan(
                  min_claim_stake
                ) && (
                  <>
                    <ActionClaim
                      amount={new BN(restake_balance.claimableRewards)}
                    />
                  </>
                )}

              {/** debut montants */}

              <div className='swap-grid'>
                {/* colonne montants */}
                <div className='swapStack compact'>
                  {/* SEND */}
                  <div className='swapCard'>
                    <div className='swapRow'>
                      <div className='amountBig'>
                        <Input
                          inputHeight='56px'
                          inputWidth='100%'
                          borderColor='rgba(105,88,133,.6)'
                          value={tokenAmount}
                          onInputChange={handleTokenAmountChange}
                          rightHtml={
                            <Button
                              textColor='#1F67FF'
                              buttonWidth='44px'
                              buttonHeight='28px'
                              hasBorder={true}
                              borderRadius={999}
                              background='transparent'
                              fontSize='11px'
                              text='MAX'
                              onClick={setToMax}
                            />
                          }
                          type='number'
                          placeholder='0.00'
                          fontSize={18}
                          decimal={Number(in_decimals.toString())}
                        />
                      </div>

                      {/* <= ICI: ton dropdown intégré */}
                      {/* <TokenSelect
                        value={in_token}
                        onChange={setInToken}
                        token_list={token_list}
                        all_lp={all_lp}
                        hasShadow={true}
                        inputWidth='190px'
                        inputHeight='46px'
                      /> */}
                      <TokenSelect
                        value={in_token}
                        onChange={(token: any) => {
                          setInToken(token);
                          setSwapAmount(new BN(0));
                          setTokenAmount(0);
                          setRangeValue(0);
                        }}
                        token_list={tokens}
                        all_lp={all_lp}
                        hasShadow
                        inputWidth='190px'
                        inputHeight='46px'
                        focusOnOpen={false}
                      />
                    </div>

                    {/* balance + range + MAX (SEND) */}
                    <div className='balanceRow rangeInline'>
                      {/* disponible */}
                      <span className='balanceLabel'>
                        {Number(
                          inBalance.dividedBy(10 ** in_decimals).toFixed(4)
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4
                        })}{' '}
                        available
                      </span>

                      {/* slider au centre */}
                      <input
                        className='swapRange'
                        style={{ ['--pct']: pct } as React.CSSProperties}
                        type='range'
                        min='0'
                        max='100'
                        step='1'
                        value={rangeValue}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          handleRangeValueChange(e); // garde ton état rangeValue
                          // met à jour le montant saisi en fonction du % du solde
                          // const avail = Number(
                          //   inBalance.dividedBy(10 ** in_decimals).toFixed()
                          // );
                          // const next = (avail * v) / 100;
                          // handleTokenAmountChange(next.toString());
                        }}
                      />

                      {/* MAX à droite */}
                      <button className='maxChip' onClick={setToMax}>
                        MAX
                      </button>
                    </div>
                  </div>

                  {/* CONNECTEUR + inverse */}
                  <div className='swapConnector'>
                    <div className='line'></div>
                    <div className='ratioChip'>
                      1 {formatSymbol(in_token)} ≈{' '}
                      {(Number(tokenAmount || 0) > 0
                        ? Number(
                            out_amount
                              .minus(out_fees)
                              .div(10 ** out_decimals)
                              .toFixed()
                          ) / Number(tokenAmount || 1)
                        : 0
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6
                      })}{' '}
                      {formatSymbol(out_token)}
                    </div>
                    <button className='circleBtn' onClick={inverse}>
                      ↕
                    </button>
                  </div>

                  {/* RECEIVE + SLIPPAGE (merged) */}
                  <div className='swapCard receiveMerged'>
                    {/* Top row: amount received + token select */}
                    <div className='swapRow'>
                      <div className='amountBig'>
                        <Input
                          inputHeight='56px'
                          inputWidth='100%'
                          borderColor='rgba(105,88,133,.35)'
                          disabled={true}
                          value={new Intl.NumberFormat(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 6
                          }).format(
                            Number(
                              out_amount
                                .minus(out_fees)
                                .div(10 ** out_decimals)
                                .toFixed()
                            )
                          )}
                          type='number'
                          placeholder='0.00'
                          fontSize={18}
                        />
                      </div>

                      {/* <TokenSelect
                        value={out_token}
                        onChange={setOutToken}
                        token_list={token_list}
                        all_lp={all_lp}
                        hasShadow={false}
                        inputWidth='190px'
                        inputHeight='46px'
                        borderColor='#695885'
                      /> */}

                      <TokenSelect
                        value={out_token}
                        onChange={setOutToken}
                        token_list={tokens}
                        all_lp={all_lp}
                        hasShadow
                        inputWidth='190px'
                        inputHeight='46px'
                        focusOnOpen={false}
                      />
                    </div>

                    {/* Slippage inline */}
                    <div className='slipInline'>
                      <div className='slipLabel'>Slippage</div>

                      <div className='slipAffix'>
                        <input
                          type='number'
                          step='0.1'
                          min='0.1'
                          max='5'
                          value={slippage}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val))
                              setSlippage(Math.min(5, Math.max(0.1, val)));
                          }}
                          placeholder='1.0'
                        />
                        <span className='suffix'>%</span>
                      </div>

                      <div className='slipPills'>
                        {['0.5', '1', '2'].map((p) => (
                          <button
                            key={p}
                            type='button'
                            onClick={() => setSlippage(parseFloat(p))}
                            className={`pill ${
                              slippage === parseFloat(p) ? 'is-active' : ''
                            }`}
                          >
                            {p}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Min received + New balance (min) */}
                    <div className='receiveFooter'>
                      <div className='kv'>
                        <span className='k'>Min received</span>
                        <span className='v'>
                          {Number(
                            min_out.dividedBy(10 ** out_decimals).toFixed()
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4
                          })}
                        </span>
                      </div>

                      <div className='kv'>
                        <span className='k'>New balance (min)</span>
                        <span className='v'>
                          {(() => {
                            // newBalanceMin = outBalance + min_out (toutes deux en unités humaines)
                            const bal = outBalance.dividedBy(
                              10 ** out_decimals
                            );
                            const minRecv = min_out.dividedBy(
                              10 ** out_decimals
                            );
                            return Number(
                              bal.plus(minRecv).toFixed()
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            });
                          })()}
                        </span>
                      </div>

                      <div className='kv'>
                        {!isDual ? (
                          <>
                            <span className='k'>Price impact</span>
                            <span
                              className={`v impact ${
                                price_impact > 10
                                  ? 'high'
                                  : price_impact > 5
                                  ? 'medium'
                                  : 'low'
                              }`}
                            >
                              {price_impact.toFixed(2)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <span className='k'>Price impact</span>
                            <span
                              className={`v impact ${
                                price_impact > 10 || dual_price_impact > 10
                                  ? 'high'
                                  : price_impact > 5 || dual_price_impact > 5
                                  ? 'medium'
                                  : 'low'
                              }`}
                            >
                              {price_impact.toFixed(2)}% /{' '}
                              {dual_price_impact.toFixed(2)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* fin montants */}

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
