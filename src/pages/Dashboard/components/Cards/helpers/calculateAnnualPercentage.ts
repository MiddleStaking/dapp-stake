//import { decodeString } from '@multiversx/sdk-core/out';
import {
  denomination,
  decimals,
  feesInEpoch,
  stakePerNode,
  protocolSustainabilityRewards,
  yearSettings,
  genesisTokenSupply
} from 'config';
import denominate from 'pages/Dashboard/helper/denominate';

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
  networkStatus,
  serviceFee,
  configNetwork,
  epochNumber
}: any) => {
  // ok;

  // const allNodes = blsKeys.filter(
  //   (key: any) =>
  //     decodeString(key) === 'staked' ||
  //     decodeString(key) === 'jailed' ||
  //     decodeString(key) === 'queued'
  // ).length;

  const allNodes = 31;
  // const allActiveNodes = blsKeys.filter(
  //   (key: any) => decodeString(key) === 'staked'
  // ).length;
  // if (allActiveNodes <= 0) {
  //   return '0.00';
  // }

  const allActiveNodes = 31;
  // const epochDurationInSeconds =
  //   (networkConfig.RoundDuration / 1000) * networkConfig.RoundsPerEpoch;
  // const secondsInYear = 365 * 24 * 3600;

  const epochDurationInSeconds =
    (configNetwork.RoundDuration / 1000) * configNetwork.RoundsPerEpoch;
  const secondsInYear = 365 * 24 * 3600;

  // const epochsInYear = secondsInYear / epochDurationInSeconds;
  const epochsInYear = secondsInYear / epochDurationInSeconds;

  const inflationRate =
    yearSettings.find(
      (x) => x.year === Math.floor(epochNumber.epoch / epochsInYear) + 1
    )?.maximumInflation || 0;
  // const inflationRate =
  //   yearSettings.find(
  //     (x) => x.year === Math.floor(networkStatus.EpochNumber / epochsInYear) + 1
  //   )?.maximumInflation || 0;

  const rewardsPerEpoch = Math.max(
    (inflationRate * genesisTokenSupply) / epochsInYear,
    feesInEpoch
  );

  const rewardsPerEpochWithoutProtocolSustainability =
    (1 - protocolSustainabilityRewards) * rewardsPerEpoch;

  const topUpRewardsLimit =
    configNetwork.TopUpFactor * rewardsPerEpochWithoutProtocolSustainability;

  const networkBaseStake = networkStatus.ActiveValidators * stakePerNode;
  const networkTotalStake = parseInt(
    denominateValue(networkStatus.TotalStaked.toFixed().toString())
  );

  const networkTopUpStake =
    networkTotalStake -
    networkStatus.TotalValidators * stakePerNode -
    networkStatus.QueueSize * stakePerNode;

  const topUpReward =
    ((2 * topUpRewardsLimit) / Math.PI) *
    Math.atan(
      networkTopUpStake /
        (2 *
          parseInt(
            denominateValue(configNetwork.TopUpRewardsGradientPoint.toFixed())
          ))
    );

  const baseReward = rewardsPerEpochWithoutProtocolSustainability - topUpReward;
  const validatorTotalStake = parseInt(denominateValue(activeStake));
  const actualNumberOfNodes = Math.min(
    Math.floor(validatorTotalStake / stakePerNode),
    allActiveNodes
  );
  const validatorBaseStake = actualNumberOfNodes * stakePerNode;

  const validatorTopUpStake =
    ((validatorTotalStake - allNodes * stakePerNode) / allNodes) *
    allActiveNodes;

  const validatorTopUpReward =
    networkTopUpStake > 0
      ? (validatorTopUpStake / networkTopUpStake) * topUpReward
      : 0;

  const validatorBaseReward =
    (validatorBaseStake / networkBaseStake) * baseReward;

  const anualPercentageRate =
    (epochsInYear * (validatorTopUpReward + validatorBaseReward)) /
    validatorTotalStake;
  const annuallPercentageRateTotal =
    anualPercentageRate * 100 - anualPercentageRate * 100 * (serviceFee / 100);
  return annuallPercentageRateTotal.toFixed(2).toString();
};

export default calculateAnnualPercentage;
