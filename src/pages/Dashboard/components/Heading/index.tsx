import React, { FC } from 'react';

import {
  faCog,
  faEdit,
  faExternalLinkAlt,
  faThLarge
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLocation, useNavigate } from 'react-router-dom';
import { network } from 'config';

// import Identity from './components/Identity';

import styles from './styles.module.scss';
import { GetContractDetails } from 'pages/Dashboard/helper/requestAbi';
import Action from 'components/Action';
import { Identity } from './components/Identity';

const Heading: FC = () => {
  // const { contractDetails } = useGlobalContext();
  const contractDetails: any = GetContractDetails();

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className={`${styles.heading} heading`}>
      <div className={styles.meta}>
        <div className={styles.label}>Contract Address</div>

        <div className='d-flex align-items-center'>
          <span className={styles.contract}>{network.delegationContract}</span>
          <a
            href={`${network.explorerAddress}/accounts/${network.delegationContract}`}
            className={styles.icon}
            rel='noreferrer'
            target='_blank'
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </div>

      {contractDetails && contractDetails.owner && (
        <div className='d-flex align-items-center'>
          <button
            type='button'
            onClick={() => navigate(isAdmin ? '/dashboard' : '/admin')}
            className={styles.button}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={isAdmin ? faThLarge : faCog} />
            </span>

            {isAdmin ? 'Dashboard' : 'Admin'}
          </button>

          {isAdmin && (
            <Action
              title='Agency Details'
              description='Update or set your agency details in order to validate your identity.'
              trigger={
                <div className={styles.button}>
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  Identity
                </div>
              }
              render={<Identity />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Heading;
