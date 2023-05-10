import React, { useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';
import { useNavigate } from 'react-router-dom';

// import { Nodes } from 'components/Nodes';
// import { Toggles } from 'components/Toggles';

// import { useGlobalContext } from 'context';

// import useGlobalData from '../../hooks/useGlobalData';
import styles from './styles.module.scss';
import Heading from 'pages/Dashboard/components/Heading';
import Cards from 'pages/Dashboard/components/Cards';
import { GetContractDetails } from 'pages/Dashboard/helper/requestAbi';
import { Toggles } from './components/Toggles';
import { Nodes } from './Nodes';

export const Admin = () => {
  const { address } = useGetAccountInfo();
  const contractDetails: any = GetContractDetails();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const handleRedirect = () => {
    if (!Boolean(address)) {
      navigate('/unlock');
      return;
    }

    if (contractDetails.status !== 'failed') {
      console.log(contractDetails);

      if (contractDetails && contractDetails.owner) {
        setLoading(false);
      } else {
        // navigate('/dashboard');
      }
    }
  };

  useEffect(handleRedirect, [address, contractDetails]);
  //   useGlobalData();

  if (loading) {
    return (
      <div
        style={{ fontSize: '30px' }}
        className='d-flex align-items-center justify-content-center text-white flex-fill'
      >
        <FontAwesomeIcon
          icon={faSpinner}
          size='2x'
          spin={true}
          className='mr-3'
        />
        {contractDetails.status}
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      <Heading />
      <Cards />
      <Toggles />
      <Nodes />
    </div>
  );
};
