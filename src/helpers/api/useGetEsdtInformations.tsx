import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetNetworkConfig } from 'lib';
import BigNumber from 'bignumber.js';

export const useGetEsdtInformations = (
  identifier: string,
  priceType?: string
) => {
  const { network } = useGetNetworkConfig();
  const time = new Date();
  const [esdtInfo, setEsdtInfo] = useState<any>({});

  const getEsdtInfo = async () => {
    if (!identifier || priceType === 'Sft') return;
    if (identifier === 'EGLD') identifier = 'EGLD-000000';

    const expire_test = Number(localStorage.getItem('esdt_' + identifier + '_expire'));
    const storage = JSON.parse(localStorage.getItem('esdt_' + identifier) as string);
    setEsdtInfo(storage);
    if (time.getTime() < expire_test) return esdtInfo;

    try {
      const { data } = await axios.get<[]>('/tokens/' + identifier, {
        baseURL: network.apiAddress,
        params: {}
      });
      setEsdtInfo(data);
      const expire = time.getTime() + 1000 * 60 * 60;
      localStorage.setItem('esdt_' + identifier, JSON.stringify(data));
      localStorage.setItem('esdt_' + identifier + '_expire', expire.toString());
    } catch {
      setEsdtInfo([]);
    }
  };

  useEffect(() => {
    getEsdtInfo();
  }, [identifier]);

  return esdtInfo;
};

interface FormatAmountProps {
  amount: string | number | BigNumber | null | undefined;
  identifier: string;
  decimals?: number;
  displayDecimals?: number;
  showLastNonZeroDecimal?: boolean;
  withPrice?: boolean;
  nonce?: number;
  showIdentifier?: boolean;
}

export const FormatAmount: React.FC<FormatAmountProps> = ({
  amount,
  identifier,
  decimals: decimalsOverride,
  displayDecimals,
  showLastNonZeroDecimal,
  nonce,
  showIdentifier = true
}) => {
  const esdtInfo = useGetEsdtInformations(nonce && nonce > 0 ? '' : identifier);

  const ticker = identifier === 'EGLD' ? 'EGLD' : esdtInfo?.ticker || identifier.split('-')[0];
  const decimals = decimalsOverride !== undefined ? decimalsOverride : (esdtInfo?.decimals ?? 18);

  if (amount === null || amount === undefined || amount === '') {
    return <span>—</span>;
  }

  const bn = new BigNumber(amount.toString()).shiftedBy(-decimals);
  if (bn.isNaN()) return <span>—</span>;

  let formatted: string;
  if (showLastNonZeroDecimal) {
    formatted = bn.toFixed();
  } else if (displayDecimals !== undefined) {
    formatted = bn.toFixed(displayDecimals, BigNumber.ROUND_DOWN);
  } else {
    const abs = bn.abs();
    if (abs.isZero()) formatted = '0';
    else if (abs.gte(1000)) formatted = bn.toFormat(2);
    else if (abs.gte(1)) formatted = bn.toFixed(4, BigNumber.ROUND_DOWN);
    else formatted = bn.toFixed(6, BigNumber.ROUND_DOWN);
  }

  return (
    <span>
      {formatted}
      {showIdentifier && ticker ? ` ${ticker}` : ''}
    </span>
  );
};
