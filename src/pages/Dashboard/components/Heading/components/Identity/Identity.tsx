import React, { useEffect } from 'react';
import {
  ContractFunction,
  Address,
  Query,
  decodeString
} from '@multiversx/sdk-core';
import { useGetSuccessfulTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetSuccessfulTransactions';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers';

import classNames from 'classnames';
import { Formik, FormikProps } from 'formik';
import { object, string } from 'yup';

import { Submit } from 'components/Action';
import { network } from 'config';

import styles from './styles.module.scss';
import useTransaction from 'pages/Dashboard/helper/useTransaction';
import { GetAgencyMetaData } from 'pages/Dashboard/helper/requestAbi';

interface FieldType {
  [key: string]: any;
  label: string;
  name: string;
}

interface PayloadType {
  [key: string]: any;
  website?: string;
  keybase?: string;
  name?: string;
}

export const Identity = () => {
  const agencyMetaData = GetAgencyMetaData();
  const { sendTransactionAdmin } = useTransaction();
  const { hasSuccessfulTransactions, successfulTransactionsArray } =
    useGetSuccessfulTransactions();

  // const dispatch = useDispatch();
  const fields: FieldType[] = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'website',
      label: 'Website'
    },
    {
      name: 'keybase',
      label: 'Keybase'
    }
  ];

  const validationSchema = object().shape({
    name: string().required('Name required.'),
    keybase: string().required('Keybase required.'),
    website: string()
      .required('Website required.')
      .test('URL', 'URL is not valid!', (value: any) => {
        try {
          return value && !value.includes('#') && Boolean(new URL(value || ''));
        } catch (error) {
          return false;
        }
      })
  });

  const onSubmit = async (payload: PayloadType): Promise<void> => {
    const { website, name, keybase }: PayloadType = Object.keys(payload).reduce(
      (data, key) => ({
        ...data,
        [key]: Buffer.from(payload[key]).toString('hex')
      }),
      {}
    );

    try {
      await sendTransactionAdmin({
        args: `${name}@${website}@${keybase}`,
        type: 'setMetaData',
        value: '0'
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchAgencyMetaData = () => {
  //   if (agencyMetaData.status === 'loading') {
  //     GetAgencyMetaData();
  //     return;
  //   }
  //   return;
  // };

  // const refetchAgencyMetaData = () => {
  //   if (
  //     hasSuccessfulTransactions &&
  //     agencyMetaData &&
  //     successfulTransactionsArray.length > 0
  //   ) {
  //     GetAgencyMetaData();
  //   }
  // };

  // useEffect(fetchAgencyMetaData, [agencyMetaData]);
  // useEffect(refetchAgencyMetaData, [
  //   hasSuccessfulTransactions,
  //   successfulTransactionsArray.length
  // ]);

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
      initialValues={agencyMetaData || { name: '', website: '', keybase: '' }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }: FormikProps<PayloadType>) => (
        <form onSubmit={handleSubmit} className={`${styles.identity} identity`}>
          {fields.map((field: FieldType) => (
            <div key={field.name} className={styles.field}>
              <label htmlFor={field.name}>{field.label}</label>
              <div className='input-group'>
                <input
                  type='text'
                  name={field.name}
                  value={values[field.name]}
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames(styles.input, {
                    [styles.invalid]: errors[field.name] && touched[field.name]
                  })}
                />
                {errors[field.name] && touched[field.name] && (
                  <span className={styles.error}>{errors[field.name]}</span>
                )}
              </div>
            </div>
          ))}

          <Submit close='Cancel' submit='Save' />
        </form>
      )}
    </Formik>
  );
};
