import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { Formik } from 'formik';
import { string, object } from 'yup';

import { Submit } from 'components/Action';
import { network } from 'config';

import styles from './styles.module.scss';
import useTransaction from 'pages/Dashboard/helper/useTransaction';
import { denominated } from 'pages/Dashboard/helper/denominate';
import { nominateValToHex } from 'pages/Dashboard/helper/nominate';
import {
  GetContractDetails,
  GetTotalActiveStake
} from 'pages/Dashboard/helper/requestAbi';

interface ActionDataType {
  amount: string;
}

export const ChangeDelegationCap = (props: any) => {
  const { sendTransactionAdmin } = useTransaction();
  const [total, setTotal] = useState('');
  const [minimum, setMinimum] = useState('');
  const totalActiveStake = GetTotalActiveStake();
  const contractDetails = GetContractDetails();

  // const minimum = denominated(totalActiveStake || '', {
  //   addCommas: false
  // });

  const minimumf = () => {
    return setMinimum(
      denominated(contractDetails ? contractDetails.delegationCap : '', {
        addCommas: false
      })
    );
  };

  console.log(props.delegationGap);

  useEffect(minimumf, [contractDetails]);

  const validationSchema = object().shape({
    amount: string()
      .required('Required')
      .test(
        'minimum',
        `Minimum ${minimum} ${network.egldLabel} or 0 ${network.egldLabel}`,
        (value = '') =>
          new BigNumber(value).isGreaterThanOrEqualTo(minimum) || value === '0'
      )
  });

  const onSubmit = async (data: ActionDataType): Promise<void> => {
    try {
      await sendTransactionAdmin({
        args: nominateValToHex(data.amount.toString()),
        type: 'modifyTotalDelegationCap',
        value: '0'
      });
    } catch (error) {
      console.error(error);
    }
  };

  function removeCommas(str: string) {
    return str.replace(/,/g, '');
  }

  return (
    <div className={`${styles.cap} cap`}>
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={{
          amount: removeCommas(denominated(props.delegationGap))
        }}
      >
        {({
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor='amount'>Update Delegation Cap</label>

              <div className={styles.group}>
                <input
                  type='number'
                  name='amount'
                  step='any'
                  required={true}
                  autoComplete='off'
                  min={0}
                  value={values.amount}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={classNames(styles.input, {
                    [styles.invalid]: errors.amount && touched.amount
                  })}
                />
              </div>

              {errors.amount && touched.amount && (
                <span className={styles.error}>{errors.amount}</span>
              )}
            </div>

            <Submit close='Cancel' submit='Continue' />
          </form>
        )}
      </Formik>
    </div>
  );
};
