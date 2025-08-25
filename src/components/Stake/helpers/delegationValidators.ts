import { parseAmount } from 'lib';

import BigNumber from 'bignumber.js';
import { string } from 'yup';
import { local_network, denomination } from 'config';
import { denominated } from 'helpers/denominate';

const undelegateValidator = (input: string) =>
  string()
    .required('Required')
    .test('minimum', 'Value must be greater than zero.', (value = '0') =>
      new BigNumber(parseAmount(value, denomination)).isGreaterThanOrEqualTo(1)
    )
    .test(
      'remaining',
      `Either undelegate the total amount or leave at least 1 ${local_network.egldLabel} staked.`,
      (value = '0') => {
        const requested = new BigNumber(parseAmount(value, denomination));
        const minimum = new BigNumber(parseAmount('1', denomination));
        const total = new BigNumber(input);

        const oneLeft = total.minus(requested).isGreaterThanOrEqualTo(minimum);
        const clearance = total.isEqualTo(value) || total.isEqualTo(requested);

        return oneLeft || clearance;
      }
    )
    .test(
      'maximum',
      `You need to set a value under ${denominated(input)} ${
        local_network.egldLabel
      }.`,
      (value = '0') => {
        const requested = new BigNumber(parseAmount(value, denomination));
        const total = new BigNumber(input);
        const maxed = total.isEqualTo(value);
        const below = requested.isLessThanOrEqualTo(input);

        return maxed || below;
      }
    );

const delegateValidator = (input: string, limit: string) =>
  string()
    .required('Required')
    .test('minimum', 'Value must be greater than zero.', (value = '0') =>
      new BigNumber(parseAmount(value, denomination)).isGreaterThanOrEqualTo(1)
    )
    .test(
      'maximum',
      `You need to set a value under ${denominated(input)} ${
        local_network.egldLabel
      }.`,
      (value = '0') =>
        new BigNumber(parseAmount(value, denomination)).isLessThanOrEqualTo(
          input
        )
    )
    .test(
      'uncapable',
      `Max delegation cap reached. That is the maximum amount you can delegate: ${denominated(
        limit
      )} ${local_network.egldLabel}`,
      (value = '0') =>
        new BigNumber(parseAmount(value, denomination)).isLessThanOrEqualTo(
          limit
        )
    );

export { delegateValidator, undelegateValidator };
