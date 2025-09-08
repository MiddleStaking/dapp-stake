import React, { CSSProperties, FC, useState } from 'react';
import { FormatAmount } from 'lib';
import { BigNumber } from 'bignumber.js';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'components/Design';
import { defaultToken } from 'config';
import { HeaderMenuContext } from 'context/Header/HeaderMenuContext';
import { routeNames } from 'routes';
import StakeModal from '../../StakeModal';
import UnstakeModal from '../../UnstakeModal';
import ProgressBar from '../../progressBar';
import { ConnectButton } from 'components/Button/ConnectButton';
import { ActionPausePool } from '../../Actions/ActionPausePool';
import { ActionUnPausePool } from '../../Actions/ActionUnPausePool';
import { ActionSetFees } from '../../Actions/ActionsetFees';
import { Action } from 'components/Action';
import { ActionEject } from '../../Actions/ActionEject';
import { ActionClosePool } from '../../Actions/ActionClosePool';

interface AdminSectionProps {
  staked_token: string;
  rewarded_token: string;
  isPaused: boolean;
  // Add other props here if needed
}

const AdminSection: FC<AdminSectionProps> = ({
  staked_token,
  rewarded_token,
  isPaused
}) => {
  return (
    <div>
      {isPaused ? (
        <ActionUnPausePool
          staked_token={staked_token}
          rewarded_token={rewarded_token}
        />
      ) : (
        <ActionPausePool
          staked_token={staked_token}
          rewarded_token={rewarded_token}
        />
      )}
      <ActionSetFees
        staked_token={staked_token}
        rewarded_token={rewarded_token}
      />
      <ActionEject
        staked_token={staked_token}
        rewarded_token={rewarded_token}
      />
      <ActionClosePool
        staked_token={staked_token}
        rewarded_token={rewarded_token}
      />
    </div>
  );
};

export default AdminSection;
