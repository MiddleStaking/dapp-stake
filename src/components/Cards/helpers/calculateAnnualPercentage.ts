import { decodeString } from '@multiversx/sdk-core';
import {
  denomination,
  decimals,
  feesInEpoch,
  stakePerNode,
  protocolSustainabilityRewards,
  yearSettings,
  genesisTokenSupply
} from 'config';
import denominate from 'helpers/denominate';

const denominateValue = (value: string) => {
  const denominatedValueString = denominate({
    input: value,
    denomination,
    decimals
  });
  const valueWithoutComma = denominatedValueString.replace(/,/g, '');
  return valueWithoutComma;
};

const calculateAnnualPercentage = ({
  activeStake,
  blsKeys,
  networkStatus,
  networkStake,
  networkConfig,
  serviceFee
}: any) => {
  const allNodes = blsKeys.filter(
    (key: any) =>
      decodeString(key) === 'staked' ||
      decodeString(key) === 'jailed' ||
      decodeString(key) === 'queued'
  ).length;
  const allActiveNodes = blsKeys.filter(
    (key: any) => decodeString(key) === 'staked'
  ).length;

  // Safe access helpers
  const getProp = (obj: any, key: string) =>
    obj?.[key] ?? obj?.[key.charAt(0).toLowerCase() + key.slice(1)] ?? 0;

  const roundDuration = getProp(networkConfig, 'RoundDuration');
  const roundsPerEpoch = getProp(networkConfig, 'RoundsPerEpoch');
  const epochNumber = getProp(networkStatus, 'EpochNumber');

  const epochDurationInSeconds = (roundDuration / 1000) * roundsPerEpoch;
  const secondsInYear = 365 * 24 * 3600;
  const epochsInYear =
    epochDurationInSeconds > 0 ? secondsInYear / epochDurationInSeconds : 0;

  const inflationRate =
    yearSettings.find(
      (x) => x.year === Math.floor(epochNumber / epochsInYear) + 1
    )?.maximumInflation || 0;

  const rewardsPerEpoch = Math.max(
    epochsInYear > 0 ? (inflationRate * genesisTokenSupply) / epochsInYear : 0,
    feesInEpoch
  );

  const rewardsPerEpochWithoutProtocolSustainability =
    (1 - protocolSustainabilityRewards) * rewardsPerEpoch;

  const topUpFactor = getProp(networkConfig, 'TopUpFactor');
  const topUpRewardsLimit =
    topUpFactor * rewardsPerEpochWithoutProtocolSustainability;

  const activeValidators = getProp(networkStake, 'ActiveValidators') || 0;
  const totalValidators = getProp(networkStake, 'TotalValidators') || 0;
  const queueSize = getProp(networkStake, 'QueueSize') || 0;
  const networkBalance = getProp(networkStatus, 'Balance'); // Balance is usually PascalCase in proxy, but check both

  const networkBaseStake = activeValidators * stakePerNode;
  // Handle BigNumber or string for Balance
  const networkTotalStake = parseInt(
    denominateValue(networkBalance.toString())
  );

  const networkTopUpStake =
    networkTotalStake -
    totalValidators * stakePerNode -
    queueSize * stakePerNode;

  const topUpGradient = getProp(networkConfig, 'TopUpRewardsGradientPoint');
  const topUpGradientVal =
    typeof topUpGradient === 'object' ? topUpGradient.toFixed() : topUpGradient;

  const topUpDenominator =
    2 * parseInt(denominateValue(new String(topUpGradientVal).toString()));

  let topUpAtanArg = 0;
  if (topUpDenominator !== 0) {
    topUpAtanArg = networkTopUpStake / topUpDenominator;
  } else if (networkTopUpStake > 0) {
    topUpAtanArg = Infinity;
  } else if (networkTopUpStake < 0) {
    topUpAtanArg = -Infinity;
  }

  const topUpRewardRaw =
    ((2 * topUpRewardsLimit) / Math.PI) * Math.atan(topUpAtanArg);

  // If calculation resulted in NaN (e.g. 0/0 where our checks somehow missed or other inputs were NaN), fallback to 0
  const topUpReward = isNaN(topUpRewardRaw) ? 0 : topUpRewardRaw;

  const baseReward = rewardsPerEpochWithoutProtocolSustainability - topUpReward;
  const validatorTotalStake = parseInt(denominateValue(activeStake));

  // Checks if we should use theoretical calculation (if no stake or no active nodes)
  const isTheoreticalCalculation =
    validatorTotalStake === 0 || allActiveNodes === 0;

  const effectiveValidatorTotalStake = isTheoreticalCalculation
    ? stakePerNode
    : validatorTotalStake;
  const effectiveAllActiveNodes = isTheoreticalCalculation ? 1 : allActiveNodes;

  const actualNumberOfNodes = Math.min(
    Math.floor(effectiveValidatorTotalStake / stakePerNode),
    effectiveAllActiveNodes
  );
  const validatorBaseStake = actualNumberOfNodes * stakePerNode;

  // For theoretical calculation, use effective nodes count for top up rewards distribution logic
  const effectiveAllNodes =
    isTheoreticalCalculation && allNodes === 0 ? 1 : allNodes;

  const validatorTopUpStake =
    effectiveAllNodes > 0
      ? Math.max(
          0,
          ((effectiveValidatorTotalStake - effectiveAllNodes * stakePerNode) /
            effectiveAllNodes) *
            effectiveAllActiveNodes
        )
      : 0;

  const validatorTopUpReward =
    networkTopUpStake > 0
      ? (validatorTopUpStake / networkTopUpStake) * topUpReward
      : 0;

  const safeNetworkBaseStake = networkBaseStake === 0 ? 1 : networkBaseStake;

  const validatorBaseReward =
    (validatorBaseStake / safeNetworkBaseStake) * baseReward;

  if (effectiveValidatorTotalStake === 0) {
    return '0.00';
  }

  const anualPercentageRate =
    (epochsInYear * (validatorTopUpReward + validatorBaseReward)) /
    effectiveValidatorTotalStake;

  const safeServiceFee = isNaN(serviceFee) ? 0 : serviceFee;

  const annuallPercentageRateTotal =
    anualPercentageRate * 100 -
    anualPercentageRate * 100 * (safeServiceFee / 100);

  if (
    isNaN(annuallPercentageRateTotal) ||
    !isFinite(annuallPercentageRateTotal)
  ) {
    return '0.00';
  }

  return annuallPercentageRateTotal.toFixed(2).toString();
};

export default calculateAnnualPercentage;
