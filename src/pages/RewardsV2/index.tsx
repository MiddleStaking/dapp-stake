import * as React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import axios from 'axios';
import SimpleBarChart from './SimpleBarChart';
import TransactionHistory from './TransactionHistory';

const Rewards2 = () => {
  const { address } = useGetAccountInfo();

  const [yRewards, setYRewards] = React.useState<any>({
    yrewards: [
      {
        year: '2021',
        month: '0',
        rewards: '0',
        mid_rewards: '0',
        txHash: ''
      }
    ],
    sum: 0
  });

  const [points, setPoints] = React.useState({
    points: ['202111']
  });

  const [yearsChoice, setYearsChoice] = React.useState('2022');
  const [rewards, setRewards] = React.useState<any>({
    tx: {
      '202111': [
        {
          txHash:
            'ff8c4102739b9468127273b8f35a6b1a376731141185a0c177151e3677d2d2bb',
          value: '0',
          function: 'withdraw',
          timestamp: '1637005044',
          earn: '0'
        }
      ]
    }
  });

  const [tab, setTab] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchRewardsList = async () => {
      const { data } = await axios(
        'https://api.middlestaking.fr/rewards.php?var1=accounts&var2=' + address
      );
      setPoints({
        points: data.points
      });
      setRewards({
        tx: data.tx
      });
      setYRewards({
        yrewards: data.rewards,
        sum: data.sum
      });

      setTab(data.rewards);
    };

    fetchRewardsList();

    setYearsChoice('2023');
  }, [setYRewards]);

  const CouleurButton = [
    ['#FBC34C', '#D49712'],
    ['#36CA8C', '#2BA572'],
    ['#F3BF89', '#B68350'],
    ['#E48570', '#C25C45']
  ];
  return (
    <>
      {yRewards.sum !== '0' && (
        <div
          style={{
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '80%'
            }}
          >
            <SimpleBarChart
              rewards={rewards}
              points={points}
              tab={tab}
              yearsChoice={yearsChoice}
            />
          </div>
        </div>
      )}
      <div
        style={{
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '80%'
          }}
        >
          {yRewards.sum !== '0' && (
            <>
              <button
                style={{
                  background:
                    'linear-gradient(180deg, #2044F5 0%, #1B37C0 100%)'
                }}
                onClick={() => setYearsChoice('All')}
              >
                All
              </button>
              <button
                style={{
                  background:
                    'linear-gradient(180deg, #6CADEF 0%, #5B96D2 100%)'
                }}
                onClick={() => setYearsChoice('Compare')}
              >
                Compare
              </button>
            </>
          )}
          {yRewards.sum !== '0' &&
            yRewards.yrewards.map((reward: any, index: number) => {
              const [alpha, beta] = CouleurButton[index];
              const background = `linear-gradient(180deg, ${alpha} 0%, ${beta} 100%)`;
              return (
                <button
                  style={{ background }}
                  onClick={() => setYearsChoice(reward.year)}
                  key={index}
                >
                  {reward.year}
                </button>
              );
            })}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: '80%'
          }}
        >
          <TransactionHistory
            yRewards={yRewards}
            rewards={rewards}
            points={points}
          />
        </div>
      </div>
    </>
  );
};

export default Rewards2;
