import React, { useEffect, useRef, useState } from 'react';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { local_network } from 'config';
import styles from './tokenomics.module.scss';

interface Adress {
  address: string;
}

const Truncate = (address: Adress) => {
  const [showIci, setShowIci] = useState(false);
  const contractRef = useRef<HTMLSpanElement>(null);

  const checkOverflow = () => {
    if (contractRef.current) {
      const isOverflowing =
        contractRef.current.offsetWidth < contractRef.current.scrollWidth;
      setShowIci(isOverflowing);
    }
  };

  useEffect(() => {
    checkOverflow();

    // Ajouter un event listener pour gérer le redimensionnement de la fenêtre
    const handleResize = () => {
      checkOverflow();
    };
    window.addEventListener('resize', handleResize);

    // Supprimer l'event listener lors du nettoyage de l'effet
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [address.address]);

  return (
    <div className={`${styles.heading}`}>
      <div className={styles.meta}>
        <div className='d-flex align-items-center'>
          <span
            ref={contractRef}
            className={styles.contract}
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
              lineHeight: 1,
              color: 'white',
              marginRight: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {address.address}
          </span>
          <span
            style={{
              marginLeft: 0,
              marginRight: '10px',
              fontWeight: 'bold',
              fontSize: '15px'
            }}
          >
            {showIci && <>{address.address.slice(-4)}</>}
          </span>

          <a
            href={`${local_network.explorerAddress}/accounts/${address}`}
            className={styles.icon}
            rel='noreferrer'
            target='_blank'
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Truncate;
