import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnlockPanelManager, useGetLoginInfo } from 'lib';
import { RouteNamesEnum } from 'localConstants';

export const Unlock = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useGetLoginInfo();

  const unlockPanelManager = UnlockPanelManager.init({
    loginHandler: () => {
      navigate(RouteNamesEnum.earn);
    },
    onClose: () => {
      navigate(RouteNamesEnum.earn);
    }
  });

  const handleOpenUnlockPanel = () => {
    unlockPanelManager.openUnlockPanel();
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(RouteNamesEnum.earn);
      return;
    }

    handleOpenUnlockPanel();
  }, [isLoggedIn]);

  return null;
};
