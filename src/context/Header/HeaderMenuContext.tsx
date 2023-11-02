import React from 'react';

export const HeaderMenuContext = React.createContext({
  headerMenu: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setHeaderMenu: (value: boolean) => {
    console.log(value);
  }
});
