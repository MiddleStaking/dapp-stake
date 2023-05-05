import React from 'react';

import classNames from 'classnames';
import { Formik } from 'formik';
import { Submit } from 'components/Action';

// import { useGlobalContext } from 'context';
// import { nominateVal } from 'helpers/nominate';
// import useTransaction from 'helpers/useTransaction';

import styles from './styles.module.scss';
import useTransaction from 'pages/Dashboard/helper/useTransaction';
import { nominateVal } from 'pages/Dashboard/helper/nominate';
import { GetContractDetails } from 'pages/Dashboard/helper/requestAbi';

interface ActionDataType {
  amount: string;
}

export const ChangeServiceFee = () => {
  const breakpoints = [0, 25, 50, 75, 100];

  const { sendTransactionAdmin } = useTransaction();
  const contractDetails = GetContractDetails();

  const onSubmit = async (data: ActionDataType): Promise<void> => {
    try {
      await sendTransactionAdmin({
        args: nominateVal(data.amount),
        type: 'changeServiceFee',
        value: '0'
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(contractDetails.serviceFee.replace('%', ''));

  return contractDetails.serviceFee === '' ? (
    <p>chargement</p>
  ) : (
    <Formik
      onSubmit={onSubmit}
      initialValues={{
        amount: contractDetails.serviceFee.replace('%', '')
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={`${styles.serviceFee} serviceFee`}
        >
          <div className={styles.range}>
            <input
              className={styles.input}
              name='amount'
              type='range'
              onBlur={handleBlur}
              onChange={handleChange}
              min={0}
              max={100}
              value={values.amount}
            />

            <span
              className={styles.thumb}
              style={{ left: `${values.amount}%` }}
            >
              <strong>{values.amount}%</strong>
            </span>

            <div
              className={styles.completion}
              style={{ width: `${values.amount}%` }}
            />

            {breakpoints.map((breakpoint) => (
              <div
                style={{ left: `${breakpoint}%` }}
                key={`breakpoint-${breakpoint}`}
                className={classNames(styles.breakpoint, {
                  [styles.completed]: breakpoint <= parseInt(values.amount)
                })}
              >
                <span>{breakpoint}%</span>
              </div>
            ))}
          </div>

          <Submit close='Cancel' submit='Save' />
        </form>
      )}
    </Formik>
  );
};
