import React, { FC, CSSProperties } from 'react';
import Button from '.';
import CardPresentation from '../CardPresentation';

const ButtonGroupe: FC = () => {
  const buttonMargin: CSSProperties = {
    marginBottom: '10px'
  };

  const buttonIcon: CSSProperties = {
    marginBottom: '10px',
    width: '25px'
  };

  const firstebuttonMargin: CSSProperties = {
    marginBottom: '10px',
    marginTop: '10px'
  };

  return (
    <CardPresentation label='Button'>
      <div style={firstebuttonMargin}>
        <Button
          borderRadius={40}
          background={'#000000'}
          borderColor={'black'}
          text='Stake'
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text='Stake'
          hasBorder={true}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='Stake'
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text='Stake'
          hasBorder={true}
          buttonHeight='50px'
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderRadius={40}
          buttonHeight='50px'
          background={['#BD37EC', '#1F67FF']}
          borderColor={'black'}
          text='Stake'
          onClick={() => console.log('Bouton cliqué')}
          textColor='red'
        />
      </div>
      <div style={buttonMargin}>
        <Button
          borderRadius={40}
          background={['#BD37EC', '#1F67FF']}
          borderColor={'grey'}
          text='Stake'
          disabled={true}
          grayscale={'50%'}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>

      <div style={buttonMargin}>
        <Button
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text='Stake'
          disabled={true}
          grayscale={'70%'}
          hasBorder={true}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>
      <div style={buttonMargin}>
        <Button
          buttonWidth={'30px'}
          buttonHeight={'30px'}
          borderWidth={'1px'}
          borderRadius={40}
          background={'black'}
          borderColor={['#BD37EC', '#1F67FF']}
          text={<SearchBarSvg widthSvg='10px' heightSvg='10px' />}
          hasBorder={true}
          onClick={() => console.log('Bouton cliqué')}
        />
      </div>
    </CardPresentation>
  );
};

export default ButtonGroupe;

interface CroixSwgSvgProps {
  widthSvg?: string;
  heightSvg?: string;
  colorSvg?: string;
}

const SearchBarSvg: FC<CroixSwgSvgProps> = ({
  widthSvg = '16px',
  heightSvg = '16px',
  colorSvg = 'white'
}) => {
  return (
    <svg
      width={widthSvg}
      height={heightSvg}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z'
        fill={colorSvg}
      />
    </svg>
  );
};
