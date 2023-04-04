import React from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import {
  faBoltLightning,
  faChartSimple,
  faFaucet,
  faLock,
  faRotate,
  faClockRotateLeft,
  faVault,
  faScrewdriverWrench,
  faChartColumn,
  faPiggyBank
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//*import { Navbar as BsNavbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import { ReactComponent as MiddleLogo } from '../../../assets/img/ms.svg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { defaultToken } from 'config';

export const MyNavbar = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { network } = useGetNetworkConfig();
  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };
  //https://react-bootstrap.github.io/components/navbar/
  //good examples
  return (
    //   <BsNavbar className='bg-white border-bottom px-4 py-3'>
    //     <div className='container-fluid'>
    //       <Link
    //         className='d-flex align-items-center navbar-brand mr-0'
    //         to={isLoggedIn ? routeNames.earn : routeNames.home}
    //       >
    //         <MultiversXLogo className='multiversx-logo' />
    //         <span className='dapp-name text-muted'></span>
    //       </Link>

    //       <Nav className='ml-auto'>
    //         {' '}
    //         {/* STAKE */}
    //         <NavItem className='ml-auto'>
    //           {' '}
    //           <Link
    //             className='d-flex align-items-center navbar-brand mr-10'
    //             to={routeNames.earn}
    //           >
    //             <span>Earn (stake) </span>
    //           </Link>
    //         </NavItem>
    //         {/* DASHBOARD */}
    //         <NavItem className='ml-auto'>
    //           {' '}
    //           <Link
    //             className='d-flex align-items-center navbar-brand mr-10'
    //             to={routeNames.earn}
    //           >
    //             <span>Dasjboard (stake) </span>
    //           </Link>
    //         </NavItem>{' '}
    //         {/* REWARDS */}
    //         <NavItem className='ml-auto'>
    //           {' '}
    //           <Link
    //             className='d-flex align-items-center navbar-brand mr-10'
    //             to={routeNames.earn}
    //           >
    //             <span>REWARDS (stake) </span>
    //           </Link>
    //         </NavItem>
    //         {/* FUND */}
    //         {isLoggedIn && (
    //           <NavItem className='ml-auto'>
    //             <Link
    //               className='d-flex align-items-center navbar-brand mr-10'
    //               to={routeNames.fund}
    //             >
    //               <span> Fund (lock)</span>
    //             </Link>
    //           </NavItem>
    //         )}
    //       </Nav>

    //       <Nav className='ml-auto'>
    //         {isLoggedIn && (
    //           <>
    //             <NavItem>
    //               <Link to={routeNames.statistics} className='nav-link'>
    //                 <FontAwesomeIcon
    //                   icon={faChartSimple}
    //                   className='text-muted'
    //                 />
    //               </Link>
    //             </NavItem>

    //             <NavItem>
    //               <button className='btn btn-link' onClick={handleLogout}>
    //                 Close
    //               </button>
    //             </NavItem>
    //           </>
    //         )}
    //       </Nav>
    //     </div>
    //   </BsNavbar>
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        {/* <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand> */}
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={
            isLoggedIn
              ? routeNames.stake + '/' + defaultToken
              : routeNames.stake + '/' + defaultToken
          }
        >
          <MiddleLogo className='multiversx-logo' />
          <span className='text-muted' style={{ marginRight: '15px' }}>
            Middle Staking{' '}
          </span>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {/* STAKE */}
            <Link
              className='d-flex align-items-center navbar-brand mr-10'
              to={routeNames.stake + '/' + defaultToken}
            >
              {' '}
              <FontAwesomeIcon icon={faBoltLightning} className='mr-1' />
              <span> ESDT Staking</span>
            </Link>

            <Link
              className='d-flex align-items-center navbar-brand mr-10'
              to={routeNames.dashboard}
            >
              <span>
                {' '}
                <FontAwesomeIcon icon={faPiggyBank} className='mr-1' />
                <span>DashBoard</span>
                {/* <s>DashBoard</s> */}
              </span>
            </Link>

            {isLoggedIn && (
              <Link
                className='d-flex align-items-center navbar-brand mr-10'
                to={routeNames.rewards}
              >
                {' '}
                <FontAwesomeIcon icon={faClockRotateLeft} className='mr-1' />
                <span>Rewards</span>
              </Link>
            )}

            <Link
              className='d-flex align-items-center navbar-brand mr-10'
              to={routeNames.tokenomics}
            >
              {' '}
              <FontAwesomeIcon icon={faChartColumn} className='mr-1' />
              <span>Tokenomics</span>
            </Link>

            {isLoggedIn && (
              <Link
                className='d-flex align-items-center navbar-brand mr-10'
                to={routeNames.fund}
              >
                {' '}
                <FontAwesomeIcon icon={faLock} className='mr-1' />
                <span>Deposit</span>
              </Link>
            )}
            {/* <Nav.Link href='#pricing'>Pricing</Nav.Link>
            <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav className='ml-auto'>
            {isLoggedIn && network.chainId != '1' && (
              <>
                <Link to={routeNames.faucet} className='nav-link text-white'>
                  <FontAwesomeIcon icon={faFaucet} className='' /> Faucet
                </Link>
              </>
            )}
            {network.chainId == '1' && (
              <>
                <a
                  href='https://devnet-app.middlestaking.fr'
                  className='nav-link text-white'
                >
                  <FontAwesomeIcon icon={faScrewdriverWrench} className='' />{' '}
                  test on Devnet
                </a>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  to={routeNames.statistics}
                  className='nav-link text-white'
                >
                  <FontAwesomeIcon icon={faChartSimple} className='' />
                </Link>
                <button
                  className='btn btn-link text-white'
                  onClick={handleLogout}
                >
                  Disconnect
                </button>
              </>
            )}
          </Nav>
          {/* <Nav>
            <Nav.Link href='#deets'>More deets</Nav.Link>
            <Nav.Link eventKey={2} href='#memes'>
              Dank memes
            </Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
