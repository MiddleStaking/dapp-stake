import React, { useState } from 'react';
import { HeaderMenuContext } from './HeaderMenuContext';

export const HeaderMenuProvider = ({ children }: any) => {
  const [headerMenu, setHeaderMenuState] = useState(true);

  const setHeaderMenu = (value: boolean | ((prev: boolean) => boolean)) => {
    setHeaderMenuState((prev) =>
      typeof value === 'function' ? value(prev) : value
    );
  };

  return (
    <HeaderMenuContext.Provider value={{ headerMenu, setHeaderMenu }}>
      {children}
    </HeaderMenuContext.Provider>
  );
};
