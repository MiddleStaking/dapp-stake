import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { defaultToken } from 'config';
import { useGetSwapedTokens } from './Actions/helpers';
import { useGetUserESDT } from './Actions/helpers/useGetUserESDT';
import { LiquidInfo } from './LiquidInfo';
import { useGetAllLp } from 'pages/Swap/components/Actions/helpers';

export const LiquidityLayout = () => {
  //const { network } = useGetNetworkConfig();
  const swapedTokens: string[] = useGetSwapedTokens();
  const allLp = useGetAllLp();
  const userEsdtBalance = useGetUserESDT();

  // console.log(allLp);
  return (
    <div className='center'>
      <div className='col-12'>
        <Row className='pt-4'>
          {/* {swapedTokens[0] != '' &&
            swapedTokens
              .filter((token) => {
                return token != defaultToken;
              })
              .map((token) => (
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  key={token}
                  className='pb-4'
                >
                  {' '}
                  <LiquidInfo
                    userEsdtBalance={userEsdtBalance}
                    second_token={token}
                  />
                </Col>
              ))} */}

          {allLp &&
            allLp.map((lp) => (
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                xxl={12}
                key={lp.lp_token}
                className='pb-4'
              >
                {' '}
                <LiquidInfo userEsdtBalance={userEsdtBalance} lp={lp} />
              </Col>
            ))}
        </Row>
      </div>{' '}
    </div>
  );
};
