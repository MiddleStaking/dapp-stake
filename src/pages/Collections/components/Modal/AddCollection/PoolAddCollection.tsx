import * as React from 'react';
import { useState } from 'react';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import ModalAddCollection from './ModalAddCollection';
import { Button } from 'components/Design';

export const PoolAddCollection = ({
  address,
  userEsdtBalance,
  buttonHeight
}: any) => {
  const [showStake, setShowStake] = useState(false);
  const { setHeaderMenu } = React.useContext(HeaderMenuContext);

  return (
    <>
      {showStake && (
        <ModalAddCollection
          onClose={() => {
            setHeaderMenu(true), setShowStake(false);
          }}
          show={showStake}
          userEsdtBalance={userEsdtBalance}
        />
      )}

      {address && (
        <>
          <Button
            borderRadius={40}
            hasBorder={true}
            background={'black'}
            borderColor={['#BD37EC', '#1F67FF']}
            text={'AddCollection'}
            buttonWidth={'100%'}
            buttonHeight='31px'
            onClick={() => {
              setHeaderMenu(false), setShowStake(true);
            }}
          />
        </>
      )}
    </>
  );
};
