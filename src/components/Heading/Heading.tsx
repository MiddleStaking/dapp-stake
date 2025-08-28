import React from 'react';
import {
  faExternalLinkAlt,
  faCog,
  faThLarge,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetPendingTransactions } from 'lib';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import { Action } from 'components/Action';
import { local_network } from 'config';
import { useGlobalContext } from 'context';

// import { Identity } from './components/Identity';

import styles from './styles.module.scss';

export const Heading = () => {
  const { contractDetails } = useGlobalContext();
  const pending = useGetPendingTransactions();

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className={`${styles.heading} heading`}>
      <div className={styles.meta}>
        <div className={styles.label}>Contract Address</div>

        <div className='d-flex align-items-center'>
          <span className={styles.contract}>
            {local_network.delegationContract}
          </span>
          <a
            href={`${local_network.explorerAddress}/accounts/${local_network.delegationContract}`}
            className={styles.icon}
            rel='noreferrer'
            target='_blank'
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </div>

      {contractDetails.data && contractDetails.data.owner && (
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

          {/* {isAdmin && (
            <Action
              title='Agency Details'
              disabled={pending}
              description='Update or set your agency details in order to validate your identity.'
              trigger={
                <div
                  className={classNames(styles.button, {
                    [styles.disabled]: pending
                  })}
                >
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  Identity
                </div>
              }
              render={() => <Identity />}
            />
          )} */}
        </div>
      )}
    </div>
  );
};
