import React, { FC, MouseEvent } from 'react';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Formik } from 'formik';
import { object } from 'yup';

import Action, { Submit } from 'components/Action';

import { network } from 'config';

import styles from './styles.module.scss';
import { FormatAmount } from '@multiversx/sdk-dapp/UI/FormatAmount';

import react from 'react';
import { delegateValidator } from '../../helpers/delegationValidators';
import { onDelegate } from 'pages/Dashboard/helper/requestAbi';
import { denominated } from 'pages/Dashboard/helper/denominate';
import modifiable from 'pages/Dashboard/helper/modifiable';

const Delegate: FC<any> = (props: any) => {
  const { account } = useGetAccountInfo();
  // const { onDelegate, getStakingLimits } = useStakeData();
  // const { limit, balance, maxed } = props.StakingLimits.balance;
  // const { limit, balance, maxed } = props.StakingLimits.balance;

  // react.useEffect(() => {

  // }

  return (
    <div className={`${styles.wrapper} delegate-wrapper`}>
      <Action
        title='Delegate Now'
        description={`Select the amount of ${network.egldLabel} you want to delegate.`}
        trigger={<div className={styles.trigger}>Delegate</div>}
        render={
          <div className={styles.delegate}>
            <Formik
              validationSchema={object().shape({
                amount: delegateValidator(
                  props.StakingLimits.balance,
                  props.StakingLimits.limit
                )
              })}
              onSubmit={onDelegate}
              // onSubmit={() => console.log()}
              initialValues={{
                amount: '1'
              }}
            >
              {({
                errors,
                values,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              }) => {
                const onMax = (event: MouseEvent): void => {
                  event.preventDefault();
                  setFieldValue(
                    'amount',
                    denominated(props.StakingLimits.limit, { addCommas: false })
                  );
                };

                return (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                      <label htmlFor='amount'>{network.egldLabel} Amount</label>
                      <div className={styles.group}>
                        <input
                          type='number'
                          name='amount'
                          step='any'
                          required={true}
                          autoComplete='off'
                          min={1}
                          className={modifiable(
                            'input',
                            [errors.amount && touched.amount && 'invalid'],
                            styles
                          )}
                          value={values.amount}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={props.StakingLimits.balance.maxed}
                        />

                        <a
                          href='/#'
                          onClick={onMax}
                          className={modifiable(
                            'max',
                            [props.StakingLimits.balance.maxed],
                            styles
                          )}
                        >
                          Max
                        </a>
                      </div>

                      <span className={styles.description}>
                        <span>Balance:</span>
                        <FormatAmount
                          value={account.balance}
                          data-testid='balance'
                          digits={2}
                        />
                        {/* {denominated(account.balance)} {network.egldLabel} */}
                      </span>

                      {((errors.amount && touched.amount) ||
                        props.StakingLimits.balance.maxed) && (
                        <span className={styles.error}>
                          {props.StakingLimits.balance.maxed
                            ? 'Max delegation cap reached, staking unavailable.'
                            : errors.amount}
                        </span>
                      )}
                    </div>

                    <Submit save='Continue' />
                  </form>
                );
              }}
            </Formik>
          </div>
        }
      />
    </div>
  );
};

export default Delegate;
