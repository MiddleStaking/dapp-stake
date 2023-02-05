import React from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import { ReactComponent as MultiversXLogo } from '../../../assets/img/multiversx.svg';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={isLoggedIn ? routeNames.earn : routeNames.home}
        >
          <MultiversXLogo className='multiversx-logo' />
          <span className='dapp-name text-muted'></span>
        </Link>

        <Nav className='ml-auto'>
          {' '}
          <NavItem className='ml-auto'>
            {' '}
            <Link
              className='d-flex align-items-center navbar-brand mr-10'
              to={routeNames.earn}
            >
              <span>Earn (stake) </span>
            </Link>
          </NavItem>
          {isLoggedIn && (
            <NavItem className='ml-auto'>
              <Link
                className='d-flex align-items-center navbar-brand mr-10'
                to={routeNames.fund}
              >
                <span> Fund (lock)</span>
              </Link>
            </NavItem>
          )}
        </Nav>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <>
              <NavItem>
                <Link to={routeNames.statistics} className='nav-link'>
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    className='text-muted'
                  />
                </Link>
              </NavItem>

              <NavItem>
                <button className='btn btn-link' onClick={handleLogout}>
                  Close
                </button>
              </NavItem>
            </>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};
