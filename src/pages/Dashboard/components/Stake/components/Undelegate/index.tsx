import React, { FC, ChangeEvent, MouseEvent, useState } from 'react';

import { Formik } from 'formik';
import { object } from 'yup';

import styles from './styles.module.scss';
import { undelegateValidator } from '../../helpers/delegationValidators';
import { onUnDelegate } from 'pages/Dashboard/helper/requestAbi';
import { denominated } from 'pages/Dashboard/helper/denominate';
import modifiable from 'pages/Dashboard/helper/modifiable';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';
import Action, { Submit } from 'pages/Dashboard/Action';

const Undelegate: FC<any> = (props: any) => {
  // const { userActiveStake } = useGlobalContext();
  // const { onUndelegate } = useStakeData();
  const [maxed, setMaxed] = useState<boolean>(false);
  const { network } = useGetNetworkConfig();

  return (
    <div className={`${styles.wrapper} undelegate-wrapper`}>
      <Action
        title='Undelegate Now'
        description={`Select the amount of ${network.egldLabel} you want to undelegate.`}
        trigger={<div className={styles.trigger}>Undelegate</div>}
        render={
          <div className={styles.undelegate}>
            <Formik
              validationSchema={object().shape({
                amount: undelegateValidator(props.UserActiveStake || '')
              })}
              onSubmit={onUnDelegate}
              initialValues={{
                amount: '0'
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
                const amount = denominated(props.UserActiveStake, {
                  addCommas: true,
                  showLastNonZeroDecimal: true
                });

                const valueWithoutComma = amount.replace(/,/g, '');
                const valueWithoutComma2 = valueWithoutComma.replace(
                  /\./g,
                  ','
                );

                const onChange = (
                  event: ChangeEvent<HTMLInputElement>
                ): void => {
                  handleChange(event);
                  setMaxed(false);
                };

                const onMax = (event: MouseEvent): void => {
                  event.preventDefault();
                  setMaxed(false);
                  setFieldValue('amount', valueWithoutComma);
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
                          min={0}
                          className={modifiable(
                            'input',
                            [errors.amount && touched.amount && 'invalid'],
                            styles
                          )}
                          value={maxed ? amount : values.amount}
                          onBlur={handleBlur}
                          onChange={onChange}
                        />

                        <a href='/#' onClick={onMax} className={styles.max}>
                          Max
                        </a>
                      </div>

                      <span className={styles.description}>
                        <span>Balance:</span>{' '}
                        {denominated(props.UserActiveStake || '')}{' '}
                        {network.egldLabel}
                      </span>

                      {errors.amount && touched.amount && (
                        <span className={styles.error}>{errors.amount}</span>
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

export default Undelegate;
